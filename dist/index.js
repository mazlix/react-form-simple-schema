'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickInput = exports.QuickForm = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _QuickForm = require('./QuickForm');

var _QuickForm2 = _interopRequireDefault(_QuickForm);

var _QuickInput = require('./QuickInput');

var _QuickInput2 = _interopRequireDefault(_QuickInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuickForm = exports.QuickForm = _QuickForm2.default; /**
                                                          * Tools to use Meteor's
                                                          * https://github.com/aldeed/meteor-simple-schema/
                                                          * to
                                                          * https://github.com/christianalfoni/formsy-react
                                                          */

var QuickInput = exports.QuickInput = _QuickInput2.default;

var ReactFormSimpleSchema = {
  QuickForm: _QuickForm2.default,
  QuickInput: _QuickInput2.default
};
exports.default = ReactFormSimpleSchema;

/*
// automatic form for entire schema
const QuickForm = ({ children, onSubmit, style = {} }) => (
  <Formsy
    style={{ ...buttonStyles, ...style }}
    onClick={onClick}
  >
    {children}
  </QuickForm>
);

QuickForm.propTypes = {
  schema: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func,
  style: React.PropTypes.object,
};

export default QuickForm;
*/