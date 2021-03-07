import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const Loader = ({ show, style }) => (
  <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" style={style}>
      <CircularProgress disableShrink color="primary" style={{ zIndex: show ? 100 : 0 }} />
  </Box>
);

export default Loader;