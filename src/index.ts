import { Module } from 'magnet-core/module'
import { EmailTemplate } from 'email-templates'
import * as fs from 'mz/fs'
import * as path from 'path'
import * as glob from 'glob-promise'
import camelCase = require('lodash/camelCase')

export default class MagnetEmailTemplate extends Module {
  get moduleName () { return 'email_templates' }
  get defaultConfig () { return __dirname }

  async setup () {
    try {
      this.insert({})

      const templatesDir = path.join(this.app.config.baseDirPath, this.config.templatesDir, '/!(inky|examples)/**/*')
      // console.log('templatesDir', templatesDir)
      // console.log('templatesDir', templatesDir, await glob(templatesDir))
      // const stat = await fs.stat(templatesDir)
      //
      // if (!stat) return

      const files: [String] = await glob(templatesDir)
      // console.log('files', files)

      for (const file of files) {
        const parseFile = path.parse(file)
        const [, f] = parseFile.dir.split('templates')
        // console.log('file', file, f, parseFile)
        // console.log('file', camelCase(f))
        // const dirPath = `${templatesDir}/${file}`
        // const dir = await fs.stat(file)
        //
        // if (!dir.isDirectory()) continue
        //
        this.app.email_templates[camelCase(f)] = new EmailTemplate(file, this.config)
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
