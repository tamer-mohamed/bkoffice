import React from 'react';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import {withRouter} from 'react-router';
import q from 'q';

import FormBuilder from '../../form/FormBuilder';
import { push as pushLocation, loadLocation , updateLocation} from '../../model/locations';
import { loadCountries } from '../../model/countries';
import { setCountryLocations } from '../../model/countryLocations';


import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    PanelContainer,
} from '@sketchpixy/rubix';


class LocationForm extends React.Component {

  constructor(props, state){
    super(props, state);

    this.state = {edit: typeof this.props.params.id !== 'undefined'}
  }

  componentWillMount(){
    const { edit } = this.state;
    const locationId = this.props.params.id;

    let countriesDefer = q.defer();
    let promises = [];

    loadCountries()
        .then(snap =>{
          let countries = snap.val();
          countriesDefer.resolve(countries);
          this.setState({countries});
        });
    promises.push(countriesDefer.promise);

    if(edit === true){
      let locationDefer = q.defer();
      loadLocation(locationId)
          .then(locationSnapshot =>{
            const location = locationSnapshot.val();
            locationDefer.resolve();
            this.setState({location})
          })

      promises.push(locationDefer.promise);
    }

    q.all(promises).then(_ => this.setState({loaded: true}));

  }

  getSchema(){
    console.log('COUNTRIES', this.state.countries);
    let countries = [];

    forEach(this.state.countries, (v, k) =>{
      countries.push({id: k, title: v.name});
    });

    return [
      {
        title: "Country",
        id: "country",
        type: "select",
        default: this.state.edit ? this.state.location.country : Object.keys(this.state.countries)[0],
        props: {
          componentClass: "select",
          name: "country",
          options: countries
        }
      },
      {
        title: "State name",
        id: "name",
        type: "text",
        default: this.state.edit ? this.state.location.name : undefined,
        props: {
          type: "text",
          name: "name"
        }
      },
    ]
  }

  onSubmit(values){

    if(this.state.edit){
      updateLocation(this.props.params.id, values).then(_ => this.props.router.push('locations'));
    }
    else{
      console.log(values);
      pushLocation(values);
      this.props.router.push('locations');
    }


    /* let locationTitle = values.title;
     pushArea(values.areas).then(areaIds =>{

     //let areaIds = snapshot.map(area => area.areaId);
     setLocationAreas(locationId, areaIds).then(_ => this.props.router.push('locations'));
     });*/
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
                      { this.state.edit ? <span> Edit {this.state.location.name}</span> : <span>Add new location</span> }
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
export default class ManageLocations extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={6} collapseRight>
            <LocationForm {...this.props} />
          </Col>
        </Row>
    );
  }

}
