import React, {PureComponent} from 'react';
import Errors from "../../components/Errors";
import {connect} from "react-redux";
import {store} from "../../store";
import {replace} from "connected-react-router";
import SettingForm from "./SettingForm";
class Setting extends PureComponent {

    state = {};

    handlerClick = ()=>{

    }

    //支持
    render() {
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>

                        <Errors errors={this.props.errors} />

                        <SettingForm />

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

const mapState=state=>{
    return{
        ...state.user.setting
    }
}

const mapDispatch = dispatch =>({

})

export default connect(mapState,mapDispatch)(Setting)
