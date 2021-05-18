import React from 'react';
import PropTypes from 'prop-types';
import {Paper, Typography, Button, Radio, Fab} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import SimpleCard from './SimpleCard';

const styles = {
    root: {
      padding: 16,
      marginTop: '10px',
      width: "70%",
      margin: "0 auto"
    },
    button:{
      pointerEvents: "none",
      boxShadow: "none"
    },
    questionHeader:{
      marginLeft: 10,
      display: "inline",
      fontSize: "1.5rem",
      fontFamily: "'Caveat', cursive",
      fontWeight: "600"

    },
    questionTxt: {
        fontSize: "2rem",
        marginBottom: "30px",
        fontFamily:'"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
    },
    submit:{
      marginTop: "30px",
      textAlign: "center"
    }
  };

  const correctAnswer = green[300];
  const IncorrectAnswer = red[300];

function Header(props){
    return (
            <div>
                <Typography component="p">
                <Fab color="primary" className={props.button}>
                    <HelpIcon />
                </Fab>
                <span className={props.questionHeader}> Question by React & Material UI</span>
        
                </Typography>

                <hr style={{margin: "20px 0"}}/>
            </div>);
}

class Mchoice extends React.Component {

    constructor(props){
    super(props);
    this.state = {
      quiz: props.quiz,
      selectedValue: '',
      init:'1'
    }
    this.refsArray = [];

    }
    
    

    handleChange = event => {
        this.setState({ selectedValue: event.target.value });
    };
        
    handleNotification = event => {
        if (this.state.init !== '1') {
            this.clearStyle();
        }
        
        
        this.setState({quiz: [event.detail], selectedValue: '', init:0});
    }
        
    componentDidMount() {

        window.addEventListener('pushed', this.handleNotification)
    }

    componentWillUnmount() {
        window.removeEventListener('pushed', this.handleNotification)
    }

    clearStyle = () =>{
     
      this.state.quiz[0].answers.forEach(element => {
          
        this.refsArray[element.id].style.background = "transparent";

      });
    
    }

    chkAnswers = () => {
     
    var answer = this.state.quiz[0].correctAns;
      
      this.clearStyle()

      if(this.state.selectedValue === answer){
        this.refsArray[answer].style.background = correctAnswer;
      }else{
        this.refsArray[answer].style.background = correctAnswer;
        this.refsArray[this.state.selectedValue].style.background = IncorrectAnswer;
      }
    }

      render(){
     
        if (this.state.init === '1') {
            return (
                <div>

                <Paper className={this.props.classes.root} variant="outlined" elevation={4}>

                   <Header button={this.props.classes.button} questionHeader={this.props.classes.questionHeader} />

                   <SimpleCard />
                 </Paper>

                </div>

            );


        }else {

            return (

                <div>
                  
                  <Paper className={this.props.classes.root} variant="outlined" elevation={4}>

                    
                    <Header button={this.props.classes.button} questionHeader={this.props.classes.questionHeader} />

        
                    <Typography component="h1" className={this.props.classes.questionTxt}>
                      {this.state.quiz[0].quizText}
                    </Typography>
            
                    {this.state.quiz[0].answers.map((ans)=>(
                      <div key={ans.id} style={{marginTop: "5px",fontSize:"1rem" , fontFamily:'"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'}}  
                      ref={ref => { 
                        this.refsArray[ans.id] = ref; 
                      }} >
        
                        <Radio
    
                        name="radio-button-group"
                        value={ans.id}
                        onChange={this.handleChange}
                        checked={this.state.selectedValue === ans.id}
        
                        />
                      {ans.ansText}
                      </div>
        
                    ))}
        
                   
                    <div className={this.props.classes.submit}>
                     <Button onClick={this.chkAnswers} variant="contained" color="secondary" >
                        Submit
                    </Button>
                 
                    </div>
                  </Paper>
                </div>
              );
    

        }
      
       
            
      

      }
    }

    Mchoice.propTypes = {
        classes: PropTypes.object.isRequired,
      };
 
    // export default Mchoice;
    export default withStyles(styles)(Mchoice);
