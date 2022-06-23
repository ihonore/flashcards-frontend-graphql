import React from 'react';
import { useSelector } from 'react-redux';
import Flashcard from '../Flashcard/Flashcard';

const SearchList: React.FC = () => {
  const state: any = useSelector((state) => state);
  const allCards = state?.flashCards?.allCards;
  const [cardsToDisplay] = React.useState(allCards);

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
