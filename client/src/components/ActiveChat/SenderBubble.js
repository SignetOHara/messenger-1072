import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';
import { Image } from 'cloudinary-react';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	date: {
		fontSize: 11,
		color: '#BECCE2',
		fontWeight: 'bold',
		marginBottom: 5,
	},
	text: {
		fontSize: 14,
		color: '#91A3C0',
		letterSpacing: -0.2,
		padding: 8,
		fontWeight: 'bold',
	},
	image: {
		width: '150px',
		borderRadius: '5px',
		marginLeft: '1rem',
	},
	bubble: {
		background: '#F4F6FA',
		borderRadius: '10px 10px 0 10px',
	},
}));

const SenderBubble = (props) => {
	const classes = useStyles();
	const { time, text, images } = props;

	return (
		<Box className={classes.root}>
			<Typography className={classes.date}>{time}</Typography>
			<Grid container alignItems="center" justifyContent="flex-end">
				{images &&
					images.map((image) => (
						<Box key={image}>
							<Image
								className={classes.image}
								publicId={image}
								fetch-format="auto"
								quality="auto"
							/>
						</Box>
					))}
			</Grid>
			<Box className={classes.bubble}>
				<Typography className={classes.text}>{text}</Typography>
			</Box>
		</Box>
	);
};

export default SenderBubble;
