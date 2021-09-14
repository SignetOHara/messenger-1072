import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Grid,
	Typography,
	Button,
	FormControl,
	TextField,
	CssBaseline,
	Hidden,
	Box,
} from '@material-ui/core';
import { ReactComponent as BubbleIcon } from './components/assets/bubble.svg';
import { makeStyles } from '@material-ui/core/styles';
import { login } from './store/utils/thunkCreators';

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
    marginBottom: theme.spacing(8),
	},
	bubble: {
		marginBottom: theme.spacing(5),
	},
	paper: {
		margin: theme.spacing(5, 5),
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	topText: {
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
		marginBottom: theme.spacing(5),
	},
	button: {
		boxShadow: '0px 2px 12px rgba(74,106,149,0.2)',
		minWidth: '160px',
		maxWidth: '170px',
		height: '56px',
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
					>
						<Typography className={classes.topText}>
							Don't have an account?
						</Typography>
						<Button
							className={classes.button}
							onClick={() => history.push('/register')}
							color="secondary"
						>
							Create account
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
									<Button
										className={classes.button}
										type="submit"
										color="primary"
										variant="contained"
										size="large"
									>
										Login
									</Button>
								</Grid>
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
		login: (credentials) => {
			dispatch(login(credentials));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
