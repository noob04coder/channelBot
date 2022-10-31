declare function _exports(print: import('../types').Print, options?: {
    path?: string | undefined;
    autoMigrate?: boolean | undefined;
    onMigrationProgress?: import("ipfs-repo-migrations/dist/src/types").ProgressCallback | undefined;
}): IPFSRepo;
export = _exports;
export type MigrationProgressCallback = import('ipfs-repo-migrations').ProgressCallback;
import IPFSRepo = require("ipfs-repo");
//# sourceMappingURL=repo-nodejs.d.ts.map