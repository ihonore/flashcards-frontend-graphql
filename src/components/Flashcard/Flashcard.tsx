import React, { useState, useRef } from 'react';

export interface flashcard {
  id: number;
  question: string;
  answer: string;
}

export default function Flashcard({ flashcard }: any) {
  const [flip, setFlip] = useState(false);

  const frontEl = useRef() as React.MutableRefObject<HTMLDivElement>;
  const backEl = useRef() as React.MutableRefObject<HTMLDivElement>;

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: 250, width: 400 }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}
      </div>
      <div className="back" ref={backEl}>
        {flashcard.answer}
      </div>
    </div>
  );
}
