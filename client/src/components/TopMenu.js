import React, {Fragment, Component} from "react";
import logo from '../images/logo.png';

export default class TopMenu extends Component {


    render(){
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg fixed-top">
                    <div className="container-fluid">
                        <img src={logo} alt="Logo" height="40px" />
                        <span>
                            <input className="search-input" type="text"></input>
                            <i className="fas fa-bell ml-5 mr-4"></i>
                            <i className="fas fa-comment-alt ml-4 mr-4"></i>
                            <i className="fas fa-cog ml-4 mr-4"></i>
                            <i className="fas fa-user ml-4 mr-4"></i>
                        </span>
                    </div>
                </nav>
            </Fragment>
        );
    }
    
}


