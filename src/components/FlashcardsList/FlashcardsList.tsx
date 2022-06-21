import React from 'react';
// import { useFlashcardsQuery } from '../../generated/graphql';
import Flashcard from '../Flashcard/Flashcard';

const FlashcardaList: React.FC = () => {
  // const { data, error, loading } = useFlashcardsQuery();

  // if (loading) {
  //   return <div style={{ color: 'white', fontSize: '2rem' }}>loading...</div>;
  // }
  // if (error || !data) {
  //   return (
  //     <div style={{ color: 'white', fontSize: '2rem' }}>
  //       Something went wrong
  //     </div>
  //   );
  // }
  const flashcards = [
    {
      id: 1,
      question: 'How is the weather up there?',
      answer: 'Too bad!',
      isDone: true,
      postedBy: {
        email: 'ihonore01@gmail.com',
      },
      createdAt: '2022-06-20T06:57:18.497Z',
    },
    {
      id: 2,
      question: 'How is the weather up there?',
      answer: 'Too bad!',
      isDone: false,
      postedBy: {
        email: 'ihonore01@gmail.com',
      },
      createdAt: '2022-06-20T06:57:18.497Z',
    },
    {
      id: 3,
      question: 'How is the weather up there?',
      answer: 'Too bad!',
      isDone: false,
      postedBy: {
        email: 'ihonore01@gmail.com',
      },
      createdAt: '2022-06-20T06:57:18.497Z',
    },
    {
      id: 4,
      question: 'How is the weather up there?',
      answer: 'Too bad!',
      isDone: true,
      postedBy: {
        email: 'ihonore01@gmail.com',
      },
      createdAt: '2022-06-20T06:57:18.497Z',
    },
    {
      id: 5,
      question: 'How is the weather up there?',
      answer: 'Too bad!',
      isDone: true,
      postedBy: {
        email: 'ihonore01@gmail.com',
      },
      createdAt: '2022-06-20T06:57:18.497Z',
    },
    {
      id: 6,
      question: 'How is the weather up there?',
      answer: 'Too bad!',
      isDone: false,
      postedBy: {
        email: 'ihonore01@gmail.com',
      },
      createdAt: '2022-06-20T06:57:18.497Z',
    },
    {
      id: 7,
      question: 'How is the weather up there?',
      answer: 'Too bad!',
      isDone: false,
      postedBy: {
        email: 'ihonore01@gmail.com',
      },
      createdAt: '2022-06-20T06:57:18.497Z',
    },
    {
      id: 8,
      question: 'How is the weather up there?',
      answer: 'Too bad!',
      isDone: true,
      postedBy: {
        email: 'ihonore01@gmail.com',
      },
      createdAt: '2022-06-20T06:57:18.497Z',
    },
  ];
  return (
    <div className="card-grid">
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} />;
      })}
    </div>
  );
};

export default FlashcardaList;
