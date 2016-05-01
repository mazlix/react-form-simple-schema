'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFormData = validateFormData;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateFormData(data, schema, options) {
  console.log('validateFormData', data, schema, options, this);
  return true;
} /**
   * Tools to translate schema Validation
   * from
   * https://github.com/aldeed/meteor-simple-schema/
   * to
   * https://github.com/christianalfoni/formsy-react
   */