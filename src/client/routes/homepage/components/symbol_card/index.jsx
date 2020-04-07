import React from 'react';
import {
  Card, CardContent, Typography, Grid, IconButton, Tooltip,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import './style.css';

function SymbolCard({ symbol, removeSymbolFromWatchList }) {
  return (
    <Card raised className="symbol-card">
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <Typography display="inline" className="symbol-card-text">
              {symbol.symbol}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className="symbol-card-text">
              {`${symbol.price}`.substr(0, 6)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={`typography-forex-card-price ${symbol.change > 0 ? 'color-green' : ''} ${symbol.change < 0 ? 'color-red' : ''}`}>
              {`(${symbol.changesPercentage}%)`}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title={`remove '${symbol.symbol}' from watchlist`}>
              <IconButton className="remove-symbol-button" onClick={removeSymbolFromWatchList}>
                <i className="fas fa-times" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

SymbolCard.propTypes = {
  symbol: PropTypes.object.isRequired,
  removeSymbolFromWatchList: PropTypes.func.isRequired,
};

export default SymbolCard;
