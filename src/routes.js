import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

import Footer from './common/footer';
import Header from './common/header';
import Sidebar from './common/sidebar';

import Home from './routes/home';
import Login from './routes/Login';

import Countries from './routes/Countries/index';
import ManageCountries from './routes/Countries/Manage';

import Locations from './routes/Locations/index';
import ManageLocations from './routes/Locations/Manage';

import Areas from './routes/Areas/index';
import ManageAreas from './routes/Areas/Manage';

class App extends React.Component {
  render(){
    return (
        <MainContainer {...this.props}>
          <Sidebar />
          <Header />
          <div id='body'>
            <Grid>
              <Row>
                <Col xs={12}>
                  {this.props.children}
                </Col>
              </Row>
            </Grid>
          </div>
          <Footer />
        </MainContainer>
    );
  }
}

export default (

    <Route>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="locations" component={Locations}/>
        <Route path="locations/add" component={ManageLocations}/>
        <Route path="locations/:id" component={ManageLocations}/>

        <Route path="areas" component={Areas}/>
        <Route path="areas/add" component={ManageAreas}/>
        <Route path="areas/:id" component={ManageAreas}/>

        <Route path="countries" component={Countries}/>
        <Route path="countries/add" component={ManageCountries}/>
        <Route path="countries/:id" component={ManageCountries}/>

      </Route>

      <Route>
        <Route path='login' component={Login}/>
      </Route>
    </Route>
);
