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
const fs = require("mz/fs");
const path = require("path");
const camelCase = require("lodash/camelCase");
const emailTemplates_1 = require("./config/emailTemplates");
class MagnetEmailTemplate extends module_1.Module {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.prepareConfig('emailTemplates', emailTemplates_1.default);
            try {
                this.app.emailTemplates = {};
                const templatesDir = path.join(process.cwd(), config.templatesDir);
                const stat = yield fs.stat(templatesDir);
                if (!stat)
                    return;
                const files = yield fs.readdir(templatesDir);
                for (const file of files) {
                    const dirPath = `${templatesDir}/${file}`;
                    const dir = yield fs.stat(dirPath);
                    if (!dir.isDirectory())
                        continue;
                    this.app.emailTemplates[camelCase(file)] = new email_templates_1.EmailTemplate(dirPath, config);
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