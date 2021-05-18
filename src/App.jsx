import React, {Component} from 'react';
import Mchoice from './mchoice'

class App extends Component {
    constructor() {
      super();
      this.state = {
        quiz : window.quiz$
        
      };

    } 
  
    render() {
      return (
        <div>
     

            <Mchoice quiz={this.state.quiz} />

        </div>
      );
    }
  }

  export default App;