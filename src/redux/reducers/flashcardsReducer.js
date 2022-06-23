import { SET_ALL_CARDS, SET_FILTERED_CARDS } from '../types';

const initialState = {
  allCards: [],
  filteredCards: [],
  loading: true,
};

const flashcardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_CARDS:
      return {
        ...state,
        allCards: action.payload,
        loading: false,
      };
    case SET_FILTERED_CARDS:
      return {
        ...state,
        filterdCards: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default flashcardsReducer;
