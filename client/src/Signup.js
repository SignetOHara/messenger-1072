import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Grid,
	Typography,
	Button,
	FormControl,
	TextField,
	FormHelperText,
	CssBaseline,
	Hidden,
	Box,
} from '@material-ui/core';
import { ReactComponent as BubbleIcon } from './components/assets/bubble.svg';
import { makeStyles } from '@material-ui/core/styles';
import { register } from './store/utils/thunkCreators';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
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
	},
	bubble: {
		marginBottom: '2.5rem',
	},
	paper: {
		margin: theme.spacing(5, 5),
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	existingUserText: {
		marginRight: '2rem',
		color: '#b0b0b0',
		fontSize: '.875rem',
	},
	h1Box: {
		alignSelf: 'flex-start',
	},
	formSection: {
		height: '100%',
		maxWidth: '380px',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1.5),
	},
	inputContainer: {
		width: '100%',
		marginBottom: '2.5rem',
	},
	button: {
		boxShadow: '0px 2px 12px rgba(74,106,149,0.2)',
		width: '140px',
		height: '54px',
		lineHeight: '19px',
		borderRadius: '5px',
	},
}));

const Login = (props) => {
	const classes = useStyles();
	const history = useHistory();
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
			<Grid container item xs={12} sm={12} md={7}>
				<div className={classes.paper}>
					<Grid
						container
						alignItems="baseline"
						justifyContent="flex-end"
						item
						wrap="nowrap"
						className={classes.existingUserSection}
					>
						<Typography
							className={classes.existingUserText}
							component="h3"
						>
							Already have an account?
						</Typography>
						<Button
							className={classes.button}
							onClick={() => history.push('/login')}
							color="secondary"
						>
							Login
						</Button>
					</Grid>
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
											fullWidth
										/>
									</FormControl>
								</Grid>
								<Grid className={classes.inputContainer}>
									<FormControl style={{ width: '100%' }}>
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
								<Button
									className={classes.button}
									type="submit"
									color="primary"
									variant="contained"
									size="large"
								>
									Create
								</Button>
							</Grid>
						</form>
					</Grid>
				</div>
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
