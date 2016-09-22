import React from 'react';
import ReactDOM from 'react-dom';


import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import size from 'lodash/size';
import * as dataCategories from '../../model/realstate/categories';
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


class CategoriesList extends React.Component {

  constructor(props){
    super(props);
    this.state = {types: {}, loaded: false};
  }

  fetchData(){
    dataCategories.loadRealstateCategories().then(snap => this.setState({categories: snap.val(), loaded: true}));
  }

  componentWillMount(){
    this.fetchData();
  }

  componentDidUpdate(){
    console.log($(ReactDOM.findDOMNode(this.refs.dataTable)));
    console.log('===CLALLED');
    let element = $('#dataTable');
    element.addClass('nowrap');
    element.dataTable({
      responsive: true,
      columnDefs: [
        {targets: [1], className: 'dt-body-right'},
        {targets: [2], orderable: false}
      ]
    });
  }

  handleRemove(id, data){
    let confirm = window.confirm('Are you sure you want to delete ' + data.name + '?!');
    if(confirm){
      dataCategories.removeRealstateCategory(id)
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
    forEach(this.state.categories, (v, k) =>{
      rows.push(
          <tr key={k}>
            <td><Link to={`/realstate/categories/${k}`}>{v.name}</Link></td>
            <td>
              <Button bsStyle="danger" onClick={e => this.handleRemove(k,v)}> X </Button>
            </td>
          </tr>
      )
    });

    return (
        <PanelContainer noOverflow>
          <Panel>
            <PanelHeader className='bg-green fg-white'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3>Categories</h3>
                    <p>Categories of Realstate, ex: Buy,sell.....etc</p>
                    <span className="pull-right">
                      <Link to="/realstate/categories/add">
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
                    {size(this.state.categories) === 0 ?
                        <Alert info>
                          <strong>Heads up! </strong><span>No reacords to show at the moment ..</span>
                        </Alert> :
                        <Table ref="dataTable" id='dataTable' className='display' cellSpacing='0'
                               width='100%'>
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
export default class Categories extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={12}>
            <CategoriesList {...this.props} />
          </Col>
        </Row>
    );
  }

}
