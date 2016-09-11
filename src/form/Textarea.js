import React from  'react';
import {HOC} from 'formsy-react';
import { FormControl,FormGroup,InputGroup,Icon,ControlLabel } from  '@sketchpixy/rubix';


class Textarea extends React.Component {


  constructor(props){
    super(props);
  }


  render(){
    const { controlId,type,placeholder,bsSize,title } = this.props;
    return (
        <FormGroup controlId={controlId}>
          <ControlLabel>{ title }</ControlLabel>
          <FormControl
              componentClass="textarea"
              value={this.props.getValue()}
              type={type}
              onChange={(e) => this.props.setValue(e.target.value)}
              className='border-focus-blue'
              placeholder={placeholder}/>
        </FormGroup>
    );
  }
}


Textarea.defaultProps = {
  bsSize: "sm",
  type: "text",
  placeholder: '',
  label: ""
};

export default HOC(Textarea);
