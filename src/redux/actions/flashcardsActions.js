import { SET_ALL_CARDS, SET_FILTERED_CARDS } from '../types';

const setAllFlashcards = (flashcards) => ({
  type: SET_ALL_CARDS,
  payload: flashcards,
});
export default setAllFlashcards;

export const setFilteredcards = (filteredCards) => ({
  type: SET_FILTERED_CARDS,
  payload: filteredCards,
});
