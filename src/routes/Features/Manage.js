import React from 'react';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import {withRouter} from 'react-router';
import q from 'q';

import FormBuilder from '../../form/FormBuilder';
import * as dataFeatures from '../../model/realstate/features';


import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    PanelContainer,
} from '@sketchpixy/rubix';

const onSuccessRoute = 'realstate/features';

class FeaturesForm extends React.Component {

  constructor(props, state){
    super(props, state);

    this.state = {edit: typeof this.props.params.id !== 'undefined'}
  }

  componentWillMount(){
    const { edit } = this.state;
    const featureId = this.props.params.id;

    if(edit === true){
      dataFeatures.loadFeature(featureId)
          .then(snap =>{
            const feature = snap.val();
            this.setState({feature, loaded: true})
          });
    }

  }

  getSchema(){

    return [
      {
        title: "Feature name",
        id: "name",
        type: "text",
        default: this.state.edit ? this.state.feature.name : undefined,
        props: {
          type: "text",
          name: "name"
        }
      },
      {
        title: "Feature type",
        id: "type",
        type: "radios",
        default: this.state.edit ? this.state.feature.type : undefined,
        props: {
          name: "type",
          items: [
            {
              title: "Boolean (yes,no)",
              value: "boolean"
            },
            {
              title: "Number",
              value: "number"
            }
          ]
        }
      }
    ]
  }

  onSubmit(values){

    if(this.state.edit){
      dataFeatures.updateFeature(this.props.params.id, values).then(_ => this.props.router.push(onSuccessRoute));
    }
    else{
      console.log(values);
      dataFeatures.pushFeature(values);
      this.props.router.push(onSuccessRoute);
    }
  }

  render(){

    if(this.state.edit && !this.state.loaded)
      return <span>Loading ....</span>;

    const schema = this.getSchema();

    return (
        <PanelContainer noOverflow>
          <Panel>
            <PanelHeader className='bg-green fg-white'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3>Add new Area </h3>
                  </Col>
                </Row>
              </Grid>
            </PanelHeader>
            <PanelBody>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <FormBuilder schema={schema} onSubmit={(values)=> this.onSubmit(values)}/>
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
export default class ManageFeatures extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={6} collapseRight>
            <FeaturesForm {...this.props} />
          </Col>
        </Row>
    );
  }

}
