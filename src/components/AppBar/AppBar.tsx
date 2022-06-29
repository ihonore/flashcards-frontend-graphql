import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersistentDrawerLeft from '../SideDrawer/Drawer';
import { TailSpin } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFilterFlashcardsLazyQuery } from '../../generated/graphql';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredcards } from '../../redux/actions/flashcardsActions';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  // pointerEvents: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 20,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const [open, setOpen] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState('');
  const state: any = useSelector((state) => state);
  const allCards = state?.flashCards?.allCards;

  const dispatch = useDispatch();

  const [filterFlashcards, { loading }] = useFilterFlashcardsLazyQuery({
    variables: {
      filter: '',
    },
  });

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('clicked');
    filterFlashcards({
      variables: {
        filter: filterValue,
      },
      onCompleted: ({ flashcards }) => {
        dispatch(setFilteredcards(flashcards.flashcards));
      },
    });
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: 'fixed',
          width: '100vw',
          top: 0,
          zIndex: 20,
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: '#543980' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon onClick={() => setOpen(!open)} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
              }}
              onClick={() => navigate('/dashboard')}
            >
              FLASHCARDS APP
            </Typography>
            <Search>
              <SearchIconWrapper onClick={handleSearch}>
                {loading ? (
                  <TailSpin width={20} height={20} color="white" />
                ) : (
                  <SearchIcon />
                )}
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onFocus={(e) => {
                  if (pathname !== '/search') {
                    navigate('/search');
                  }
                }}
                onChange={async (e) => {
                  setFilterValue(e.target.value);
                  console.log(e.target.value);
                  const found = await allCards.filter((card: any) => {
                    return (
                      card.question
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      card.answer
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                  });
                  dispatch(setFilteredcards(found));
                }}
                autoFocus={pathname === '/search' ? true : false}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <PersistentDrawerLeft open={open} close={handleDrawerClose} />
    </>
  );
}
