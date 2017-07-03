"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const email_templates_1 = require("email-templates");
const path = require("path");
const glob = require("glob-promise");
class MagnetEmailTemplate extends module_1.Module {
    get moduleName() { return 'email_templates'; }
    get defaultConfig() { return __dirname; }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.insert({});
                const templatesDir = path.join(this.app.config.baseDirPath, this.config.templatesDir, '/!(inky|examples)/**/*');
                const files = yield glob(templatesDir);
                for (const file of files) {
                    const [, f] = path.parse(file).dir.split('templates');
                    this.app.email_templates[f] = new email_templates_1.EmailTemplate(file, this.config);
                }
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    this.log.warn(err);
                }
                else {
                    throw err;
                }
            }
        });
    }
}
exports.default = MagnetEmailTemplate;
//# sourceMappingURL=index.js.map