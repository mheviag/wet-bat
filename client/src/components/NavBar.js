import React, {Fragment, Component} from "react";
import classnames from 'classnames'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export default class NavBar extends Component {

    render(){
        const { active } = this.props;
        return (
            <Fragment>
                <ul className="list-unstyled">
                    <a href="/" key={"Home"}>
                        <li className={classnames("pb-3 pt-3", { "active": (active === "/") })}>
                            <i className="fas fa-home ml-2 w-25 text-center"></i>
                            Home
                        </li>
                    </a>
                    <a href="/quotes" key={"Quote"}>
                        <li className={classnames("pb-3 pt-3", { "active": (active.startsWith("/quotes")) })}>
                            <i className="fas fa-dollar-sign ml-2 w-25 text-center"></i>
                            Quotes
                        </li>
                    </a>
                    <a href="#">
                        <li className="pb-3 pt-3">
                            <i className="fas fa-list-alt ml-2 w-25 text-center"></i>
                            Leads
                        </li>
                    </a>
                    <a href="#">
                        <li className="pb-3 pt-3">
                            <i className="fas fa-paper-plane ml-2 w-25 text-center"></i>
                            Tours
                        </li>
                    </a>
                    <hr/>
                    <a href="#">
                        <li className="pb-3 pt-3">
                            <i className="fas fa-file ml-2 w-25 text-center"></i>
                            Invoices
                        </li>
                    </a>
                    <a href="#">
                        <li className="pb-3 pt-3">
                            <i className="fas fa-chart-line ml-2 w-25 text-center"></i>
                            Analytics
                        </li>
                    </a>
                    <a href="#">
                        <li className="pb-3 pt-3">
                            <i className="fas fa-user-friends ml-2 w-25 text-center"></i>
                            Team
                        </li>
                    </a>
                    <a href="#">
                        <li className="pb-3 pt-3">
                            <i className="fas fa-cog ml-2 w-25 text-center"></i>
                            Admin
                        </li>
                    </a>
                    <a href="#">
                        <li className="pb-3 pt-3">
                            <i className="fas fa-life-ring ml-2 w-25 text-center"></i>
                            Support
                        </li>
                    </a>
                </ul>
                <hr/>
                <p>Allright received <br/> by wetbat 2020</p>
            </Fragment>
        );
    }
    
}


