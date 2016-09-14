import React from 'react';
import forEach from 'lodash/foreach';
import pull from 'lodash/pull';
import remove from 'lodash/remove';
import {withRouter} from 'react-router';
import q from 'q';

import FormBuilder from '../../form/FormBuilder';
import * as dataPages from '../../model/pages';


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
    const pageId = this.props.params.id;

    if(edit === true){
      dataPages.loadPage(pageId)
          .then(snap =>{
            const page = snap.val();
            this.setState({page, loaded: true})
          });
    }

  }

  getSchema(){
    return [
      {
        title: "State",
        id: "title",
        type: "text",
        default: this.state.edit ? this.state.page.title : undefined,
        props: {
          name: "title"
        }
      },
      {
        title: "Content",
        id: "content",
        type: "richEditor",
        default: this.state.edit ? this.state.page.content : undefined,
        props: {
          type: "text",
          name: "content"
        }
      },
    ]
  }

  onSubmit(values){

    if(this.state.edit){
      dataPages.updatePage(this.props.params.id, values).then(_ => this.props.router.push('pages'));
    }
    else{
      console.log(values);
      dataPages.pushPage(values);
      this.props.router.push('pages');
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
                      { this.state.edit ? <span> Edit {this.state.page.title}</span> : <span>Add new page</span> }
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
          <Col sm={12} collapseRight>
            <AreaForm {...this.props} />
          </Col>
        </Row>
    );
  }

}
