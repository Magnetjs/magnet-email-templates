import { Module } from 'magnet-core/module'
import { EmailTemplate } from 'email-templates'
import * as fs from 'mz/fs'
import * as path from 'path'
import camelCase = require('lodash/camelCase')

import defaultConfig from './config/emailTemplates'

export default class MagnetEmailTemplate extends Module {
  async setup () {
    const config = this.prepareConfig('emailTemplates', defaultConfig)

    try {
      this.app.emailTemplates = {}

      const templatesDir = path.join(this.config.baseDirPath, config.templatesDir)
      const stat = await fs.stat(templatesDir)

      if (!stat) return

      const files = await fs.readdir(templatesDir)

      for (const file of files) {
        const dirPath = `${templatesDir}/${file}`
        const dir = await fs.stat(dirPath)

        if (!dir.isDirectory()) continue

        this.app.emailTemplates[camelCase(file)] = new EmailTemplate(dirPath, config)
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
