'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptions = getOptions;
exports.filterElements = filterElements;
exports.filterElement = filterElement;
exports.getDataFromElements = getDataFromElements;
exports.default = getDataFromEvent;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOptions(options) {
  return _lodash2.default.extend({
    fields: [],
    omitFields: []
  }, options || {});
} /**
   * Tools to translate form data into a data object (before Validation && submit)
   */


function filterElements(elements, options) {
  return _lodash2.default.filter(elements, filterElement.bind(this, options));
}

function filterElement(options, el) {
  if (options.fields.length > 0) {
    if (_lodash2.default.indexOf(options.fields, el.name) === -1) {
      return false;
    }
  }
  if (options.omitFields.length > 0) {
    if (_lodash2.default.indexOf(options.omitFields, el.name) !== -1) {
      return false;
    }
  }
  return true;
}

function getDataFromElements(elements, options) {
  options = getOptions(options);
  return _lodash2.default.fromPairs(_lodash2.default.map(filterElements(elements, options), function (el) {
    return [el.name, el.value];
  }));
}

function getDataFromEvent(event, options) {
  options = getOptions(options);
  event.preventDefault();
  return getDataFromElements(event.target.elements, options);
}