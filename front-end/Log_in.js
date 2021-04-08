import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dashboard from "./Dashboard";
import ReactDOM from "react-dom";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Log_in() {
  const classes = useStyles();



  async function getUser() {



    const response = await fetch("http://localhost:3001/");
    const json = await response.json();
    console.log(json)


    const username = json[0].username
    const password = json[0].password

    
    //console.log(username)
    //console.log(password)

    let USR = document.forms["signInForm"]["email"].value;
    let PWD = document.forms["signInForm"]["password"].value;

    //if user and password inputted matches a db record then display dash (not finished)
    if(USR === username && PWD === password)
    {

        dash()

    }
  }











  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} name={"signInForm"} onClick={getUser}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
              Sign In
            </Button>
            <button onClick={getUser}>
              TRY
            </button>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>

  );
}

function dash(){

  ReactDOM.render(
      <React.StrictMode>
        <Dashboard />
      </React.StrictMode>,
      document.getElementById('root')


  );

}







export default Log_in;
