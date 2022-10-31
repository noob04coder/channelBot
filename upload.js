const { SlashCommandBuilder } = require('@discordjs/builders');
const Rarepress = require('rarepress');
const request = require('request');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('nftupld')
    .setDescription('upload the given nft to rarible')
    .addStringOption((option) => option.setName('nft_name').setDescription('name of the nft that will be created').setRequired(true))
    .addNumberOption((option) => option.setName('nft_price').setDescription('price for which nft to be listed').setRequired(true))
    .addStringOption((option) => option.setName('image_url').setDescription('url of the nft that will be created').setRequired(true))
    .addStringOption((option) => option.setName('nft_description').setDescription('description of the nft that will be created').setRequired(true)),
  async execute(interaction) {
    imgUrl = interaction.options.getString('image_url')
    nftName = interaction.options.getString('nft_name')
    nftPrice = interaction.options.getNumber('nft_price') * (10 ** 18)
    nftDesc = interaction.options.getString('nft_description') ?? `${nftName}.png`
      // request(imgUrl, function(error, response, body) {
      // if (((response.headers['content-type']).match(/(image)+\//g)).length != 0) {
      (async () => {
        const rarepress = new Rarepress();
        const accnt = await rarepress.init({ network: "mainnet" })
        // console.log(accnt);
        let cid = await rarepress.fs.add(imgUrl)
        let Token = await rarepress.token.create({
          metadata: {
            name: nftName,
            description: nftDesc,
            image: `/ipfs/${cid}`
          }
        })
        // await console.log(Token)
        await rarepress.fs.push(cid)
        await rarepress.fs.push(Token.uri);
        let sent = await rarepress.token.send(Token, "https://ethereum-api.rarible.org/v0.1/nft/mints");
        publishedLink = await `https://rarible.com/token/${sent.id}`
        //console.log(`published: https://rarible.com/token/${sent.id}`);
        const trade = await rarepress.trade.create({
          what: {
            type: 'ERC721',
            id: Token.tokenId,
            value: 1
          },
          with: {
            type: 'ETH',
            value: nftPrice
          }
        })
        //console.log(trade)
        const tradeResponse = await rarepress.trade.send(trade, "https://ethereum-api.rarible.org/v0.1/order/orders");
        await interaction.reply(`Published at : https://rarible.com/token/${sent.id}`)
      })();
    // }
    // else {
    // interaction.reply(`Invalid Image Url`)
      // }
    // })

    // interaction.reply(`${webhook.url}`)
  },
};
