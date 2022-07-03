"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports.signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(request, response, next) {
    var _request$body, email, user_name, password;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _request$body = request.body, email = _request$body.email, user_name = _request$body.user_name, password = _request$body.password;
            _context.prev = 1;
            _context.next = 4;
            return model.getAdmin(email
            /*what i send to the model*/
            , function
              /*what i get from the model*/
            (error, result) {
              /*1-Error managment */

              /*a_Server error managment*/
              if (error) {
                response.send(error.message);
              } else if (result.length !== 0) {
                /*b_User error managment (i check if username already exist in db)*/
                next(ApiError.Conflict("un utilisateur avec cette email existe déjà dans la base de donnée"));
              } else if (typeof email !== "string" || typeof user_name !== "string" || typeof password !== "string") {
                next(ApiError.badRequest("Les champs doivent être une chaîne de caractères"));
              } else if (email === "" || user_name === "" || password === "") {
                next(ApiError.badRequest("Tous les champs doivent être remplis"));
              } else {
                /*2-Password hashing*/
                var saltRounds = 10;
                bcrypt.hash(password, saltRounds, function (error, hash) {
                  /*a_error managment */
                  if (error) {
                    response.send(error.message);
                  }
                  /*b_we stock user's data (including the hashing psswd) into a variable so we can
                                 send it to the model so that the model can create the user in the db */


                  var Admin = {
                    email: email,
                    user_name: user_name,
                    password: hash
                  };
                  /*c_we send user's data to the model*/

                  model.createAccount(Admin, function (error, result) {
                    if (error) {
                      response.status(500).json({
                        message: "Server-side problem."
                      });
                    } else {
                      var adminDetails = {
                        user_name: user_name,
                        password: password,
                        email: email
                      };
                      response.status(201).json(adminDetails);
                    }
                  });
                });
              }
            });

          case 4:
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 6]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/*II_Login */


exports.login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(request, response, next) {
    var _request$body2, email, user_name, password;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _request$body2 = request.body, email = _request$body2.email, user_name = _request$body2.user_name, password = _request$body2.password;
            _context2.prev = 1;
            _context2.next = 4;
            return model.getAdmin(email, function (error, result) {
              if (error) {
                next(ApiError.internal("something went wrong"));
              } else if (result.length == 0) {
                next(ApiError.Unauthorized("l'email n'existe pas dans la base de donnée"));
              } else if (email === "" || user_name === "" || password === "") {
                next(ApiError.badRequest("Tous les champs doivent être remplis"));
              } else if (typeof email !== "string" || typeof user_name !== "string" || typeof password !== "string") {
                next(ApiError.badRequest("Les champs doivent être une chaîne de caractères"));
              } else {
                var hash = result[0].password;
                bcrypt.compare(password, hash, function (error, correct) {
                  if (error) {
                    response.status(500).json({
                      message: "Error."
                    });
                  }

                  if (!correct) {
                    response.status(401).json({
                      message: "Wrong password."
                    });
                  }

                  var Admin = {
                    admin_id: result[0].admin_id,
                    user_name: result[0].user_name,
                    password: result[0].password,
                    email: result[0].email,
                    exp: MAXAGE ///////ici qu'on donne un âge au token?

                  };
                  jwt.sign(Admin, process.env.JWT_SECRET, function (error, token) {
                    //test
                    if (error) {
                      response.status(500).json({
                        message: "Server Error"
                      });
                    } // request.Admin = Admin;  v1


                    request.Admin = {
                      admin_id: result[0].admin_id,
                      user_name: result[0].user_name,
                      email: result[0].email
                    }; // request.Admin = { admin_id }
                    //
                    // response.cookie("authcookie", token, { maxAge: MAXAGE });
                    //

                    response.status(200).json({
                      token: token,
                      /// envoie dans les headers
                      Admin: {
                        admin_id: result[0].admin_id,
                        user_name: result[0].user_name,
                        password: result[0].password,
                        email: result[0].email
                      }
                    });
                  });
                });
              }
            });

          case 4:
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);
            console.error(_context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 6]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/*B_CRUD REQUEST NOT RELATED TO AUTHENTIFICATION**/

/*CREATE*/

/*admin i want to create an article*/


