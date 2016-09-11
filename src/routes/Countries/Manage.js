import React from 'react';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import {withRouter} from 'react-router';

import FormBuilder from '../../form/FormBuilder';
import { pushCountry, loadCountry, updateCountry } from '../../model/countries';


import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    PanelContainer,
} from '@sketchpixy/rubix';


class CountryForm extends React.Component {

  constructor(props, state){
    super(props, state);

    this.state = {edit: typeof this.props.params.id !== 'undefined'}
  }

  componentWillMount(){
    const { edit } = this.state;
    const { id } = this.props.params;


    if(edit === true){
      loadCountry(id)
          .then(snap =>{
            let country = snap.val();
            this.setState({country, loaded: true});
          });
    }

  }

  getSchema(){

    return [
      {
        title: "Name",
        id: "name",
        type: "text",
        default: this.state.edit ? this.state.country.name : null,
        props: {
          type: "text",
          name: "name"
        }
      }

    ]
  }

  onSubmit(values){
    if(this.state.edit === true){
      updateCountry(this.props.params.id, values).then(_ => this.props.router.push('countries'));
    }
    else{
      pushCountry(values);
      this.props.router.push('countries')
    }

  }

  render(){

    if(this.state.edit === true && !this.state.loaded)
      return <span>Loading ....</span>;

    const schema = this.getSchema();

    return (
        <PanelContainer noOverflow>
          <Panel>
            <PanelHeader className='bg-green fg-white'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3>
                      { this.state.edit ? <span> Edit {this.state.country.name}</span> : <span>Add new country</span> }
                    </h3>
                  </Col>
                </Row>
              </Grid>
            </PanelHeader>
            <PanelBody>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <FormBuilder cancelLink={"countries"} schema={schema} onSubmit={(values)=> this.onSubmit(values)}/>
                  </Col>
                </Row>
              </Grid>
            </PanelBody>
          </Panel>
        </PanelContainer>
    );
  }
}

@withRouter
export default class ManageCountries extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={6} collapseRight>
            <CountryForm {...this.props} />
          </Col>
        </Row>
    );
  }

}
