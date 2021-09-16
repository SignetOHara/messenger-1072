import React from 'react';
import { Grid, Typography, CssBaseline, Hidden } from '@material-ui/core';
import { ReactComponent as BubbleIcon } from '../assets/bubble.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	image: {
		backgroundImage: `url("/bg-img.png")`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'top',
		position: 'relative',
	},
	overlay: {
		opacity: '85%',
		background: 'linear-gradient(180deg, #3A8DFF, #86B9FF)',
		position: 'absolute',
		height: '100%',
		width: '100%',
	},
	textOverlay: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 400,
		marginBottom: theme.spacing(14),
	},
	bubble: {
		marginBottom: theme.spacing(5),
	},
}));

const MainImg = () => {
	const classes = useStyles();
	return (
		<>
			<CssBaseline />
			<Hidden smDown>
				<Grid item xs={false} sm={4} md={5} className={classes.image}>
					<Grid
						container
						justifyContent="center"
						alignItems="center"
						component="aside"
						direction="column"
						className={classes.overlay}
					>
						<BubbleIcon className={classes.bubble} />
						<Typography
							component="h2"
							variant="h1"
							className={classes.textOverlay}
						>
							Converse with anyone <br /> with any language
						</Typography>
					</Grid>
				</Grid>
			</Hidden>
		</>
	);
};

export default MainImg;
