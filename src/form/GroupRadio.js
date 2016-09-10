import React from 'react';
import { Radio,FormControl } from '@sketchpixy/rubix';
import { HOC } from 'formsy-react';


class GroupRadio extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  componentDidMount(){
    const value = this.props.defaultValue || this.props.value;
    this.props.setValue(value);
    this.setState({value});
  }

  changeValue(value){
    this.props.setValue(value);
    this.setState({value});
  }

  render(){
    const { name, title, items } = this.props;
    const radios = items.map((item, i) => (
        <div key={`${name}-${i}`}>
          <Radio inline
                 name={name}
                 onClick={(e)=> this.changeValue(e.target.value,e)}
                 value={item.value}
                 checked={this.state.value === item.value}>
            {item.title}
          </Radio>
          {' '}
        </div>
    ));

    return <div> {radios} </div>;

  }
}

export default HOC(GroupRadio);