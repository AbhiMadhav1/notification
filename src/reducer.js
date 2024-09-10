import { ADD_ITEM, REMOVE_ITEM } from './actions';

const initialState = {
  data: [],
};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ITEM:
        return {
          ...state,
          data: [...state.data, action.payload],
        };
      case REMOVE_ITEM:
        return {
          ...state,
          data: state.data.filter(item => item.id !== action.payload),
        };
      default:
        return state;
    }
  };