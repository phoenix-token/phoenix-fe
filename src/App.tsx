import Header from 'component/header/Header';
import Sidebar from 'component/sidebar/Sidebar';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Bond from 'screen/bond/Bond';
import BondDetail from 'screen/bond/BondDetail';
import Staking from 'screen/staking/Staking';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className='main'>
        <Sidebar />
        <div className='page'>
          <div className='content'>
            <Switch>
              <Route path={'/bond/:id'} component={BondDetail} />
              <Route path={'/bond'} component={Bond} />
              <Route path={'/'} component={Staking} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
