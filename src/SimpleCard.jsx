import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '50%',
    margin: '0 auto',
    padding: 15
  },

  title: {
    fontSize: 16,
  },
  Msg: {
    padding: '18px 0px 6px 0px',
  },
});


export default function SimpleCard() {
    const classes = useStyles();
  
    return (
      <Card className={classes.root}>
          <Typography className={classes.title} color="textSecondary" >
            Quiz Preview
          </Typography>
          <Divider/>
          <Typography className={classes.Msg} color="textSecondary">
            Enter the question & answers then press on [Generate] button
          </Typography>
       
          
      </Card>
    );
  }