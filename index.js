/**
 * @example
 *
 * ```js
 * // 执行一个函数，结使用 Promise 包装其果，该函数
 * // 只接受的参数 cb 是一个符合 error-first 规范的回调函数
 * promise(function(cb) {
 *   require('fs').readFile(__filename, cb);
 * }).then(function(content) {
 *   console.log(content.toString('utf8'));
 * }).catch(function(err) {
 *   console.log(err.stack || err.message || err);
 * });
 * ```
 *
 * @param executor
 * @return {Promise<*>}
 */
function promise(executor) {
  return new Promise(function (resolve, reject) {
    try {
      executor(function (err, res) {
        if (err) reject(err);
        else resolve(res);
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * 转换 handle 成返回 promise 实例的函数
 *
 * @example
 *
 * ```js
 * // 将函数包装成新的函数，新函数内部使用 call2p 执行就函数，所以执行新函数会返回一个 Promise 实例；
 * // 该函数接受的最后一个参数 cb 是一个符合 error-first 规范的回调函数。
 * const readFile = call2cb.cb2p(function(file, cb) {
 *   require('fs').readFile(file, cb);
 * });
 *
 * readFile(__filename).then(function(content) {
 *   console.log(content.toString('utf8'));
 * }).catch(function(err) {
 *   console.log(err.stack || err.message || err);
 * });
 * ```
 *
 * @param {function} handle 必须接受最后一个参数符合 error-first 的回调函数
 * @return {function(...[*]): Promise<*>}
 */
promise.wrap = function wrap(handle) {
  return function promisedCallback(...args) {
    // remove callback form args
    if (handle.length && handle.length === args.length) {
      args.pop();
    }

    return promise(function (callback) {
      handle(...args, callback);
    });
  }
};

module.exports = promise;
