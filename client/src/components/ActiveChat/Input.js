import React, { useState } from 'react';
import { FormControl, FilledInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { postMessage } from '../../store/utils/thunkCreators';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ImgPreview from './ImgPreview';

const useStyles = makeStyles(() => ({
	root: {
		justifySelf: 'flex-end',
		marginTop: 15,
	},
	input: {
		height: 70,
		backgroundColor: '#F4F6FA',
		borderRadius: 8,
		marginBottom: 20,
	},
}));

const Input = (props) => {
	const classes = useStyles();
	const [text, setText] = useState('');
	const [files, setFiles] = useState([]);
	
	const { postMessage, otherUser, conversationId, user } = props;

	const handleChange = (event) => {
		setText(event.target.value);
	};

	const prepareMessage = async (event, results) => {
		// add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
		const reqBody = {
			text: event.target.text.value,
			recipientId: otherUser.id,
			conversationId,
			sender: conversationId ? null : user,
			attachments: results,
		};
		await postMessage(reqBody);
		setFiles([]);
		setText('');
	};

	const handleUpload = async (event) => {
		// Prevent form submit
		event.preventDefault();

		// Create form data for each image and new empty array
		const formData = new FormData();
		let imageIds = [];
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			formData.append('file', file);
			formData.append('upload_preset', 'upload');

			// post the formData to Cloudinary but wait until all images uploaded and ids pushed to array
			await fetch(
				'https://api.cloudinary.com/v1_1/dco37iiel/image/upload',
				{
					method: 'POST',
					body: formData,
				}
			)
				.then((response) => {
					return response.text();
				})
				.then((data) => {
					const imgObj = JSON.parse(data);
					const { public_id } = imgObj;
					imageIds.push(public_id);
				});
		}
		prepareMessage(event, imageIds);
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

	return (
		<form className={classes.root} onSubmit={handleUpload}>
			{files && <ImgPreview files={files} setFiles={setFiles} />}
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
							<input
								accept="image/*"
								id="icon-button-file"
								type="file"
								hidden
								multiple
								onChange={handleSelectFile}
							/>
							<label htmlFor="icon-button-file">
								<IconButton
									color="primary"
									aria-label="upload picture"
									component="span"
								>
									<PhotoCamera />
								</IconButton>
							</label>
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
