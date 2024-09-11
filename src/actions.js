export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const LOGOUT = 'LOGOUT';
export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (id) => ({
    type: REMOVE_ITEM,
    payload: id,
  });
  
 