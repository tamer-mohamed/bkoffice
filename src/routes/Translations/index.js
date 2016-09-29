import React from 'react';
import EditableField from '../../form/Editable';
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
        .then((entries) =>{
          dataTranslation.getTranslations(entityId)
              .then((entityTranslations) =>{
                const translations = entityTranslations.val();
                this.setState({entries, translations});
              });
        });

  }

  render(){
    let transValue;

    if(!this.state.entries || !this.state.translations)
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
                    <thead>
                    <tr>
                      <td>
                        Keyword (English)
                      </td>
                      <td>
                        Arabic
                      </td>
                    </tr>
                    </thead>
                    <tbody>

                    { /* map goes here */}
                    {
                      this.state.entries.map((entry, i) =>{
                        {
                          console.log(i)
                        }
                        return <tr key={`${i}`}>
                          <td style={{width: 300}}>{entry.name}</td>
                          <td>
                            <EditableField recordId={entry['_.id']} entityId={this.props.params.entityId}
                                           key={`${i}-${this.state.refresh}`} lang="ar"
                                           fieldId={'name'}
                                           value={this.state.translations[entry['_.id']]
                            && this.state.translations[entry['_.id']]['ar'] &&
                            this.state.translations[entry['_.id']]['ar']['name'] ? this.state.translations[entry['_.id']]['ar']['name'] : null}/>
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
