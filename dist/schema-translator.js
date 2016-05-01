'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.resolve = resolve;
exports.mergeInAutoform = mergeInAutoform;
exports.translateType = translateType;
exports.translateRequired = translateRequired;
exports.translateLabel = translateLabel;
exports.translate = translate;
exports.forInput = forInput;
exports.get = get;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var humanize = require('underscore.string/humanize');

// TODO allow merging in options into schema (easy runtime over-rides)
// TODO cleanup schema (WIP)
// TODO translate schema fields into formsy-react-components properties

// resolve values for all properties, recursively
/**
 * Tools to translate schema Component
 * from
 * https://github.com/aldeed/meteor-simple-schema/
 * to
 * https://github.com/christianalfoni/formsy-react
 */
function resolve(schemaInput) {
  var schema = _lodash2.default.clone(schemaInput);
  (0, _keys2.default)(schema).forEach(function (field) {
    schema[field] = _lodash2.default.result(schema, field);
    if (_lodash2.default.isObject(schema[field])) {
      // recursion
      schema[field] = resolve(schema[field]);
    }
  });
  return schema;
}
// merge in any autoform values, nested children, recursively
function mergeInAutoform(schemaInput) {
  var schema = _lodash2.default.clone(schemaInput);
  (0, _keys2.default)(schema).forEach(function (field) {
    if (!_lodash2.default.isObject(schema[field])) return false;
    if (field === 'autoform' || field === 'afFieldInput') {
      // recursion
      schema = _lodash2.default.extend(schema, mergeInAutoform(schema[field]));
      delete schema[field];
    }
    return true;
  });
  return schema;
}

// --------------------------------------------
// TRANSLATE SCHEMA - here's the real work
// --------------------------------------------

// translate type (String, Number, etc) into string type
function translateType(schemaInput) {
  if (!_lodash2.default.has(schemaInput, 'type')) return schemaInput;
  var schema = _lodash2.default.clone(schemaInput);
  if (!schema.type) {
    delete schema.type;
    return schema;
  }
  if (_lodash2.default.isNative(schema.type)) {
    if (schema.type === String) {
      schema.type = 'text';
    }
    if (schema.type === Number) {
      schema.type = 'number';
    }
    if (schema.type === Boolean) {
      // TODO, need to switch input element types for render
      schema.type = 'checkbox';
    }
    if (schema.type === Object || schema.type === Array) {
      // TODO - special handling required here... probably before here
      schema.schemaGroupType = schema.type;
      schema.type = 'text';
    }
  }
  if (_lodash2.default.isString(schema.type) && schema.type.length === 0) {
    delete schema.type;
    return schema;
  }
  var allowed = ['color', 'date', 'datetime', 'datetime-local', 'email', 'hidden', 'month', 'number', 'password', 'range', 'search', 'tel', 'text', 'time', 'url', 'week'];
  if (_lodash2.default.isString(schema.type) && _lodash2.default.indexOf(allowed, schema.type) !== -1) {
    return schema;
  }
  console.log('translateType, bad Schema.type!!!', schema);
  delete schema.type;
  return schema;
}
// translate optional into !required
function translateRequired(schemaInput) {
  var schema = _lodash2.default.clone(schemaInput);
  if (_lodash2.default.has(schema, 'optional')) {
    schema.required = !schema.optional;
    return schema;
  }
  if (_lodash2.default.has(schema, 'required')) {
    schema.required = !!schema.required;
    return schema;
  }
  schema.required = true;
  return schema;
}
// translate "default" label
function translateLabel(schemaInput) {
  if (_lodash2.default.has(schemaInput, 'label')) return schemaInput;
  if (!_lodash2.default.has(schemaInput, 'field')) {
    console.error('translateLabel can not get label, missing field', schemaInput);
    return schemaInput;
  }
  var schema = _lodash2.default.clone(schemaInput);
  schema.label = humanize(schema.field);
  return schema;
}
// translate all fields
function translate(schemaInput) {
  return translateLabel(translateRequired(translateType(schemaInput)));
}

/**
 * Get the schema for just 1 field, and "cleans" it
 *
 * SchemaTranslator.forInput(this.props.schema, 'email') ==> {type:'emai',...}
 *
 * @param object schemaInput (full object or schema)
 * @param string field is the name of the schema field (key)
 * @param object options optional "merge into schema" helper
 */
function forInput(schemaInput, field, options) {
  var schema = _lodash2.default.clone(schemaInput);
  schema.field = field;
  return translate(_lodash2.default.extend(mergeInAutoform(resolve(schema)), options || {}));
}

/**
 * Get any value (or resolve a function value)
 *
 * SchemaTranslator.get(schema, 'email.type', 'email') === 'email'
 * SchemaTranslator.get(schema, 'email.placeholder') === 'Enter your email'
 * SchemaTranslator.get(schema, 'email.non_specified', 'default') === 'default'
 * SchemaTranslator.get(schema, 'email.non_specified') === undefined
 *
 * @param object schema (full object or schema)
 * @param string path path within object to return
 * @param any defaultValue used for anything resulting in undefined
 */
function get(schema, path, defaultValue) {
  return _lodash2.default.result(schema, path, defaultValue);
}

var SchemaTranslator = {
  forInput: forInput,
  mergeInAutoform: mergeInAutoform,
  // resolve functions to values
  resolve: resolve,
  // easy access to the resolved values for an path in the schema
  get: get,
  /**
   * Get all basic attributes for a textarea
   * extra fields
   *
   * (this is just an idea... probably a bad one)
   */
  defaults: {
    'textarea': {
      type: 'textarea',
      rows: 1,
      cols: undefined
    }
  }

};

exports.default = SchemaTranslator;