import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  AccountCircle,
  AutoAwesomeMotion,
  BadgeOutlined,
  ExitToApp,
  Sort,
} from '@mui/icons-material';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  backgroundColor: '#543980',
}));

export default function PersistentDrawerLeft({
  open,
  close,
}: {
  open: boolean;
  close: any;
}) {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={close} sx={{ color: 'white' }}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key="Public FlashCards" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AutoAwesomeMotion />
              </ListItemIcon>
              <ListItemText primary="Public Flashcards" />
            </ListItemButton>
          </ListItem>
          <ListItem key="My FlashCards" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BadgeOutlined />
              </ListItemIcon>
              <ListItemText primary="My Flashcards" />
            </ListItemButton>
          </ListItem>
          <ListItem key="sort" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Sort />
              </ListItemIcon>
              <ListItemText primary="Sort Flashcards" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Box
          flexGrow={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <List>
            <ListItem key="Logout" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
          <List>
            <ListItem key="user" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Honore Iradukunda" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
