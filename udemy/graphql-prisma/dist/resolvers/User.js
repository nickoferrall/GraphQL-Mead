'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  posts: {
    fragment: 'fragment userId on User {id}',
    resolve: function resolve(parent, args, _ref, info) {
      var prisma = _ref.prisma;

      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      });
    }
  },
  email: {
    fragment: 'fragment userId on User { id }',
    resolve: function resolve(parent, args, _ref2, info) {
      var request = _ref2.request;

      var userId = (0, _getUserId2.default)(request, false);

      if (userId && userId == parent.id) {
        return parent.email;
      } else {
        return null;
      }
    }
  }
};

exports.default = User;