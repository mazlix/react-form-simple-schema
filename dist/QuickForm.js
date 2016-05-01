'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _formsyReactComponents = require('formsy-react-components');

var _formsyReactComponents2 = _interopRequireDefault(_formsyReactComponents);

var _QuickInput = require('./QuickInput');

var _QuickInput2 = _interopRequireDefault(_QuickInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = _formsyReactComponents2.default.Checkbox;
var CheckboxGroup = _formsyReactComponents2.default.CheckboxGroup;
var Input = _formsyReactComponents2.default.Input;
var RadioGroup = _formsyReactComponents2.default.RadioGroup;
var Row = _formsyReactComponents2.default.Row;
var Select = _formsyReactComponents2.default.Select;
var File = _formsyReactComponents2.default.File;
var Textarea = _formsyReactComponents2.default.Textarea;


var csvToArray = function csvToArray(input) {

  if (_lodash2.default.isString(input)) {
    return _lodash2.default.trim(input).split(',').map(_lodash2.default.trim);
  }

  if (_lodash2.default.isArray(input)) {
    return input.map(_lodash2.default.trim);
  }

  return [];
};

var QuickForm = function (_React$Component) {
  (0, _inherits3.default)(QuickForm, _React$Component);

  function QuickForm(props) {
    (0, _classCallCheck3.default)(this, QuickForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(QuickForm).call(this, props));

    _this.onValidSubmit = _this.onValidSubmit.bind(_this);
    _this.onValid = _this.onValid.bind(_this);
    _this.onInvalid = _this.onInvalid.bind(_this);

    _this.state = { canSubmit: props.canSubmit || true }; //defaulting to true
    return _this;
  }

  (0, _createClass3.default)(QuickForm, [{
    key: 'onValidSubmit',
    value: function onValidSubmit(model) {
      this.props.onValidSubmit(model);
    }
  }, {
    key: 'onValid',
    value: function onValid() {
      var onValid = this.props.onValid;


      onValid ? this.props.onValid() : this.enableButton();
    }
  }, {
    key: 'onInvalid',
    value: function onInvalid() {
      var onInvalid = this.props.onInvalid;


      onInvalid ? this.props.onInvalid() : this.disableButton();
    }
  }, {
    key: 'enableButton',
    value: function enableButton() {
      this.setState({ canSubmit: true });
    }
  }, {
    key: 'disableButton',
    value: function disableButton() {
      this.setState({ canSubmit: false });
    }
  }, {
    key: 'buildFormInputs',
    value: function buildFormInputs() {
      var _this2 = this;

      var schema = this.props.schema || false;
      if (!schema) return '';
      var omitFields = csvToArray(this.props.omitFields);
      var fields = csvToArray(this.props.fields);
      return (0, _keys2.default)(schema).map(function (field, i) {
        if (omitFields.length > 0 && _lodash2.default.indexOf(omitFields, field) !== -1) return '';
        if (fields.length > 0 && _lodash2.default.indexOf(fields, field) === -1) return '';
        var optionsPath = ['options', field].join('.');
        var options = _lodash2.default.result(_this2.props, optionsPath);
        return _react2.default.createElement(_QuickInput2.default, {
          key: i,
          field: field,
          schema: schema[field],
          options: options
        });
      });
    }
  }, {
    key: 'buildFormButtons',
    value: function buildFormButtons() {
      var canSubmit = this.state.canSubmit;


      return _react2.default.createElement(
        'button',
        { type: 'submit', disabled: !canSubmit },
        'Submit'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _formsyReact2.default.Form,
        {
          onValidSubmit: this.onValidSubmit,
          onValid: this.onValid,
          onInvalid: this.onInvalid
        },
        this.buildFormInputs(),
        this.buildFormButtons()
      );
    }
  }]);
  return QuickForm;
}(_react2.default.Component);

exports.default = QuickForm;


QuickForm.propTypes = {
  schema: _react2.default.PropTypes.object,
  fields: _react2.default.PropTypes.oneOfType(_react2.default.PropTypes.array, _react2.default.PropTypes.string),
  omitFields: _react2.default.PropTypes.oneOfType(_react2.default.PropTypes.array, _react2.default.PropTypes.string),
  onValidSubmit: _react2.default.PropTypes.func,
  onValid: _react2.default.PropTypes.func,
  onInvalid: _react2.default.PropTypes.func,
  canSubmit: _react2.default.PropTypes.bool
};