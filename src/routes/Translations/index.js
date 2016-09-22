import React from 'react';
import * as dataTranslation from '../../model/translation';

import {
    Row,
    Col,
    Nav,
    Grid,
    Form,
    Panel,
    Radio,
    Table,
    Button,
    Checkbox,
    PanelBody,
    FormGroup,
    InputGroup,
    PanelHeader,
    ButtonGroup,
    FormControl,
    PanelFooter,
    ControlLabel,
    PanelContainer,
} from '@sketchpixy/rubix';

export default class XEditable extends React.Component {
  static counter = 0;
  static getCounter = function(){
    return 'counter-' + ++XEditable.counter;
  };
  static resetCounter = function(){
    XEditable.counter = 0;
  };

  state = {
    mode: 'inline',
    fields: ['name'],
    refresh: XEditable.getCounter() // used to redraw the component
  };

  renderEditable(){
    $('.xeditable').editable({
      mode: this.state.mode,
      success: function(response, newValue){
        console.log(newValue);
      }
    });


    var self = this;
    $('#user .editable').on('hidden', function(e, reason){
      if(reason === 'save' || reason === 'nochange'){
        var $next = $(this).closest('tr').next().find('.editable');

        console.log(reason);
        console.log($next.html('val'));
      }
    });
  }

  componentWillMount(){
    const {entityId } = this.props.params;
    let fields = [];

    switch(entityId){
      case "locations":
      case "areas":
      case "types":
      case "views":
        fields = ['name'];
        break;
      default:
        console.warn('Entity is not defined in the translation set!');
    }
    dataTranslation.getTranslationKeywords(entityId, fields)
        .then((entries) => this.setState({entries}));

    //entitentityIdi

    XEditable.resetCounter();
  }

  componentDidUpdate(){
    this.renderEditable();
  }

  componentDidMount(){

    this.renderEditable();
  }

  render(){
    if(!this.state.entries)
      return <span> Loading </span>;
    return (
        <Row>
          <Col xs={12}>
            <PanelContainer noOverflow>
              <Panel>
                <PanelHeader className='bg-green fg-white' style={{margin: 0}}>
                  <Grid>
                    <Row>
                      <Col xs={12}>
                        <h3>Translations</h3>
                        <p>Manage localization of your application.</p>
                      </Col>
                    </Row>
                  </Grid>
                </PanelHeader>
                <PanelBody style={{padding: 25}}>

                  <Table striped bordered id='user' style={{margin: 0}}>
                    <tbody>

                    { /* map goes here */}
                    {
                      this.state.entries.map((entry, i) =>{
                        return <tr key={`${i}`}>
                          <td style={{width: 300}}>{entry.name}</td>
                          <td>
                            <a href='#' key={`${i}-${this.state.refresh}`} className='xeditable' data-type='text'
                               data-title='Enter username'>superuser</a>
                          </td>
                        </tr>
                      })
                    }

                    { /*   <tr>
                     <td>Empty text field, required</td>
                     <td>
                     <a href='#' key={this.state.refresh} className='xeditable' id='firstname' data-type='text'
                     data-placeholder='Required' data-pk='1' data-title='Enter firstname'></a>
                     </td>
                     </tr>
                     map goes here */}

                    </tbody>
                  </Table>
                </PanelBody>
              </Panel>
            </PanelContainer>
          </Col>
        </Row>
    );
  }
}
