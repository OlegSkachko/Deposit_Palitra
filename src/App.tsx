import React from 'react';
import {BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import Form from './components/Form/Form';
import Palette from './components/Palette/Palette';
import './index.css'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <div className="App__contain">
            <div className='nav-text'>
              <Link className='nav-text-link' to='/form'>Форма</Link>
              <Link className='nav-text-link' to='/pallete'>Палитра</Link>
            </div>
            <Switch>
              <Route path='/form'>
                <Form/>
              </Route>
              <Route path='/pallete'>
                <Palette/>
              </Route>
              <Redirect to='/form'/>
            </Switch>
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