exports.publishArticles = function (req, res, next) {
  var admin_id = req.Admin.admin_id;
  var _req$body = req.body,
      title = _req$body.title,
      img = _req$body.img,
      tags = _req$body.tags,
      resume_article = _req$body.resume_article,
      content_article = _req$body.content_article,
      author_article = _req$body.author_article,
      video = _req$body.video;
  var article = {
    title: title,
    img: img,
    tags: tags,
    resume_article: resume_article,
    content_article: content_article,
    author_article: author_article,
    video: video
  };
  console.log("ARticle", req.files);
  model.createArticle(article, admin_id, function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (title === "" || img === "" || tags === "" || resume_article === "" || content_article === "" || author_article === "") {
      next(ApiError.badRequest("Les champs doivent être remplis"));
    } else if (typeof title !== "string" || typeof img !== "string" || typeof tags !== "string" || typeof resume_article !== "string" || typeof content_article !== "string" || typeof author_article !== "string") {
      next(ApiError.badRequest("Les champs doivent être des chaines de caractères"));
    } else if (!admin_id) {
      next(ApiError.Unauthorized("Vous devez être connecté pour accéder à cette ressource"));
    } else {
      res.status(200).json(result);
    }
  });
};
/*READ*/

/*admin i want to see all the articles */


exports.getArticles = function (req, res) {
  var admin_id = req.Admin.admin_id;
  var result = model.getllArticle(function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }

    res.status(200).json(result);
  });
};
/*admin i want to get one review*/


exports.getOneReview = function (req, res) {
  var admin_id = req.Admin.admin_id;
  var id = req.params.id;
  model.getAReview(id, function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(ApiError.Unauthorized("Vous devez être connecté pour accéder à cette ressource"));
    }

    res.status(200).json(result);
  });
};
/*admin i want to get all reviews */


exports.getReview = function (req, res) {
  var admin_id = req.Admin.admin_id;
  model.getAllReview(function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(ApiError.Unauthorized("Vous devez être connecté pour accéder à cette ressource"));
    }

    res.status(200).json(result);
  });
};
/*admin i want to see the details of an article*/


exports.articleDetails = function (req, res) {
  var admin_id = req.Admin.admin_id;
  var article_id = req.params.article_id;
  model.getArticleDetails(article_id, function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(ApiError.Unauthorized("Vous devez être connecté pour accéder à cette ressource"));
    }

    res.status(200).json(result);
  });
};
/*UPTDATE*/

/*admin i want to update an article */


exports.updateArticles = function (req, res, next) {
  var admin_id = req.Admin.admin_id;
  var article_id = req.params.article_id;
  var _req$body2 = req.body,
      title = _req$body2.title,
      img = _req$body2.img,
      tags = _req$body2.tags,
      resume_article = _req$body2.resume_article,
      content_article = _req$body2.content_article,
      author_article = _req$body2.author_article,
      video = _req$body2.video;
  var article = {
    title: title,
    img: img,
    tags: tags,
    resume_article: resume_article,
    content_article: content_article,
    author_article: author_article,
    video: video
  };
  model.updateArticles(article_id, admin_id, article, function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(ApiError.Unauthorized("Vous devez être connecté pour accéder à cette ressource"));
    } else if (typeof title !== "string" || typeof tags !== "string" || typeof resume_article !== "string" || typeof content_article !== "string" || typeof author_article !== "string") {
      next(ApiError.badRequest("Les champs doivent être des chaines de caractères"));
    } else if (typeof title !== "" || typeof tags !== "" || typeof img !== "" || typeof resume_article !== "" || typeof content_article !== "" || typeof author_article !== "") {
      next(ApiError.badRequest("Les champs ne doivent pas être vides"));
    }

    res.status(200).json(result);
  });
};
/*DELETE*/

/*admin i want to delete an article */


exports.deleteArticles = function (req, res) {
  var admin_id = req.Admin.admin_id;
  var article_id = req.params.article_id; //

  model.delete_an_article(article_id, function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(ApiError.Unauthorized("Vous devez être connecté pour accéder à cette ressource"));
    }
  });
};
/*admin i want to delete a review */


exports.deleteReview = function (req, res) {
  var admin_id = req.Admin.admin_id;
  var id = req.params.id;
  model.delete_an_review(id, function (error, result) {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(ApiError.Unauthorized("Vous devez être connecté pour accéder à cette ressource"));
    }

    res.status(200).json(result);
  });
};