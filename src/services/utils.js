export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// remove/add object by id from array of objects
export const addOrRemove = (array, item) => {
  const exists = array.filter((c) => (c.id === item.id));
  if (exists.length > 0) {
    return array.filter((c) => { return c.id !== item.id })
  } else {
    const result = array;
    result.push(item);
    return result
  }
};

export default {
  saveToStorage,
  loadFromStorage,
  addOrRemove
}