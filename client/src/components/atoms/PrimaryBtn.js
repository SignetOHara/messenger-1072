import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	button: {
		boxShadow: 'none',
		width: '160px',
		height: '56px',
		lineHeight: '19px',
		borderRadius: '5px',
		marginTop: '2rem',
		fontWeight: '400',
	},
}));

const PrimaryBtn = ({ text }) => {
	const classes = useStyles();
	return (
		<Button
			className={classes.button}
			type="submit"
			color="primary"
			variant="contained"
			size="large"
		>
			{text}
		</Button>
	);
};

export default PrimaryBtn;
