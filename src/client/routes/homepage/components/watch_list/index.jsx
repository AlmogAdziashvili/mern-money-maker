import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
  Typography, IconButton, Dialog, Tooltip,
} from '@material-ui/core';
import SymbolForm from '../../containers/symbol_form';
import SymbolCard from '../symbol_card';
import Skeleton from '@material-ui/lab/Skeleton';

// CSS
import './style.css';

function WatchList({ watchListScope, removeSymbolFromWatchList, setDialogState }) {
  return (
    <>
      <Typography variant="h4" className="watch-list-title" display="inline">
        My WatchList
      </Typography>
      <Tooltip title="Add New Symbol">
        <IconButton className="add-symbol-button" onClick={() => setDialogState(true)}>
          <i className="fas fa-plus" />
        </IconButton>
      </Tooltip>
      <br />
      {watchListScope.watchListData ? (
        <div className="watch-list-container">
          {watchListScope.watchListData && watchListScope.watchListData.map(symbol => (
            <SymbolCard
              key={symbol.symbol}
              symbol={symbol}
              removeSymbolFromWatchList={
                () => removeSymbolFromWatchList(symbol.symbol, watchListScope.watchListArray)
              }
            />
          ))}
        </div>
      )
        : (
          <div className="watch-list-container">
            <Skeleton variant="rect" width={250} height={56} className="skeleton-symbol-card" />
            <Skeleton variant="rect" width={250} height={56} className="skeleton-symbol-card" />
            <Skeleton variant="rect" width={250} height={56} className="skeleton-symbol-card" />
            <Skeleton variant="rect" width={250} height={56} className="skeleton-symbol-card" />
            <Skeleton variant="rect" width={250} height={56} className="skeleton-symbol-card" />
            <Skeleton variant="rect" width={250} height={56} className="skeleton-symbol-card" />
            <Skeleton variant="rect" width={250} height={56} className="skeleton-symbol-card" />
          </div>
        )}
      <Dialog open={Boolean(watchListScope.dialogState)} onClose={() => setDialogState(false)} PaperProps={{ className: 'dialog-paper' }}>
        <SymbolForm />
      </Dialog>
    </>
  );
}

WatchList.defaultProps = {
  watchListScope: {},
};

WatchList.propTypes = {
  watchListScope: PropTypes.object,
  removeSymbolFromWatchList: PropTypes.func.isRequired,
  setDialogState: PropTypes.func.isRequired,
};

export default WatchList;
