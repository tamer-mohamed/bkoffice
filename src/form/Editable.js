import React , {Component} from 'react';
import reactDOM from 'react-dom';
import {updateTranslation} from '../model/translation';

export default class Editable extends Component {

  componentDidMount(){
    $('.' + this.props.recordId).editable({
      mode: 'inline',
      success: (response, newValue)=>{
        const {entityId, lang,recordId ,fieldId} = this.props;
        updateTranslation(`${entityId}/${recordId}/${lang}`, {
          [fieldId]: newValue
        }).then(()=> console.log('dDONE'));
      }
    })
  }

  render(){
    return <p><a href="#" ref="editable" className={this.props.recordId} data-type="text"
                 data-title="Edit value">{this.props.value || 'Empty'}</a></p>
  }
}