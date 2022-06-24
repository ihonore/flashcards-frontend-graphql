import { AddCircle, Sort } from '@mui/icons-material';
import { MenuItem, Select, Stack, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Loading } from 'react-loading-dot';
import {
  useFlashcardsQuery,
  useOrderByLazyQuery,
} from '../../generated/graphql';
import { Sort as SortEnum } from '../../generated/graphql';
import setAllFlashcards from '../../redux/actions/flashcardsActions';
import CreateFlashcard from '../Flashcard/CreateFlashcard';
import Flashcard from '../Flashcard/Flashcard';
import { TailSpin } from 'react-loader-spinner';

const FlashcardaList: React.FC = () => {
  const { data, error, loading } = useFlashcardsQuery();
  const dispatch = useDispatch();
  const [createMode, setCreateMode] = React.useState(false);

  const [sortLoader, setSortLoader] = React.useState('');
  const { pathname } = useLocation();

  const [
    orderByLazyQuery,
    { loading: sortLoading, data: sortedData, previousData },
  ] = useOrderByLazyQuery();

  const handleClose = () => {
    setCreateMode(false);
  };

  const decideSortingOrder = (sortBy: string) => {
    const previousQueryId = previousData?.flashcards.id;
    if (
      previousQueryId &&
      previousQueryId.search(sortBy) &&
      previousQueryId.search('desc')
    ) {
      return true;
    }
    return false;
  };

  const handleSort = (sortBy: string) => {
    let asc: boolean = decideSortingOrder(sortBy);
    console.log(previousData?.flashcards.id);

    if (sortBy === 'createdAt') {
      setSortLoader(sortBy);
      orderByLazyQuery({
        variables: {
          orderBy: [
            {
              createdAt: asc ? SortEnum.Asc : SortEnum.Desc,
            },
          ],
        },
        onCompleted: () => {
          console.log('completed sorting by time..');
          setSortLoader('');
        },
      });
    } else if (sortBy === 'Question') {
      setSortLoader(sortBy);
      orderByLazyQuery({
        variables: {
          orderBy: [
            {
              question: asc ? SortEnum.Asc : SortEnum.Desc,
            },
          ],
        },
        onCompleted: () => {
          // console.log(sortedData);
          console.log('completed sorting by question..');
          setSortLoader('');
        },
      });
    } else {
      setSortLoader(sortBy);
      orderByLazyQuery({
        variables: {
          orderBy: [
            {
              answer: asc ? SortEnum.Asc : SortEnum.Desc,
            },
          ],
        },
        onCompleted: () => {
          // console.log(sortedData);
          console.log('completed sorting by answer..');
          setSortLoader('');
        },
      });
    }
  };

  const classes = {
    button: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    addCircle: {
      color: '#FFFFFF',
      fontSize: '2.5rem',
      // position: 'absolute',
      // top: { xs: '4rem', sm: '5rem' },
      // right: '1.5rem',
      cursor: 'pointer',
      transition: 'transform .2s',
      '&:hover': {
        transform: 'scale(1.3)',
      },
    },
    box: {
      width: 'auto',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(255,255,255,0.3)',
      // border: '1px solid white',
    },
    sortIcon: {
      height: '2rem',
      color: 'white',
      width: '2rem',
      position: 'absolute',
      top: 2.5,
      left: 2.5,
    },
  };

  if (loading) {
    return (
      <div className="loading" style={{ color: 'white', fontSize: '2rem' }}>
        <Loading background="white" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div style={{ color: 'white', fontSize: '2rem' }}>
        Something went wrong
      </div>
    );
  }

  dispatch(setAllFlashcards(data.flashcards.flashcards));

  let cardsToChooseFrom = sortedData ? sortedData : data;
  const myFlashcards = cardsToChooseFrom.flashcards.flashcards.filter(
    (flashcard) => {
      const strObj: any = localStorage.getItem('currentUser');
      const currentUser = JSON.parse(strObj);
      return flashcard.postedBy?.email === currentUser?.email;
    }
  );

  if (myFlashcards.length < 1 && pathname === '/my-flashcards') {
    return (
      <>
        <div className="card-grid">
          {createMode ? (
            <CreateFlashcard close={handleClose} />
          ) : (
            <div style={{ color: 'white', fontSize: '1.5rem' }}>
              Your flashcards will be listed here
            </div>
          )}

          <Tooltip title="Create Flashcard">
            <AddCircle
              sx={{
                color: '#FFFFFF',
                fontSize: '2.5rem',
                position: 'absolute',
                top: { xs: '4rem', sm: '5rem' },
                right: '1.5rem',
                cursor: 'pointer',
                transition: 'transform .2s',
                '&:hover': {
                  transform: 'scale(1.3)',
                },
              }}
              onClick={() => setCreateMode(!createMode)}
            />
          </Tooltip>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="card-grid">
        {createMode && <CreateFlashcard close={handleClose} />}
        {pathname === '/my-flashcards'
          ? myFlashcards.map((flashcard) => {
              return <Flashcard flashcard={flashcard} />;
            })
          : sortedData
          ? // <div style={{ color: 'white' }}>SORTED DATA</div>
            sortedData.flashcards.flashcards.map((flashcard) => {
              return <Flashcard flashcard={flashcard} />;
            })
          : data.flashcards.flashcards.map((flashcard) => {
              return <Flashcard flashcard={flashcard} />;
            })}
      </div>
      <Stack
        alignItems="center"
        gap={2}
        sx={{
          position: 'absolute',
          top: { xs: '4rem', sm: '5rem' },
          right: '1.5rem',
          flexDirection: { xs: 'row', sm: 'column' },
        }}
      >
        <Tooltip title="Create Flashcard">
          <AddCircle
            sx={classes.addCircle}
            onClick={() => setCreateMode(!createMode)}
          />
        </Tooltip>
        <Box sx={classes.box}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={40}
            label="Age"
            variant="standard"
            sx={{
              width: 50,
              height: 40,
              // marginRight: 15,
              // border: '1px solid white',
            }}
          >
            {['Question', 'Answer', 'createdAt'].map((orderBy) => (
              <MenuItem key={orderBy} onClick={() => handleSort(orderBy)}>
                {sortLoading && sortLoader === orderBy && (
                  <span>
                    <TailSpin width={15} height={15} />
                  </span>
                )}
                <button className="dropdown-item" style={classes.button}>
                  {orderBy}
                </button>
              </MenuItem>
            ))}
          </Select>
          <Sort sx={classes.sortIcon} />
        </Box>
      </Stack>
    </>
  );
};

export default FlashcardaList;
