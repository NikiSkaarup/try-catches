/**
 * @template T
 * @template E = Error
 * @typedef {[error: null, data: T] | [error: E, data: null]} Result
 */

/**
 * @template T
 * tryCatch - Error handling of asynchronous function
 * @overload fn - asynchronous function that might throw
 * @param {() => Promise<T>} fn
 * @returns {Promise<Result<Error, T>>} result - Result of a asynchronous function that might throw
 */
/**
 * @template T
 * tryCatch - Error handling of synchronous functions
 * @overload fn - function that might throw
 * @param {() => T} fn - function that might throw
 * @returns {Result<Error, T>} result - Result of a synchronous function that might throw
 */
/**
 * @template T
 * tryCatch - Error handling of asynchronous and synchronous functions
 * @param {(() => Promise<T>) | (() => T)} fn - function that might throw
 * @returns {Promise<Result<Error, T>> | Result<Error, T>} result - Result of an function that might throw
 */
export function tryCatch(fn) {
  try {
    const res = fn();

    if (!(res instanceof Promise)) {
      // Function was not a promise, so we can return result directly
      return [null, res];
    }

    /** @type {Promise<Result<Error, T>>} */
    const wrap = res
      .then((res) => {
        return [null, res];
      })
      .catch((/** @type {Unknown} */ err) => {
        return [err instanceof Error ? err : new Error(String(err)), null];
      });

    return wrap;
  } catch (/** @type {unknown} */ err) {
    return [err instanceof Error ? err : new Error(String(err)), null];
  }
}

/**
 * @template T
 * tryCatchP - Error handling of Promises.
 * @param {Promise<T>} promise Promise to await safely.
 * @returns {Promise<Result<Error, T>>} a Promise resolving to a Result.
 */
export async function tryCatchP(promise) {
  try {
    return [null, await promise];
  } catch (/** @type {unknown} */ err) {
    return [err instanceof Error ? err : new Error(String(err)), null];
  }
}
