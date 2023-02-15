export const saveDate = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getDate = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const deleteDate = (key) => {
    return localStorage.removeItem(key)
}