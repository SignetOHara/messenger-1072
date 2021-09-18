import { Box, Grid, Typography, Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	card: {
		padding: theme.spacing(1),
		'&:hover': {
			opacity: '50%',
		},
	},
	previewText: {
		fontSize: theme.typography.small.fontSize,
		color: theme.palette.small.main,
		fontWeight: 'bold',
	},
	previewContainer: {
		display: 'inline-block',
		background: theme.palette.background.bubble,
		borderRadius: 8,
		padding: theme.spacing(1),
		textAlign: 'center',
	},
	previewImg: {
		cursor: 'pointer',
		height: 100,
	},
}));

const ImgPreview = ({ files, setFiles }) => {
	const classes = useStyles();

	const handleRemoveImage = (id) => {
		setFiles((prevState) => prevState.filter((file) => file.name !== id));
	};

	return (
		<Grid container alignItems="center" justifyContent="center">
			{files.map((file, key) => {
				return (
					<Box key={key} className={classes.previewContainer}>
						<Typography className={classes.previewText}>
							Preview
						</Typography>
						<Card className={classes.card}>
							<CardMedia
								src={URL.createObjectURL(file)}
								component="img"
								className={classes.previewImg}
								onClick={() => handleRemoveImage(file.name)}
								role="button"
								tabIndex="0"
							/>
						</Card>
					</Box>
				);
			})}
		</Grid>
	);
};

export default ImgPreview;
