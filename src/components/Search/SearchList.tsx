import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Flashcard from '../Flashcard/Flashcard';

const SearchList: React.FC = () => {
  const [cardsToDisplay, setCardsToDisplay] = React.useState([]);

  const state: any = useSelector((state) => state);
  const allCards = state?.flashCards?.allCards;
  // console.log(state.flashCards);

  useEffect(() => {
    setCardsToDisplay(allCards);
  });

  if (allCards.length < 1) {
    return (
      <div style={{ color: 'white', fontSize: '2rem' }}>no matches...</div>
    );
  }

  return (
    <div className="card-grid">
      {cardsToDisplay?.map((flashcard: any) => {
        return <Flashcard flashcard={flashcard} />;
      })}
    </div>
  );
};

export default SearchList;
