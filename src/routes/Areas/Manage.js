import React from 'react';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import {withRouter} from 'react-router';
import q from 'q';

import FormBuilder from '../../form/FormBuilder';
import {pushArea, loadArea, updateArea} from '../../model/areas';
import { loadLocations } from '../../model/locations';
import { updateLocationAreas } from '../../model/locationAreas';


import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    PanelContainer,
} from '@sketchpixy/rubix';


class AreaForm extends React.Component {

  constructor(props, state){
    super(props, state);

    this.state = {edit: typeof this.props.params.id !== 'undefined'}
  }

  componentWillMount(){
    const { edit } = this.state;
    const locationId = this.props.params.id;

    let locationsDefer = q.defer();
    let promises = [];

    loadLocations()
        .then(snap =>{
          let locations = snap.val();
          locationsDefer.resolve(locations);
          this.setState({locations});
        });
    promises.push(locationsDefer.promise);

    if(edit === true){
      let areaDefer = q.defer();
      loadArea(this.props.params.id)
          .then(snap =>{
            const area = snap.val();
            areaDefer.resolve();
            this.setState({area})
          });

      promises.push(areaDefer.promise);
    }

    q.all(promises).then(_ => this.setState({loaded: true}));

  }

  getSchema(){
    console.log('COUNTRIES', this.state.countries);
    let locations = [];

    forEach(this.state.locations, (v, k) =>{
      locations.push({id: k, title: v.name});
    });

    return [
      {
        title: "State",
        id: "location",
        type: "select",
        default: this.state.edit ? this.state.area.location : Object.keys(this.state.locations)[0],
        props: {
          componentClass: "select",
          name: "location",
          options: locations
        }
      },
      {
        title: "Area name",
        id: "name",
        type: "text",
        default: this.state.edit ? this.state.area.name : undefined,
        props: {
          type: "text",
          name: "name"
        }
      },
    ]
  }

  onSubmit(values){

    if(this.state.edit){
      updateArea(this.props.params.id, values).then(_ => this.props.router.push('areas'));
    }
    else{
      console.log(values);
      let areaId = pushArea(values);
      updateLocationAreas(values.location, {[areaId]: true});
      this.props.router.push('areas');
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
                      { this.state.edit ? <span> Edit {this.state.area.name}</span> : <span>Add new area</span> }
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
export default class ManageAreas extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={6} collapseRight>
            <AreaForm {...this.props} />
          </Col>
        </Row>
    );
  }

}
