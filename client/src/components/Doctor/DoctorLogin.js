import { Container, TextField, Typography, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

import React, { useState, useEffect, Fragment } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Auth from '../../utils/Auth';
const useStyle = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    display: 'block',
  },
});
const DoctorLogin = (props) => {
  console.log('Doctorlogin');
  const classes = useStyle();
  const [emailError, setEmailError] = useState(false);
  const [passwdError, setPasswdError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  useEffect(() => {
    if (Auth.loggedIn()) {
      if (Auth.isdoctor()) history.push('/doctor/home');
      else history.push('/patient/home');
    }
  }, []);
  const doLogin = async (e) => {
    e.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .post(
        'http://localhost:5000/doctor/login',
        {
          Email: email,
          Password: password,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        history.push('/doctor/home');
      })
      .catch((error) => {
        console.log('Error ========>', error.response.data);
      });
  };

  return (
    <Container>
      <Typography className={classes.field}>Login Form</Typography>
      <form noValidate onSubmit={doLogin}>
        {/* <Stack direction='column' spacing={2}> */}
        <TextField
          label='Email'
          className={classes.field}
          required
          name='email'
          placeholder='Email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          error={emailError}
        />
        <TextField
          type='password'
          className={classes.field}
          label='Password'
          name='password'
          error={passwdError}
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button type='submit' variant='contained' color='primary'>
          Login
        </Button>
        {/* </Stack> */}
      </form>
    </Container>
  );
};

export default DoctorLogin;
