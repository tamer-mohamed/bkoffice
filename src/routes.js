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

import Features from './routes/Features/index';
import ManageFeatures from './routes/Features/Manage';

import Types from './routes/Types/index';
import ManageTypes from './routes/Types/Manage';


import Categories from './routes/Categories/index';
import ManageCategories from './routes/Categories/Manage';

import RealstateViews from './routes/RealstateViews/index';
import ManageRealstateViews from './routes/RealstateViews/Manage';

import SitePages from './routes/SitePages/index';
import ManageSitePages from './routes/SitePages/Manage';

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


        <Route path="/realstate/features" component={Features}/>
        <Route path="/realstate/features/add" component={ManageFeatures}/>
        <Route path="/realstate/features/:id" component={ManageFeatures}/>

        <Route path="/realstate/types" component={Types}/>
        <Route path="/realstate/types/add" component={ManageTypes}/>
        <Route path="/realstate/types/:id" component={ManageTypes}/>

        <Route path="/realstate/categories" component={Categories}/>
        <Route path="/realstate/categories/add" component={ManageCategories}/>
        <Route path="/realstate/categories/:id" component={ManageCategories}/>

        <Route path="/realstate/views" component={RealstateViews}/>
        <Route path="/realstate/views/add" component={ManageRealstateViews}/>
        <Route path="/realstate/views/:id" component={ManageRealstateViews}/>

        <Route path="/pages" component={SitePages}/>
        <Route path="/pages/add" component={ManageSitePages}/>
        <Route path="/pages/:id" component={ManageSitePages}/>

      </Route>

      <Route>
        <Route path='login' component={Login}/>
      </Route>
    </Route>
);
