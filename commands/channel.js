const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel')
		.setDescription('Create a channel and a webhook for that channel.')
    .addStringOption((option) => option.setName('channel_name').setDescription('name of the channel that will be created').setRequired(true)),
	async execute(interaction) {
    channelName=interaction.options.getString('channel_name')
    interaction.guild.channels.create(channelName, {
	type: 'GUILD_TEXT'
}).then(channel => {
 channel.createWebhook(interaction.user.username,{
  avatar: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`
})
  .then(webhook => {channel.send(webhook.url).then(msg=>{msg.pin()});
    interaction.reply(`${webhook.url}`);})
  .catch(console.error)
  channel.setParent("850256127967100990");
  ;
  }).catch(console.error);
	
  },
};
