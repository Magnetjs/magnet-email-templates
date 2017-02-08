import Base from 'magnet-core/base'
import { EmailTemplate } from 'email-templates'
import fs from 'mz/fs'
import camelCase from 'lodash/camelCase'
import defaultConfig from './config/emailTemplates'

export default class Mailer extends Base {
  async setup () {
    let config = Object.assign(defaultConfig, this.config.mailer, this.options)
    this.app.emailTemplates = {}

    try {
      // console.log(await glob(`${config.templatesDir}`));
      const stat = await fs.stat(config.templatesDir)

      if (!stat) return

      const files = await fs.readdir(config.templatesDir)

      for (const file of files) {
        const dirPath = `${config.templatesDir}/${file}`
        const dir = await fs.stat(dirPath)

        if (!dir.isDirectory()) continue

        this.app.emailTemplates[camelCase(file)] = new EmailTemplate(dirPath, config.options)
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
