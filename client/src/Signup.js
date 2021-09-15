import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Grid,
	Typography,
	FormControl,
	TextField,
	FormHelperText,
	Box,
	Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { register } from './store/utils/thunkCreators';

import MainImg from './components/atoms/MainImg';
import TopBar from './components/atoms/TopBar';
import PrimaryBtn from './components/atoms/PrimaryBtn';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	h1Box: {
		alignSelf: 'flex-start',
	},
	formSection: {
		height: '100%',
		maxWidth: '380px',
		position: 'relative',
		bottom: '-2rem',
		right: '0.5rem',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1.5),
	},
	inputContainer: {
		width: '100%',
	},
}));

const Login = (props) => {
	const classes = useStyles();
	const { user, register } = props;
	const [formErrorMessage, setFormErrorMessage] = useState({});

	const handleRegister = async (event) => {
		event.preventDefault();
		const username = event.target.username.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		const confirmPassword = event.target.confirmPassword.value;

		if (password !== confirmPassword) {
			setFormErrorMessage({ confirmPassword: 'Passwords must match' });
			return;
		}

		await register({ username, email, password });
	};

	if (user.id) {
		return <Redirect to="/home" />;
	}

	return (
		<Grid className={classes.root} container component="main">
			<MainImg />
			<Grid container item xs={12} sm={12} md={7}>
				<Paper>
					<TopBar
						topText="Already have an account?"
						btnText="Login"
						to="/login"
						width="140px"
					/>
					<Grid
						className={classes.formSection}
						container
						justifyContent="center"
						alignItems="center"
						direction="column"
					>
						<Box className={classes.h1Box}>
							<Typography component="h1" variant="h1">
								Create an account.
							</Typography>
						</Box>
						<form
							onSubmit={handleRegister}
							className={classes.form}
						>
							<Grid
								container
								alignItems="center"
								direction="column"
							>
								<Grid className={classes.inputContainer}>
									<FormControl style={{ width: '100%' }}>
										<TextField
											aria-label="username"
											label="Username"
											name="username"
											type="text"
											required
										/>
									</FormControl>
								</Grid>
								<Grid className={classes.inputContainer}>
									<FormControl
										style={{ width: '100%' }}
										margin="normal"
									>
										<TextField
											label="E-mail address"
											aria-label="e-mail address"
											type="email"
											name="email"
											required
										/>
									</FormControl>
								</Grid>
								<Grid className={classes.inputContainer}>
									<FormControl
										style={{ width: '100%' }}
										error={
											!!formErrorMessage.confirmPassword
										}
										margin="normal"
									>
										<TextField
											aria-label="password"
											label="Password"
											type="password"
											inputProps={{ minLength: 6 }}
											name="password"
											required
										/>
										<FormHelperText>
											{formErrorMessage.confirmPassword}
										</FormHelperText>
									</FormControl>
								</Grid>
								<Grid className={classes.inputContainer}>
									<FormControl
										style={{ width: '100%' }}
										error={
											!!formErrorMessage.confirmPassword
										}
										margin="normal"
									>
										<TextField
											label="Confirm Password"
											aria-label="confirm password"
											type="password"
											inputProps={{ minLength: 6 }}
											name="confirmPassword"
											required
										/>
										<FormHelperText>
											{formErrorMessage.confirmPassword}
										</FormHelperText>
									</FormControl>
								</Grid>
								<PrimaryBtn text={'Create'} />
							</Grid>
						</form>
					</Grid>
				</Paper>
			</Grid>
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
		register: (credentials) => {
			dispatch(register(credentials));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
