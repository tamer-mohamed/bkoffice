import React from 'react';
import ReactDOM from 'react-dom';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import * as dataAreas from '../../model/areas';
import * as dataLocationAreas from '../../model/locationAreas';
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


class AreasList extends React.Component {

  constructor(props){
    super(props);
    this.state = {areas: {}, loaded: false};
  }

  fetchData(){
    dataAreas.loadAreas().then(snap => this.setState({areas: snap.val(), loaded: true}));
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
          ],
          pagingType: "full_numbers",
          pageLength:2

        });
  }

  handleRemove(id, data){
    let confirm = window.confirm('Are you sure you want to delete ' + data.name + '?!');
    if(confirm){
      dataLocationAreas.remove(data.location, id).then(() =>{
        dataAreas.removeArea(id)
            .then(_ =>{
              console.log('DONE!!');
              this.fetchData();
            })
      });

    }

  }

  render(){
    if(!this.state.loaded)
      return <span>Loading ....</span>;

    let rows = [];
    forEach(this.state.areas, (v, k) =>{
      rows.push(<tr key={k}>
        <td><Link to={`areas/${k}`}>{v.name}</Link></td>
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
                    <h3>Areas</h3>
                    <span className="pull-right">
                      <Link to="areas/add">
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
                        <th>Area</th>
                        <th></th>
                      </tr>
                      </thead>
                      <tfoot>
                      <tr>
                        <th>Area</th>
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
export default class Areas extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={12}>
            <AreasList {...this.props} />
          </Col>
        </Row>
    );
  }

}
