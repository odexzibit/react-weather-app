// alert('Alles gut')
import React from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './components/main'
require('../css/style.css');

class TodoComponent extends React.Component {
  render(){
    return(
      <div>
        <MainComponent />
      </div>
    );
  }
}

ReactDOM.render(<TodoComponent msg="I like cheese"/>, document.getElementById('todo-wrapper'));
