'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReactComponents = require('formsy-react-components');

var _formsyReactComponents2 = _interopRequireDefault(_formsyReactComponents);

var _schemaTranslator = require('./schema-translator');

var _schemaTranslator2 = _interopRequireDefault(_schemaTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = _formsyReactComponents2.default.Checkbox;
//import Formsy from 'formsy-react';

var CheckboxGroup = _formsyReactComponents2.default.CheckboxGroup;
var Input = _formsyReactComponents2.default.Input;
var RadioGroup = _formsyReactComponents2.default.RadioGroup;
var Row = _formsyReactComponents2.default.Row;
var Select = _formsyReactComponents2.default.Select;
var File = _formsyReactComponents2.default.File;
var Textarea = _formsyReactComponents2.default.Textarea;

var QuickInput = function (_React$Component) {
  (0, _inherits3.default)(QuickInput, _React$Component);

  function QuickInput() {
    (0, _classCallCheck3.default)(this, QuickInput);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(QuickInput).apply(this, arguments));
  }

  (0, _createClass3.default)(QuickInput, [{
    key: 'submit',
    value: function submit() {}
  }, {
    key: 'enableButton',
    value: function enableButton() {}
  }, {
    key: 'disable',
    value: function disable() {}
  }, {
    key: 'changeOnBlur',
    value: function changeOnBlur(e) {
      return true;
    }
  }, {
    key: 'canSubmit',
    value: function canSubmit() {
      return true;
    }
  }, {
    key: 'buildFormInputs',
    value: function buildFormInputs() {
      return FormBuilder.buildFormInputs(this.props.schema);
    }
  }, {
    key: 'buildFormButtons',
    value: function buildFormButtons() {
      return _react2.default.createElement(
        'button',
        { type: 'submit', disabled: !this.canSubmit() },
        'Submit'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      //console.log('QuickInput, props', this.props);
      var field = this.props.field || this.props.key;
      if (!field) {
        //console.error('QuickInput, SKIPPING has no field/key', this.props);
        return '';
      }

      //console.log('QuickInput', field, 'schema input', this.props.schema);
      if (this.props.schema.type === Object) {
        //console.log("skip object / later could make fieldset?");
        return null;
      }
      var schema = _schemaTranslator2.default.forInput(this.props.schema, field);
      //console.log('QuickInput', field, 'schema after cleanup', schema);

      // TODO split on various input types
      // TODO translate schema fields into formsy-react-components properties
      // TODO implement autoform-like helpers for automatic label, etc
      // TODO implement autoform-like helpers for nested schemas
      return _react2.default.createElement(Input, (0, _extends3.default)({
        key: field,
        name: field,
        id: field,
        value: schema.defaultValue || '',
        label: schema.label || '',
        type: schema.type || 'text'
      }, this.props, {
        onBlur: this.changeOnBlur,
        required: !schema.optional
      }));
    }
  }]);
  return QuickInput;
}(_react2.default.Component);

exports.default = QuickInput;

QuickInput.propTypes = {
  schema: _react2.default.PropTypes.object,
  field: _react2.default.PropTypes.string,
  options: _react2.default.PropTypes.object
};