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
} from '@material-ui/core';
import { ReactComponent as BubbleIcon } from './components/assets/bubble.svg';
import { makeStyles } from '@material-ui/core/styles';
import { register } from './store/utils/thunkCreators';

const useStyles = makeStyles(() => ({
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
		marginBottom: '39px',
	},
	existingUserSection: {
		padding: '1.875rem 2.625rem',
    height: '',
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
			<Grid container item xs={12} sm={8} md={7}>
				<Grid
					container
					alignItems="baseline"
					justifyContent="flex-end"
					item
					className={classes.existingUserSection}
				>
					<Typography component="h3">
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
					container
					justifyContent="flex-start"
					alignItems="center"
					direction="column"
				>
					<Typography component="h1">Create an account</Typography>
					<form onSubmit={handleRegister}>
						<Grid>
							<Grid>
								<FormControl>
									<TextField
										aria-label="username"
										label="Username"
										name="username"
										type="text"
										required
									/>
								</FormControl>
							</Grid>
							<Grid>
								<FormControl>
									<TextField
										label="E-mail address"
										aria-label="e-mail address"
										type="email"
										name="email"
										required
									/>
								</FormControl>
							</Grid>
							<Grid>
								<FormControl
									error={!!formErrorMessage.confirmPassword}
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
							<Grid>
								<FormControl
									error={!!formErrorMessage.confirmPassword}
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
