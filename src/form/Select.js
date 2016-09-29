import { FormControl,FormGroup,ControlLabel } from  '@sketchpixy/rubix';
import _ from 'lodash';
import {HOC} from 'formsy-react';
import React from  'react';

class Select extends React.Component {


  handleOnChange(e){

    if(this.props.multiple){
      const currentValue = this.props.getValue();
      console.log(_.uniq(currentValue.concat(e.target.value)));
      this.props.setValue(_.uniq(currentValue.concat(e.target.value)));
    }
    else{
      this.props.setValue(e.target.value)
    }
  }

  render(){
    const { label,controlId } = this.props;
    return (
        <FormGroup controlId={controlId}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl componentClass="select"
                       multiple={this.props.multiple}
                       placeholder="select"
                       value={this.props.getValue()}
                       onChange={(e) => this.handleOnChange(e)}>
            {this.props.options.map(option =>
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
            )}
          </FormControl>
        </FormGroup>
    );
  }
}

Select.defaultProps = {multiple: false};

export default HOC(Select);

