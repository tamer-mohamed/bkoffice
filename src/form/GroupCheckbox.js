import React from 'react';
import { Checkbox,FormGroup,ControlLabel } from '@sketchpixy/rubix';
import { HOC } from 'formsy-react';


function contains(container, item, cmp){
  for(const it of container){
    if(cmp(it, item)){
      return true;
    }
  }
  return false;
}


class GroupCheckbox extends React.Component {
  constructor(props){
    super(props);

    this.state = {value:[], cmp: (a, b) => a === b};
  }

  componentDidMount(){
    const value =this. props.defaultValue || [];
    this.props.setValue(value);
    this.setState({value: value, cmp: this.props.cmp || this.state.cmp});
  }

  changeValue(value, event){
    const checked = event.currentTarget.checked;

    let newValue = [];
    if(checked){
      newValue = this.state.value.concat(value);
    }else{
      newValue = this.state.value.filter(it => !this.state.cmp(it, value));
    }

    this.props.setValue(newValue);
    this.setState({value: newValue});
  }

  render(){
    const { name, title, items } = this.props;
    const radios = items.map((item, i) => (
        <div key={`${name}-${i}`}>
          <Checkbox inline
                    name={`${name}[${i}]`}
                    onChange={this.changeValue.bind(this, item.value)}
                    value={item.value}
                    checked={contains(this.state.value, item.value, this.state.cmp)}>
            {item.title}
          </Checkbox>
          {' '}
        </div>
    ));

    return (
        <FormGroup>
          <ControlLabel> { title } </ControlLabel>
          {radios}
        </FormGroup>
    );

  }
}

export default HOC(GroupCheckbox);