type LocalStorageItem =
  'AP_WAIT_SETUP'

export const LocalStorageItem: {
  AP_WAIT_SETUP: LocalStorageItem
} = {
  AP_WAIT_SETUP: 'AP_WAIT_SETUP'
}

export const LocalStorage = {
  get: (id: LocalStorageItem, def = null) => {
    return JSON.parse(localStorage.getItem(id)) || def
  },
  remove: (id: LocalStorageItem) => {
    return localStorage.removeItem(id)
  },
  set: (id: LocalStorageItem, value: any) => {
    return localStorage.setItem(id, JSON.stringify(value))
  }
}
