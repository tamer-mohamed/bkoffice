import React from 'react';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import {withRouter} from 'react-router';
import q from 'q';

import FormBuilder from '../../form/FormBuilder';
import * as dataRealStateViews from '../../model/realstate/views';


import {
    Row,
    Col,
    Grid,
    Panel,
    PanelBody,
    PanelHeader,
    PanelContainer,
} from '@sketchpixy/rubix';

const onSuccessRoute = 'realstate/views';

class RealStateViewsForm extends React.Component {

  constructor(props, state){
    super(props, state);

    this.state = {edit: typeof this.props.params.id !== 'undefined'}
  }

  componentWillMount(){
    const { edit } = this.state;
    const viewId = this.props.params.id;

    if(edit === true){
      dataRealStateViews.loadview(viewId)
          .then(snap =>{
            const view = snap.val();
            this.setState({view, loaded: true})
          });
    }

  }

  getSchema(){

    return [
      {
        title: "Name",
        id: "name",
        type: "text",
        default: this.state.edit ? this.state.view.name : undefined,
        props: {
          type: "text",
          name: "name"
        }
      },
      {
        title: "Description",
        id: "name",
        type: "textarea",
        default: this.state.edit ? this.state.view.desc || "" : undefined,
        props: {
          type: "textarea",
          name: "desc"
        }
      }
    ]
  }

  onSubmit(values){

    if(this.state.edit){
      dataRealStateViews.updateView(this.props.params.id, values).then(_ => this.props.router.push(onSuccessRoute));
    }
    else{
      console.log(values);
      dataRealStateViews.pushView(values);
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
                      { this.state.edit ? <span> Edit {this.state.view.name}</span> : <span>Add new view</span> }
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
export default class ManageRealStateViews extends React.Component {

  render(){
    return (
        <Row>
          <Col sm={6} collapseRight>
            <RealStateViewsForm {...this.props} />
          </Col>
        </Row>
    );
  }

}
