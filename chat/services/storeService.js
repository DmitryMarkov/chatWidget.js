/* eslint-disable no-undef */

export const storeService = {
  getItem: (key) => {
    return localStorage.getItem(key) || ''
  },
  setItem: (key, string) => {
    localStorage.setItem(key, string)
  },

  remove: (key) => {
    localStorage.removeItem(key)
  },

  getJSON: (key) => {
    return JSON.parse(localStorage.getItem(key) || '[]')
  },
  setJSON: (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj))
  }
}
