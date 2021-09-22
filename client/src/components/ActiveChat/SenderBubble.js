import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';
import { Image, Transformation } from 'cloudinary-react';

const useStyles = makeStyles((theme) => ({
  date: {
    fontSize: theme.typography.small.fontSize,
    color: theme.palette.small.main,
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  text: {
    fontSize: 14,
    color: '#91A3C0',
    letterSpacing: -0.2,
    fontWeight: 'bold',
  },
  bubble: {
    background: theme.palette.background.bubble,
    borderRadius: '10px 10px 0 10px',
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, images } = props;

  let height = '150';
  let width = '150';

  if (images && images.length > 1) {
    height = '100';
    width = '100';
  }

  let padding = 1;
  if (text.length === 0) {
    padding = 0;
  }

  return (
    <Grid container direction="column" alignItems="flex-end">
      <Typography className={classes.date}>{time}</Typography>
      <Grid container alignItems="center" justifyContent="flex-end">
        {images &&
          images.map((image) => (
            <Box ml={2} key={image}>
              <Image
                publicId={image}
                fetch-format="auto"
                quality="auto"
              >
                <Transformation
                  height={height}
                  width={width}
                  crop="fill"
                  radius="8"
                />
              </Image>
            </Box>
          ))}
      </Grid>
      <Box p={padding} className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    </Grid>
  );
};

export default SenderBubble;
