import React from 'react';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import {withRouter} from 'react-router';
import q from 'q';

import FormBuilder from '../../form/FormBuilder';
import * as dataTypes from '../../model/realstate/types';
import * as dataLocationTypes from '../../model/realstate/locationTypes';
import * as dataLocations from '../../model/locations';
import * as dataFeatures from '../../model/realstate/features';
import * as dataFeatureTypes from '../../model/realstate/featureTypes';


import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    PanelContainer,
} from '@sketchpixy/rubix';

const onSuccessRoute = 'realstate/types';

class TypesForm extends React.Component {

  constructor(props, state){
    super(props, state);

    this.state = {edit: typeof this.props.params.id !== 'undefined'}
  }

  componentWillMount(){
    const { edit } = this.state;
    const typeId = this.props.params.id;

    let LocationsDefer = q.defer(),
        FeaturesDefer = q.defer();

    let promises = [];

    dataLocations.loadLocations()
        .then(snap =>{
          let locations = snap.val();
          LocationsDefer.resolve(locations);
          this.setState({locations});
        });
    promises.push(LocationsDefer.promise);

    dataFeatures.loadFeatures()
        .then(snap =>{
          let features = snap.val();
          FeaturesDefer.resolve(features);
          this.setState({features});
        });
    promises.push(FeaturesDefer.promise);

    if(edit === true){
      dataTypes.loadType(typeId)
          .then(snap =>{
            const type = snap.val();
            this.setState({type})
          });
    }
    q.all(promises).then(_ => this.setState({loaded: true}));
  }

  getSchema(){
    let locations = [], features = [];

    forEach(this.state.locations, (v, k) => locations.push({id: k, title: v.name}));
    forEach(this.state.features, (v, k) => features.push({value: k, title: v.name}));

    return [
      {
        title: "Type name",
        id: "name",
        type: "text",
        default: this.state.edit ? this.state.type.name : undefined,
        props: {
          type: "text",
          name: "name"
        }
      },
      {
        title: "Location",
        id: "type",
        type: "select",
        default: this.state.edit ? this.state.type.location : Object.keys(this.state.locations)[0],
        props: {
          multiple:true,
          componentClass: "select",
          name: "location",
          options: locations
        }
      },
      {
        title: "Features",
        id: "type",
        type: "checkboxes",
        default: this.state.edit ? this.state.type.features : undefined,
        props: {
          name: "features",
          items: features
        }
      }
    ]
  }

  onSubmit(values){

    if(this.state.edit){
      dataTypes.updateType(this.props.params.id, values).then(_ => this.props.router.push(onSuccessRoute));
    }
    else{
      console.log(values);
      let typeId = dataTypes.pushType(values);
      dataLocationTypes.updateLocationTypes(values.location, {[typeId]: true});
      this.props.router.push(onSuccessRoute);
    }
  }

  render(){

    if(!this.state.loaded)
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
                      { this.state.edit ? <span> Edit {this.state.type.name}</span> : <span>Add new type</span> }
                    </h3>
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
export default class ManageTypes extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={6} collapseRight>
            <TypesForm {...this.props} />
          </Col>
        </Row>
    );
  }

}
