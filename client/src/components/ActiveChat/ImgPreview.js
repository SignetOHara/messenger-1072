import { Box, Grid, Typography, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	card: {
		padding: '0.5rem',
		'&:hover': {
			opacity: '50%',
		},
	},
	previewImg: {
		display: 'inline-block',
		backgroundColor: '#F4F6FA',
		borderRadius: 8,
		padding: '1rem',
		textAlign: 'center',
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
					<Box key={key} className={classes.previewImg}>
						<Typography style={{ fontSize: '12px' }}>
							Preview
						</Typography>
						<Card className={classes.card}>
							<img
								src={URL.createObjectURL(file)}
								alt={file.name}
								height="100px"
								onClick={() => handleRemoveImage(file.name)}
								role="button"
								tabIndex="0"
								style={{ cursor: 'pointer' }}
							/>
						</Card>
					</Box>
				);
			})}
		</Grid>
	);
};

export default ImgPreview;
