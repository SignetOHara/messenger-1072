import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Grid,
	Typography,
	FormControl,
	TextField,
	Box,
	Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { login } from './store/utils/thunkCreators';

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
		bottom: '2rem',
		right: '0.5rem',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1.5),
	},
	inputContainer: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
}));

const Login = (props) => {
	const classes = useStyles();
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
		<Grid className={classes.root} container component="main">
			<MainImg />
			<Grid container item xs={12} sm={12} md={7}>
				<Paper>
					<TopBar
						topText="Don't have an account?"
						btnText="Create account"
						to="/register"
						width="170px"
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
								Welcome back!
							</Typography>
						</Box>
						<form onSubmit={handleLogin} className={classes.form}>
							<Grid
								container
								alignItems="center"
								direction="column"
							>
								<Grid className={classes.inputContainer}>
									<FormControl
										margin="normal"
										required
										style={{ width: '100%' }}
									>
										<TextField
											aria-label="username"
											label="Username"
											name="username"
											type="text"
										/>
									</FormControl>
								</Grid>
								<Grid className={classes.inputContainer}>
									<FormControl
										margin="normal"
										required
										style={{ width: '100%' }}
									>
										<TextField
											label="Password"
											aria-label="password"
											type="password"
											name="password"
										/>
									</FormControl>
								</Grid>
								<Grid>
									<PrimaryBtn text={'Login'} />
								</Grid>
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
		login: (credentials) => {
			dispatch(login(credentials));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
