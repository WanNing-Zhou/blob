import React, {PureComponent} from 'react';
import {replace} from "connected-react-router";
import {connect} from "react-redux";
import Errors from "../../components/Errors";
import {store} from "../../store";
import SettingForm from "./SettingForm";
import {settingLogout, settingUnload} from "../../actions/setting";

class Setting extends PureComponent {

    state = {};

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.redirect && this.props.redirect !== prevProps.redirect) {
            store.dispatch(replace(this.props.redirect))
        }
    }

    componentWillUnmount() {
        this.props.settingUnload()
    }

    handlerClick = () => {
        this.props.settingLogout()
    }

    //支持
    render() {
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>

                        <Errors errors={this.props.errors}/>

                        <SettingForm/>

                        <button className="btn btn-outline-danger"
                                onClick={this.handlerClick}
                        >
                            退出
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = state => {
    return {
        ...state.user.setting
    }
}

const mapDispatch = {settingLogout, settingUnload}

export default connect(mapState, mapDispatch)(Setting)
