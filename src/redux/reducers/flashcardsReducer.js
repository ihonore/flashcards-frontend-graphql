import { SET_ALL_CARDS, SET_FILTERED_CARDS, SET_FILTER_VALUE } from '../types';

const initialState = {
  allCards: [],
  filteredCards: [],
  filterValue: '',
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
        filteredCards: action.payload,
        loading: false,
      };
    case SET_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default flashcardsReducer;
