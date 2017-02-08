Magnet wrapper for [Nodemailer](https://nodemailer.com/about/)

### Usage
Basic
```
import magnet from 'magnet-core';
import Config from 'magnet-config';
import Logger from 'magnet-bunyan';
import Mailer from 'magnet-mailer';

let app = await magnet([Config, Logger, Mailer]);

let response = await app.mailer.nodemailer.sendMail({
  from: 'from-kievechua@example.com',
  to: 'to-kievechua@example.com',
  subject: 'Yo',
  text: 'Hola'
})
```
server/config/mailer.js
```
import mg from 'nodemailer-mailgun-transport'
import htmlToText from 'nodemailer-html-to-text'

export default {
  plugins: {
    compile: htmlToText()
  },

  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'user@gmail.com',
      pass: 'pass'
    }
  },

  transport: mg({
    auth: {
      api_key: 'apiKey',
      domain: 'magnet.js.org'
    }
  })
}
```
