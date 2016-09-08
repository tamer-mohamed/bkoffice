import React from 'react';
import ReactDOM from 'react-dom';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import * as countriesModel from '../../model/countries';
import { withRouter,Link } from 'react-router';


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
    this.state = {countries: {}, loaded: false};
  }

  fetchData(){
    countriesModel.loadCountries().then((snap) => this.setState({countries: snap.val(), loaded: true}));
  }

  componentWillMount(){
    this.fetchData();
  }

  componentDidMount(){
    $(ReactDOM.findDOMNode(this.locationTable))
        .addClass('nowrap')
        .dataTable({
          responsive: true,
          columnDefs: [
            {targets: [-1, -3], className: 'dt-body-right'}
          ]
        });
  }

  handleRemove(id, data){
    let confirm = window.confirm('Are you sure you want to delete ' + data.name + '?!');
    if(confirm){
      countriesModel.removeCountry(id).then(_ => this.fetchData());
    }

  }

  render(){
    if(!this.state.loaded)
      return <span>Loading ....</span>;

    let rows = [];
    forEach(this.state.countries, (v, k) =>{
      rows.push(<tr key={k}>
        <td><Link to={`countries/${k}`}>{v.name}</Link></td>
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
                    <h3>Countries</h3>
                    <span className="pull-right">
                      <Link to="countries/add"><Button bsStyle="primary">Add</Button></Link>
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
                        <th>Name</th>
                        <th></th>
                      </tr>
                      </thead>
                      <tfoot>
                      <tr>
                        <th>Name</th>
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
