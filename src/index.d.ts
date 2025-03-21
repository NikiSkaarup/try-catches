type Result<T, E> = [data: T, error: null] | [data: null, error: E];

/**
 * @template T
 * tryCatch - Error handling of asynchronous function
 * @param {() => Promise<T>} fn
 * @returns {Promise<Result<T, Error>>} result - Result of a asynchronous function that might throw
 */
export function tryCatch<T>(fn: () => Promise<T>): Promise<Result<T, Error>>;

/**
 * @template T
 * tryCatch - Error handling of synchronous functions
 * @param {() => T} fn - function that might throw
 * @returns {Result<T, Error>} result - Result of a synchronous function that might throw
 */
export function tryCatch<T>(fn: () => T): Result<T, Error>;

/**
 * @template T
 * tryCatchP - Error handling of Promises.
 * @param {Promise<T>} promise Promise to await safely.
 * @returns {Promise<Result<T, Error>>} a Promise resolving to a Result.
 */
export async function tryCatchP<T>(promise: Promise<T>): Promise<Result<T, Error>>
