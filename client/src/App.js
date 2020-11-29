import React, {Fragment} from "react";
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import './App.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

//Components
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import TopMenu from "./components/TopMenu";
import QuoteList from "./components/QuoteList";
import QuoteForm from "./components/QuoteForm";


function App() {
  
  return (
    <Fragment> 
      <TopMenu/>
      <div className="wrapper">
        <nav className="sidebar">
          <NavBar active={window.location.pathname}/>
        </nav>
        <div className="container-fluid">
            <div className="main-container">
              <Router>
                  <Switch>            
                      <Route exact path="/" component={Dashboard} />
                      <Route exact path="/quotes">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="my-2 card">
                                    <QuoteList summary={false}/>
                                </div>
                            </div>
                        </div>
                      </Route>
                      <Route path="/quotes/edit/:id">
                        <QuoteFormEdit/>
                      </Route>
                      <Route path="/quotes/edit">
                        <QuoteFormEdit/>
                      </Route>
                  </Switch>
              </Router>
            </div>
        </div>
        
      </div>  

    </Fragment>
  );
}

function QuoteFormEdit() {
  let { id } = useParams();
  return(
    <div className="row">
        <div className="col-sm-12">
            <div className="my-2 card">
                <QuoteForm id={id} isEdit={id>0}/>
            </div>
        </div>
    </div>
  );
}

export default App;
