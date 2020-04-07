import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import {
  TextField, Button, Paper,
} from '@material-ui/core';

// Redux Actions
import watchListActions from '../../../../modules/watch_list/watch_list_actions';

import './style.css';

function SymbolForm({ watchListActionsAPI, watchListScope }) {
  const symbolFormik = useFormik({
    initialValues: {
      symbol: '',
    },
    onSubmit: (values) => {
      const newSymbol = values.symbol.toUpperCase();
      if (watchListScope.watchListArray.includes(newSymbol)) {
        return 0;
      }
      watchListActionsAPI.addSymbolToWatchList(newSymbol, watchListScope.watchListArray);
      return watchListActionsAPI.setDialogState(false);
    },
  });

  return (
    <Paper elevation={2} className="paper-symbol">
      <form onSubmit={symbolFormik.handleSubmit} autoComplete="off" className="form-symbol">
        <TextField fullWidth name="symbol" type="text" label="Symbol" variant="outlined" onChange={symbolFormik.handleChange} value={symbolFormik.values.symbol} required />
        <Button type="submit" variant="outlined">Add Symbol</Button>
      </form>
    </Paper>
  );
}

SymbolForm.propTypes = {
  watchListActionsAPI: PropTypes.object.isRequired,
  watchListScope: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    watchListScope: state.watchList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    watchListActionsAPI: bindActionCreators(watchListActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SymbolForm);
