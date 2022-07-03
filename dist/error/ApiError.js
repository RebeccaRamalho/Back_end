"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ApiError = /*#__PURE__*/function () {
  function ApiError(code, message) {
    _classCallCheck(this, ApiError);

    this.code = code;
    this.message = message;
  } //


  _createClass(ApiError, null, [{
    key: "badRequest",
    value: function badRequest(msg) {
      return new ApiError(400, msg);
    }
  }, {
    key: "Unauthorized",
    value: function Unauthorized(msg) {
      return new ApiError(401, msg);
    }
  }, {
    key: "Forbidden",
    value: function Forbidden(msg) {
      return new ApiError(403, msg);
    }
  }, {
    key: "NotFound",
    value: function NotFound(msg) {
      return new ApiError(404, msg);
    }
  }, {
    key: "Conflict",
    value: function Conflict(msg) {
      return new ApiError(409, msg);
    }
  }, {
    key: "internal",
    value: function internal(msg) {
      return new ApiError(500, msg);
    }
  }]);

  return ApiError;
}();

module.exports = ApiError;