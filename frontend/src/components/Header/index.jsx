import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import Menu from "./Menu";

let currentUser={avatar:null}

export default class Header extends PureComponent {

    state = {};

    render() {
        return (
            <nav className="navbar navbar-light">
                {/*左侧*/}
                <div className="container">
                    <Link to={'/'} className="navbar-brand">
                        BLOG-V1
                    </Link>
                    {/*右侧*/}
                    <Menu currentUser={currentUser}/>
                </div>
            </nav>
        )
    }
}
