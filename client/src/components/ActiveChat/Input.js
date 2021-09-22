import React, { useState } from 'react';
import {
  FormControl,
  FilledInput,
  CircularProgress,
  Input as InputMUI,
  Box,
  InputLabel,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { postMessage, uploadImages } from '../../store/utils/thunkCreators';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ImgPreview from './ImgPreview';

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  spinner: {
    marginBottom: theme.spacing(2),
  },
  input: {
    height: 70,
    backgroundColor: theme.palette.background.bubble,
    borderRadius: 8,
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSelectFile = (e) => {
    let allFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      allFiles.push(e.target.files[i]);
    }
    if (allFiles.length > 0) {
      setFiles(allFiles);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const savedText = event.target.text.value;

    // Enable spinner and clear text input, storing value in savedText variable
    setLoading(true);
    setText('');
    const imageIds = await uploadImages(files);
    prepareMessage(imageIds, savedText);
  };

  const prepareMessage = async (images, savedText) => {
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: savedText,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: images,
    };
    await postMessage(reqBody);
    setLoading(false);
    setFiles([]);
  };

  return (
    <form className={classes.root} onSubmit={handleUpload}>
      {loading ? (
        <CircularProgress className={classes.spinner} />
      ) : (
        <ImgPreview files={files} setFiles={setFiles} />
      )}
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <Box display="none">
                <InputMUI
                  id={'icon-button-file'}
                  type="file"
                  inputProps={{
                    accept: 'image/*',
                    multiple: true,
                  }}
                  onChange={handleSelectFile}
                />
              </Box>
              <InputLabel htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </InputLabel>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
