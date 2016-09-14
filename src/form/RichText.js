import React from 'react';
import ReactDOM from 'react-dom';
import {HOC} from 'formsy-react';

import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    PanelContainer,
} from '@sketchpixy/rubix';

class TrumbowygEditor extends React.Component {
  componentDidMount(){
    const $editor = $(ReactDOM.findDOMNode(this._el)).trumbowyg({
      autogrow: true,
      dir: $('html').attr('dir'),
      btns: [
        ['viewHTML'],
        ['undo', 'redo'],
        ['formatting'],
        'btnGrp-semantic',
        ['superscript', 'subscript'],
        ['link'],
        ['insertImage'],
        'btnGrp-justify',
        'btnGrp-lists',
        ['horizontalRule'],
        ['removeformat'],
      ]
    });

    if(this.props.defaultValue)
      $editor.trumbowyg('html', this.props.defaultValue);

    $editor.on('tbwchange', (e) =>{
      console.log($editor.trumbowyg('html'));
      this.props.setValue($editor.trumbowyg('html'));
    });
  }

  render(){
    return <div id='trumbowyg' ref={(el) => this._el = el}></div>;
  }
}

export default HOC(TrumbowygEditor);