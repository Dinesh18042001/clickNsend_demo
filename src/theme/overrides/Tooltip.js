// ----------------------------------------------------------------------

export default function Tooltip(theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[isLight ? 800 : 500],
        },
        arrow: {
          color: theme.palette.grey[isLight ? 800 : 500],
        },
      },
    },
  };
}
