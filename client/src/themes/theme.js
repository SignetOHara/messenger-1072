import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
	typography: {
		fontFamily: 'Open Sans, sans-serif',
		fontSize: 14,
		button: {
			textTransform: 'none',
			letterSpacing: 0,
			fontWeight: 600,
			fontFamily: 'Montserrat, sans-serif',
		},
		h1: {
			fontSize: '1.625rem',
      lineHeight: '2.5rem',
      fontWeight: '600',
		},
	},
	overrides: {
		MuiInput: {
			input: {
				fontWeight: 'bold',
			},
		},
	},
	palette: {
		primary: { main: '#3A8DFF' },
		secondary: { main: '#3A8DFF' },
	},
});
