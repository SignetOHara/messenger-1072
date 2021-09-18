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
		small: {
			fontSize: '11px',
		},
	},
	overrides: {
		MuiInput: {
			input: {
				fontWeight: 'bold',
				fontSize: '14px',
				paddingLeft: '5px',
				marginTop: '1rem',
			},
		},
		MuiInputLabel: {
			root: {
				paddingLeft: '5px',
				fontSize: '19px',
			},
		},
		MuiPaper: {
			root: {
				padding: '30px 42px',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			},
		},
	},
	palette: {
		primary: { main: '#3A8DFF' },
		secondary: { main: '#3A8DFF' },
		background: { bubble: '#F4F6FA' },
		small: { main: '#BECCE2' },
	},
});
