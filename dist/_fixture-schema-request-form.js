'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyRequestOrgSchema = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _MyRequestOrgSchema;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Schema.MyRequestOrgSchema = new SimpleSchema({
// access by
var MyRequestOrgSchema = exports.MyRequestOrgSchema = (_MyRequestOrgSchema = {
  userId: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'hidden',
        required: true
      }
    }
  },
  email: {
    type: String,
    // regEx: SimpleSchema.RegEx.Email,
    regEx: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    label: 'E-mail address',
    autoform: {
      afFieldInput: {
        type: 'email',
        required: true
      }
    }
  },
  name: {
    type: String,
    label: 'Your name',
    max: 50,
    index: 1,
    unique: true,
    autoform: {
      afFieldInput: {
        required: true
      }
    }
  },
  firstName: {
    type: String,
    index: 1,
    unique: true
  },
  lastName: {
    type: String,
    optional: true
  },
  age: {
    type: Number,
    optional: true
  },
  tags: {
    type: String,
    optional: true
  },
  favoriteYear: {
    type: Number
  },
  favoriteYears: {
    type: [Number]
  }
}, (0, _defineProperty3.default)(_MyRequestOrgSchema, 'name', {
  type: String
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'phone', {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'address', {
  type: Object
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'address.street', {
  type: String
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'address.street2', {
  type: String,
  optional: true
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'address.city', {
  type: String
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'address.state', {
  type: String,
  allowedValues: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'],
  autoform: {
    afFieldInput: {
      firstOption: '(Select a State)'
    }
  }
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'address.postalCode', {
  type: String,
  label: 'ZIP'
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'contacts', {
  type: Array,
  optional: true
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'contacts.$', {
  type: Object
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'contacts.$.name', {
  type: String
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'contacts.$.phone', {
  type: String
}), (0, _defineProperty3.default)(_MyRequestOrgSchema, 'message', {
  type: String,
  label: 'Message',
  max: 1000,
  optional: true
}), _MyRequestOrgSchema);