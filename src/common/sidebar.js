import React from 'react';

import {
    Sidebar, SidebarNav, SidebarNavItem,
    SidebarControls, SidebarControlBtn,
    LoremIpsum, Grid, Row, Col, FormControl,
    Label, Progress, Icon,
    SidebarDivider
} from '@sketchpixy/rubix';

import { Link, withRouter } from 'react-router';

@withRouter
class ApplicationSidebar extends React.Component {
  handleChange(e){
    this._nav.search(e.target.value);
  }

  render(){
    return (
        <div>
          <Grid>
            <Row>
              <Col xs={12}>
                <FormControl type='text' placeholder='Search...' onChange={::this.handleChange}
                             className='sidebar-search'
                             style={{border: 'none', background: 'none', margin: '10px 0 0 0', borderBottom: '1px solid #666', color: 'white'}}/>
                <div className='sidebar-nav-container'>
                  <SidebarNav style={{marginBottom: 0}} ref={(c) => this._nav = c}>

                    { /** Pages Section */ }
                    <div className='sidebar-header'>PAGES</div>

                    <SidebarNavItem glyph='icon-fontello-gauge' name='Dashboard' href='/'/>
                    <SidebarNavItem glyph='icon-fontello-gauge' name='Pages' href='/pages'/>
                    <SidebarNavItem glyph='icon-ikons-bar-chart-2 float-right-rtl' name="Translations">
                      <SidebarNav>
                        <SidebarNavItem glyph='icon-fontello-gauge' name='Locations' href='/translations/locations'/>
                        <SidebarNavItem glyph='icon-fontello-gauge' name='Areas' href='/translations/areas'/>
                        <SidebarNavItem glyph='icon-fontello-gauge' name='Types' href='/translations/types'/>
                        <SidebarNavItem glyph='icon-fontello-gauge' name='Views' href='/translations/views'/>
                      </SidebarNav>
                    </SidebarNavItem>


                    <div className='sidebar-header'>LOCATIONS</div>
                    <SidebarNavItem glyph='icon-fontello-gauge' name='Countries' href='/countries'/>
                    <SidebarNavItem glyph='glyphicon-map-marker' name='States' href='/locations'/>
                    <SidebarNavItem glyph='icon-fontello-gauge' name='Areas' href='/areas'/>

                    <SidebarDivider />

                    <div className='sidebar-header'>REALSTATE</div>
                    <SidebarNavItem glyph='glyphicon-star' name='Features' href='/realstate/features'/>
                    <SidebarNavItem glyph='icon-fontello-gauge' name='Types' href='/realstate/types'/>
                    <SidebarNavItem glyph='icon-fontello-gauge' name='Categories' href='/realstate/categories'/>
                    <SidebarNavItem glyph='icon-fontello-gauge' name='Views' href='/realstate/views'/>


                  </SidebarNav>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}

@withRouter
export default class SidebarContainer extends React.Component {
  render(){
    return (
        <div id='sidebar'>
          <div id='avatar'>
            <Grid>
              <Row className='fg-white'>
                <Col xs={4} collapseRight>

                </Col>
                <Col xs={8} collapseLeft id='avatar-col'>
                  <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>Simsar Admin</div>
                  <div>
                    <a href='#'>
                      <Icon id='demo-icon' bundle='fontello' glyph='lock-5'/>
                    </a>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
          <div id='sidebar-container'>
            <Sidebar sidebar={0}>
              <ApplicationSidebar />
            </Sidebar>
          </div>
        </div>
    );
  }
}
