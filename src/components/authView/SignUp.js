import React, { useState, useEffect, Component, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {UserContext} from '../UserContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const api = axios.create({
  baseURL: '/api'
})

export default function SignUp() {

    const classes = useStyles();

          const [Name, setName] = useState("");
          const [Email, setEmail] = useState("");
          const [Password, setPassword] = useState("");
          const history = useHistory();
          const [Gender, setGender] = useState("");
          const {user, setUser} = useContext(UserContext);

          const onSubmitHandler = (event) => {

            event.preventDefault();

            let res = api.post('/User/CreateUser', {
              Name: `${Name}`,
              Email: `${Email}`,
              Password: `${Password}`,
              Gender: `${Gender}`
            }).then(res => {
              console.log(res.data);
              if (res.data.isSuccess)
              setUser(res.data);
              console.log(user.idUser);
              history.push('/booksList');
            }).catch(err => {
              console.log(err);
            });
          }

          return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Register In 1001Books
              </Typography>

                <form className={classes.form} noValidate
                  onSubmit={onSubmitHandler}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <TextField
                        autoComplete="Name"
                        name="Name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        required
                        fullWidth
                        id="Name"
                        label="Name"
                        autoFocus
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Email"
                        label="Email Address"
                        name="Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="Password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        type="password"
                        id="Password"
                        autoComplete="current-password"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={Gender} onChange={(e) => setGender(e.target.value)}>
                          <FormControlLabel value="Female" control={<Radio />} label="Female" />
                          <FormControlLabel value="Male" control={<Radio />} label="Male" />

                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmitHandler}
                  >
                    Sign Up
                </Button>

                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link to='signin'>
                        Already have an account? Sign in
                     </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Container>
          );
        }
  

