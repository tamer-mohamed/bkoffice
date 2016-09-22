import React from 'react';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import {withRouter} from 'react-router';
import q from 'q';

import FormBuilder from '../../form/FormBuilder';
import * as dataCategories from '../../model/realstate/categories';


import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    PanelContainer,
} from '@sketchpixy/rubix';

const onSuccessRoute = 'realstate/categories';

class TypesForm extends React.Component {

  constructor(props, state){
    super(props, state);

    this.state = {edit: typeof this.props.params.id !== 'undefined'}
  }

  componentWillMount(){
    const { edit } = this.state;
    const categoryId = this.props.params.id;


    if(edit === true){
      dataCategories.loadRealstateCategory(categoryId)
          .then(snap =>{
            const category = snap.val();
            this.setState({category,loaded:true})
          });
    }
  }

  getSchema(){
    return [
      {
        title: "Category name",
        id: "name",
        type: "text",
        default: this.state.edit ? this.state.category.name : undefined,
        props: {
          type: "text",
          name: "name"
        }
      }
    ]
  }

  onSubmit(values){

    if(this.state.edit){
      dataCategories.updateRealstateCategory(this.props.params.id, values).then(_ => this.props.router.push(onSuccessRoute));
    }
    else{
      console.log(values);
      dataCategories.pushRealstateCategory(values);
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
                    <h3>
                      { this.state.edit ? <span> Edit {this.state.category.name}</span> : <span>Add new category</span> }
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
