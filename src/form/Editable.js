import React , {Component} from 'react';

export default class Editable extends Component {

  componentDidMount(){
    $(this.refs.editable.getDOMNode()).editable()
  }

  render(){
    console.log(this.props.entityId);
    return <p>{this.props.name}: <a href="#" ref="editable" name={this.prop.name} data-type="text"
                                    data-title="Edit value">{this.props.value}</a></p>
  }
}