import React, {Fragment, Component} from "react";
import QuickQuote from "./QuickQuote";
import NewLeads from "./NewLeads";
import QuoteList from "./QuoteList";

export default class Dashboard extends Component {
    
    render(){
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="my-2 card">
                            <span className="card-title">
                                <i className="fas fa-tachometer-alt mr-2"></i>
                                Welcome to your dashboard!
                            </span>
                            <hr/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <div className="my-2 card card-middle">
                            <QuickQuote/>
                        </div>
                    </div>
                    
                    <div className="col-sm-5">
                        <div className="my-2 card card-middle">
                            <QuoteList summary={true}/>
                        </div>
                    </div>
                    
                    <div className="col-sm-3">
                        <div className="my-2 card card-middle">
                            <NewLeads/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-9">
                        <div className="my-2 card">
                            <span className="card-title">
                                <i className="far fa-paper-plane mr-2"></i>
                                Popular destinations & packages
                            </span>
                            <hr/>
                        </div>
                    </div>
                    
                    <div className="col-sm-3">
                        <div className="my-2 card">
                            <span className="card-title">
                                <i className="far fa-comment-alt mr-2"></i>
                                Team chat
                            </span>
                            <hr/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <div className="my-2 card">
                            <span className="card-title">
                                <i className="fas fa-signal mr-2"></i>
                                Revenue
                            </span>
                            <hr/>
                        </div>
                    </div>
                    
                    <div className="col-sm-5">
                        <div className="my-2 card">
                            <span className="card-title">
                                <i className="fas fa-chart-pie mr-2"></i>
                                Potential revenue
                            </span>
                            <hr/>
                        </div>
                    </div>
                    
                    <div className="col-sm-3">
                        <div className="my-2 card">
                            <span className="card-title">
                                <i className="fas fa-handshake mr-2"></i>
                                Close Ratios
                            </span>
                            <hr/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
    
}


