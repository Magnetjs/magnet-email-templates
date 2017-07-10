import { Module } from 'magnet-core/module'
import { EmailTemplate } from 'email-templates'
import * as path from 'path'
import * as glob from 'glob-promise'
import camelCase = require('lodash/camelCase')

export default class MagnetEmailTemplate extends Module {
  get moduleName () { return 'email_templates' }
  get defaultConfig () { return __dirname }

  async setup () {
    try {
      this.insert({})

      const templatesDir = path.join(
        this.app.config.baseDirPath,
        this.config.templatesDir,
        '/!(inky|examples)/**'
      )

      const files: [String] = await glob(templatesDir)

      for (const file of files) {
        const [, f] = path.parse(file).dir.split('templates')
        this.app.email_templates[f.substr(1)] = new EmailTemplate(file, this.config)
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        this.log.warn(err)
      } else {
        throw err
      }
    }
  }
}
