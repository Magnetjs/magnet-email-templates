'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('magnet-core/base');

var _base2 = _interopRequireDefault(_base);

var _emailTemplates = require('email-templates');

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _emailTemplates2 = require('./config/emailTemplates');

var _emailTemplates3 = _interopRequireDefault(_emailTemplates2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mailer = function (_Base) {
  _inherits(Mailer, _Base);

  function Mailer() {
    _classCallCheck(this, Mailer);

    return _possibleConstructorReturn(this, (Mailer.__proto__ || Object.getPrototypeOf(Mailer)).apply(this, arguments));
  }

  _createClass(Mailer, [{
    key: 'setup',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var config, stat, files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, dirPath, dir;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = Object.assign(_emailTemplates3.default, this.config.mailer, this.options);

                this.app.emailTemplates = {};

                _context.prev = 2;
                _context.next = 5;
                return _fs2.default.stat(config.templatesDir);

              case 5:
                stat = _context.sent;

                if (stat) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return');

              case 8:
                _context.next = 10;
                return _fs2.default.readdir(config.templatesDir);

              case 10:
                files = _context.sent;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 14;
                _iterator = files[Symbol.iterator]();

              case 16:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 28;
                  break;
                }

                file = _step.value;
                dirPath = config.templatesDir + '/' + file;
                _context.next = 21;
                return _fs2.default.stat(dirPath);

              case 21:
                dir = _context.sent;

                if (dir.isDirectory()) {
                  _context.next = 24;
                  break;
                }

                return _context.abrupt('continue', 25);

              case 24:

                this.app.emailTemplates[(0, _camelCase2.default)(file)] = new _emailTemplates.EmailTemplate(dirPath, config.options);

              case 25:
                _iteratorNormalCompletion = true;
                _context.next = 16;
                break;

              case 28:
                _context.next = 34;
                break;

              case 30:
                _context.prev = 30;
                _context.t0 = _context['catch'](14);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 34:
                _context.prev = 34;
                _context.prev = 35;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 37:
                _context.prev = 37;

                if (!_didIteratorError) {
                  _context.next = 40;
                  break;
                }

                throw _iteratorError;

              case 40:
                return _context.finish(37);

              case 41:
                return _context.finish(34);

              case 42:
                _context.next = 51;
                break;

              case 44:
                _context.prev = 44;
                _context.t1 = _context['catch'](2);

                if (!(_context.t1.code === 'ENOENT')) {
                  _context.next = 50;
                  break;
                }

                this.log.warn(_context.t1);
                _context.next = 51;
                break;

              case 50:
                throw _context.t1;

              case 51:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 44], [14, 30, 34, 42], [35,, 37, 41]]);
      }));

      function setup() {
        return _ref.apply(this, arguments);
      }

      return setup;
    }()
  }]);

  return Mailer;
}(_base2.default);

exports.default = Mailer;