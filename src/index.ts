import { Module } from 'magnet-core/module'
import { EmailTemplate } from 'email-templates'
import * as path from 'path'
import * as glob from 'glob-promise'
import * as fs from 'mz/fs'
import camelCase = require('lodash/camelCase')

async function filterDirectories (files: Array<string>): Promise<Array<string>> {
  return (await Promise.all(
    files
      .map(async (file) => {
        if ((await fs.lstat(file)).isDirectory()) {
          return file
        }
      })
  ))
  .filter((file) => !!file)
}

export default class MagnetEmailTemplate extends Module {
  get moduleName () { return 'email_templates' }
  get defaultConfig () { return __dirname }

  async setup () {
    try {
      this.insert({})

      const templatesDir = path.join(
        this.app.config.baseDirPath,
        this.config.templatesDir,
        '/!(inky|examples)/**/*'
      )

      const files: Array<string> = await filterDirectories(await glob(templatesDir))

      files.forEach((file) => {
        const [, f] = path.parse(file).dir.split('templates')
        this.app.email_templates[f.substr(1)] = new EmailTemplate(file, this.config)
      })
    } catch (err) {
      if (err.code === 'ENOENT') {
        this.log.warn(err)
      } else {
        throw err
      }
    }
  }
}
