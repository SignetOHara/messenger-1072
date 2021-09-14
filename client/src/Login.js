import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Grid,
	Box,
	Typography,
	Button,
	FormControl,
	TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { login } from './store/utils/thunkCreators';

const useStyles = makeStyles(() => ({
	root: {
		width: '100vw',
		height: '100vh',
	},
	button: {
		backgroundColor: '#fff',
		boxShadow: '0px 2px 12px rgba(74,106,149,0.2)',
		color: '#3A8DFF',
		width: '170px',
		height: '54px',
		lineHeight: '19px',
		borderRadius: '5px',
	},
}));

const Login = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const { user, login } = props;

	const handleLogin = async (event) => {
		event.preventDefault();
		const username = event.target.username.value;
		const password = event.target.password.value;

		await login({ username, password });
	};

	if (user.id) {
		return <Redirect to="/home" />;
	}

	return (
		<Grid container justifyContent="center" className={classes.root}>
			<Box></Box>
			<Box>
				<Grid container item>
					<Typography>Don't have an account?</Typography>
					<Button
						className={classes.button}
						onClick={() => history.push('/register')}
					>
						Create account
					</Button>
				</Grid>
				<form onSubmit={handleLogin}>
					<Grid>
						<Grid>
							<FormControl margin="normal" required>
								<TextField
									aria-label="username"
									label="Username"
									name="username"
									type="text"
								/>
							</FormControl>
						</Grid>
						<FormControl margin="normal" required>
							<TextField
								label="password"
								aria-label="password"
								type="password"
								name="password"
							/>
						</FormControl>
						<Grid>
							<Button
								type="submit"
								variant="contained"
								size="large"
							>
								Login
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Grid>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (credentials) => {
			dispatch(login(credentials));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
