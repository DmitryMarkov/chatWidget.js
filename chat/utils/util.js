/**
 * Generate random number
 * @param {number} maximum value
 * @returns {number} random value
 */
export function getRandomNumber (max) {
  return Math.round(Math.random() * (max - 1))
}

/**
 * Date format
 * @param {number} date in ms
 * @returns {string} formattedDate
 */
export function formatDate (dateString) {
  const dateObj = new Date(dateString)
  const formattedDate = dateObj.getHours() + ':' + dateObj.getMinutes()
  return formattedDate
}

/**
 * Deep equal arrays
 * @param {array} src - first array
 * @param {array} dest - second array
 * @returns {boolean} true if qual
 */
export function deepEqual (src, dest) {
  return JSON.stringify(src) === JSON.stringify(dest)
}
