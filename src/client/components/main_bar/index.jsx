import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItem, Divider,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

// CSS
import './style.css';

function MainBar() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  function isSelected(path) {
    return currentPath === path;
  }

  function setPath(path) {
    return setCurrentPath(path);
  }

  return (
    <>
      <AppBar className="main-bar">
        <Toolbar>
          <Typography variant="h5" noWrap>
            Money Maker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" PaperProps={{ className: 'menu' }}>
        <Toolbar />
        <List disablePadding>
          <Link to="/">
            <ListItem button selected={isSelected('/')} onClick={() => setPath('/')}>
              <i className="fas fa-home menu-icon" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/profile">
            <ListItem button selected={isSelected('/profile')} onClick={() => setPath('/profile')}>
              <i className="fas fa-user menu-icon" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
}

export default MainBar;
