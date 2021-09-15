import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	topText: {
		marginRight: '2rem',
		color: '#b0b0b0',
		fontSize: '.875rem',
	},
	button: {
		boxShadow: '0px 2px 12px rgba(74,106,149,0.2)',
		height: '56px',
		lineHeight: '19px',
		borderRadius: '5px',
	},
}));

const TopBar = ({ topText, btnText, to, width }) => {
	const classes = useStyles();
	const history = useHistory();
	return (
		<Grid
			container
			alignItems="baseline"
			justifyContent="flex-end"
			item
			wrap="nowrap"
		>
			<Typography className={classes.topText}>{topText}</Typography>
			<Button
				className={classes.button}
				style={{ width: width }}
				onClick={() => history.push(to)}
				color="secondary"
			>
				{btnText}
			</Button>
		</Grid>
	);
};

export default TopBar;
