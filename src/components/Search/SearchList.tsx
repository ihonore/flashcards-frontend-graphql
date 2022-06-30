import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Flashcard from '../Flashcard/Flashcard';

const SearchList: React.FC = () => {
  const [cardsToDisplay, setCardsToDisplay] = React.useState([]);
  const state: any = useSelector((state) => state);
  const allCards = state?.flashCards?.allCards;
  const filteredCards = state?.flashCards.filteredCards;
  const filterValue = state?.flashCards.filterValue;
  console.log(filterValue);

  useEffect(() => {
    setCardsToDisplay(allCards);
  }, [allCards]);

  if (filteredCards.length < 1 && filterValue) {
    return (
      <div style={{ color: 'white', fontSize: '2rem' }}>no matches...</div>
    );
  }

  return (
    <div className="card-grid">
      {filteredCards.length >= 1
        ? filteredCards?.map((flashcard: any) => {
            return <Flashcard flashcard={flashcard} />;
          })
        : cardsToDisplay?.map((flashcard: any) => {
            return <Flashcard flashcard={flashcard} />;
          })}
    </div>
  );
};

export default SearchList;
