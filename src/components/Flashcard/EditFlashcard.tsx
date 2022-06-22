import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const EditFlashcard = ({ close, flashcard }: any) => {
  const [formState, setFormState] = React.useState({
    question: flashcard.question,
    answer: flashcard.answer,
    error: '',
  });

  return (
    <Box component="form" noValidate sx={{ mt: 1, background: '#D6FAE7' }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="question"
        label="Question"
        name="question"
        autoFocus
        value={formState.question}
        onChange={(e) =>
          setFormState({
            ...formState,
            question: e.target.value,
            error: '',
          })
        }
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="answer"
        label="Answer"
        id="answer"
        value={formState.answer}
        onChange={(e) =>
          setFormState({
            ...formState,
            answer: e.target.value,
            error: '',
          })
        }
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, bgcolor: '#543980' }}
        onClick={close}
      >
        SAVE
      </Button>
    </Box>
  );
};

export default EditFlashcard;
