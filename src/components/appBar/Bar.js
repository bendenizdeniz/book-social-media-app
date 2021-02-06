import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    appBar: {
      backgroundColor: "#fff"
    }
}));

export default function 
Bar() {
  const classes = useStyles();
  
    return (
        <div>
            <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" color="primary">
            1001Books
          </Typography>
        </Toolbar>
      </AppBar>
        </div>
    )
}

