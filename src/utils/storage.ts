// authorization token local storage name
export const localStorageTokenName = 'affinidi:accessToken';

/**
 * Function to retrieve an entry by its key from local storage.
 * */
export const getFromStorage = (key: string) => {
  if( !key ) {
    return null;
  }

  try {
    const valueStr = localStorage.getItem(key);
    if( valueStr ) {
      return JSON.parse(valueStr);
    }
    return null;
  } catch (e) {
    return null;
  }
};

/**
 * Function to store a key-value pair in local storage.
 * */
export const setInStorage = (key: string, value: any) => {
  if( !key ) {
    return null;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    return null;
  }
};

/**
 * Function to remove a local storage entry.
 * */
export const removeFromStorage = (key: string) => {
  if( !key ) {
    return null;
  }

  try {
    localStorage.removeItem(key);
  } catch (e) {
    return null;
  }
};

/**
 * Function to retrieve authorization token from local storage.
 * */
export const getLocalStorageToken     = () => getFromStorage(localStorageTokenName);
/**
 * Function to save authorization token in local storage.
 * */
export const setLocalStorageToken     = (token: string) => setInStorage(localStorageTokenName, token);
/**
 * Function to delete authorization token from local storage.
 * */
export const removeLocalStorageToken  = () => removeFromStorage(localStorageTokenName);
