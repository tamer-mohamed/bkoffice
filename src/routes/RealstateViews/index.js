import React from 'react';
import ReactDOM from 'react-dom';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import size from 'lodash/size';
import * as dataViews from '../../model/realstate/views';
import { Icon,Alert } from '@sketchpixy/rubix';
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


class FeaturesList extends React.Component {

  constructor(props){
    super(props);
    this.state = {views: {}, loaded: false};
  }

  fetchData(){
    dataViews.loadViews().then(snap => this.setState({views: snap.val(), loaded: true}));
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
      dataViews.removeView(id)
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
    forEach(this.state.views, (v, k) =>{
      rows.push(<tr key={k}>
        <td><Link to={`/realstate/views/${k}`}>{v.name}</Link></td>
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
                    <h3>Views</h3>
                    <p>Manage the views of the realstate, Ex: On river, on public street, nearby transportations ....
                      etc</p>
                    <span className="pull-right">
                      <Link to="/realstate/views/add">
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
                    {size(this.state.views) === 0 ?
                        <Alert info>
                          <strong>Heads up! </strong><span>No reacords to show at the moment ..</span>
                        </Alert> :
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
                    }
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
export default class Features extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={12}>
            <FeaturesList {...this.props} />
          </Col>
        </Row>
    );
  }

}
