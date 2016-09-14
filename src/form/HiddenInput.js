import React from  'react';
import {HOC} from 'formsy-react';


class Input extends React.Component {


  constructor(props){
    super(props);
  }


  render(){
    return (
        <input
            value={this.props.getValue()}
            type={'hidden'}
            onChange={(e) => this.props.setValue(e.target.value)}/>
    );
  }
}

export default HOC(Input);
