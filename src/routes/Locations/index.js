import React from 'react';
import ReactDOM from 'react-dom';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import * as dataLocations from '../../model/locations';
import * as dataAreas from '../../model/areas';
import { withRouter,Link } from 'react-router';
import { Icon } from '@sketchpixy/rubix';

import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    Table,
    Button,
    PanelContainer,
} from '@sketchpixy/rubix';


class LocationsList extends React.Component {

  constructor(props){
    super(props);
    this.state = {locations: {}, loaded: false};
  }

  fetchData(){
    dataLocations.loadLocations().then((locations) => this.setState({locations: locations.val(), loaded: true}));
  }

  componentWillMount(){
    this.fetchData();
  }

  componentDidUpdate(){
    $(ReactDOM.findDOMNode(this.locationTable))
        .addClass('nowrap')
        .dataTable({
          responsive: true,
          columnDefs: [
            {targets: [1], className: 'dt-body-right', orderable: false},
          ]
        });
  }

  handleRemove(locationId, location){
    let confirm = window.confirm('Are you sure you want to delete ' + location.name + '?!');
    if(confirm){
      dataLocations.remove(locationId)
          .then(_ =>{
            console.log('DONE!!');
            this.fetchData();
          })
    }

  }

  render(){
    if(!this.state.loaded)
      return <span>Loading ....</span>;

    let rows = [];
    forEach(this.state.locations, (v, k) =>{
      rows.push(<tr key={k}>
        <td><Link to={`locations/${k}`}>{v.name}</Link></td>
        <td>
          <Button bsStyle="danger" onClick={e => this.handleRemove(k,v)}> X </Button>
        </td>
      </tr>)
    });

    return (
        <PanelContainer noOverflow>
          <Panel>
            <PanelHeader className='bg-green fg-white'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3>States</h3>
                    <span className="pull-right">
                      <Link to="locations/add">
                        <Button style={{marginBottom:"20px"}} bsStyle="lightgreen">
                          <Icon glyph="glyphicon-plus-sign"/>{' '}Add
                        </Button>
                      </Link>
                    </span>
                  </Col>
                </Row>
              </Grid>
            </PanelHeader>
            <PanelBody>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <Table ref={(c) => this.locationTable = c} className='display' cellSpacing='0' width='100%'>
                      <thead>
                      <tr>
                        <th>State</th>
                        <th></th>
                      </tr>
                      </thead>
                      <tfoot>
                      <tr>
                        <th>State</th>
                        <th></th>
                      </tr>
                      </tfoot>
                      <tbody>
                      {rows}
                      </tbody>
                    </Table>
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
export default class Locations extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={12}>
            <LocationsList {...this.props} />
          </Col>
        </Row>
    );
  }

}
