/**
 * @template T
 * @template E = Error
 * @typedef {[data: T, error: null] | [data: null, error: E]} Result
 */

/**
 * @template T
 * tryCatch - Error handling of asynchronous function
 * @overload fn - asynchronous function that might throw
 * @param {() => Promise<T>} fn
 * @returns {Promise<Result<T, Error>>} result - Result of a asynchronous function that might throw
 */
/**
 * @template T
 * tryCatch - Error handling of synchronous functions
 * @overload fn - function that might throw
 * @param {() => T} fn - function that might throw
 * @returns {Result<T, Error>} result - Result of a synchronous function that might throw
 */
/**
 * @template T
 * tryCatch - Error handling of asynchronous and synchronous functions
 * @param {(() => Promise<T>) | (() => T)} fn - function that might throw
 * @returns {Promise<Result<T, Error>> | Result<T, Error>} result - Result of an function that might throw
 */
export function tryCatch(fn) {
  try {
    const res = fn();

    if (!(res instanceof Promise)) {
      // Function was not a promise, so we can return result directly
      return [res, null];
    }

    /** @type {Promise<Result<T, Error>>} */
    const wrap = (res.then((res) => {
      return [res, null];
    }).catch((/** @type {Unknown} */ err) => {
      return [null, err instanceof Error ? err : new Error(String(err))];
    }));

    return wrap;
  } catch (/** @type {unknown} */ err) {
    return [null, err instanceof Error ? err : new Error(String(err))];
  }
}

/**
 * @template T
 * tryCatchP - Error handling of Promises.
 * @param {Promise<T>} promise Promise to await safely.
 * @returns {Promise<Result<T, Error>>} a Promise resolving to a Result.
 */
export async function tryCatchP(promise) {
  try {
    return [await promise, null];
  } catch (/** @type {unknown} */ err) {
    return [null, err instanceof Error ? err : new Error(String(err))];
  }
}
