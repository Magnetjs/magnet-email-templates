import test from 'tape';
import Mailer from '../dist';
import mandrillTransport from 'nodemailer-mandrill-transport';

(async function () {
  // try {
  //   let mailer = new Mailer({
  //     config: {
  //       mailer: {
  //         templatePath: 'tests/emails',
  //
  //         type: 'custom',
  //         customTransport: mandrillTransport({
  //           auth: {
  //             apiKey: ''
  //           }
  //         })
  //       }
  //     }
  //   });
  //   await mailer.setup();
  //
  //   let response = await mailer.app.mailer.sendWithTemplate(
  //     'newsletter', {
  //       from: 'kievechua@hihibi.com',
  //       to: 'kievechua@gmail.com',
  //       subject: 'hello',
  //       text: 'hello world!'
  //     }, {
  //       email: 'mister.geppetto@spaghetti.com',
  //       name: {
  //         first: 'Mister',
  //         last: 'Geppetto'
  //       }
  //     }
  //   );
  //
  //   console.log('response', response);
  // } catch (err) {
  //   console.error(err);
  // }

  // TODO
  test('Mailer', function (t) {
    t.ok(true);
    t.end();
  });
})();
