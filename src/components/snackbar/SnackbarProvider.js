import PropTypes from 'prop-types';
import { useRef } from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Collapse, IconButton } from '@mui/material';
//
import Iconify from '../iconify/index';
//
import StyledNotistack from './styles';

// ----------------------------------------------------------------------

SnackbarProvider.propTypes = {
  children: PropTypes.node,
};

export default function SnackbarProvider({ children }) {

  const isRTL = true;

  const notistackRef = useRef(null);

  const onClose = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <StyledNotistack />

      <NotistackProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={2000}
        TransitionComponent={isRTL ? Collapse : undefined}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        iconVariant={{
          info: <SnackbarIcon  color="info" />,
          success: <SnackbarIcon color="success" />,
          warning: <SnackbarIcon  color="warning" />,
          error: <SnackbarIcon color="error" />,
        }}
        // With close as default
        // action={(key) => (
        //   <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
        //     <Iconify icon="eva:close-fill" />
        //   </IconButton>
        // )}
      >
        {children}
      </NotistackProvider>
    </>
  );
}

// ----------------------------------------------------------------------

SnackbarIcon.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error']),
};

function SnackbarIcon({ icon, color }) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'none',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
       {/* <Iconify icon={icon} width={24} />  */}
    </Box>
  );
}
