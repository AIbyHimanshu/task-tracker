export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error("Failed to load from localStorage:", e);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
