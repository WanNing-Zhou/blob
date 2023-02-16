import React, {Component} from 'react';
import {connect} from "react-redux";
import {settingSubmit, settingFiledUpdate, settingLogout, settingUnload} from "../../actions/setting";

class SettingForm extends Component {

    state = {};

    changeAvatar = (e) => {
        // console.log(e.target.value)
        this.props.settingFiledUpdate("avatar", e.target.value)
    }


    changeBio = (e) => {
        this.props.settingFiledUpdate("bio", e.target.value)
    }

    changePassword = (e) => {
        this.props.settingFiledUpdate("password", e.target.value)
    }

    /**
     * 提交更改
     * @param e
     */
    onSubmit = (e) => {
        // console.log('setting props', this.props)
        const {username, password, bio, avatar} = this.props
        this.props.settingSubmit({username, password, bio, avatar})
        e.preventDefault(); //阻止默认事件

    }

    render() {
        const {email,username, password, bio, avatar} = this.props
        // console.log("setting props",this.props)
        return (
            <form onSubmit={this.onSubmit}>

                <fieldset className='form-group'>
                    <input
                        className='form-control form-control-lg'
                        type="text"
                        placeholder='用户邮箱'
                        value={email || ""}
                        disabled
                    />
                </fieldset>
                <fieldset className='form-group'>
                    <input
                        className='form-control form-control-lg'
                        type="text"
                        placeholder='用户名称'
                        value={username || ""}
                        disabled
                    />
                </fieldset>
                <fieldset className='form-group'>
                    <input
                        className='form-control form-control-lg'
                        type="text"
                        placeholder='用户头像'
                        defaultValue={avatar || ""}
                        onChange={this.changeAvatar}
                    />
                </fieldset>
                <fieldset className='form-group'>
                    <textarea
                        className='form-control form-control-lg'
                        rows="8"
                        placeholder='用户简介'
                        defaultValue={bio || ""}
                        onChange={this.changeBio}
                    />
                </fieldset>
                <fieldset className='form-group'>
                    <input
                        className='form-control form-control-lg'
                        type="password"
                        placeholder='用户密码'
                        defaultValue={password || ""}
                        onChange={this.changePassword}
                    />
                </fieldset>
                <button
                    className='btn btn-lg btn-primary pull-xs-right'
                    type='submit'
                >
                    更新
                </button>
            </form>
        )
    }
}

const mapState = state => {
    return {
        ...state.user.setting
    }
}

const mapDispatch = {
    settingFiledUpdate,
    settingLogout,
    settingUnload,
    settingSubmit
}

export default connect(mapState, mapDispatch)(SettingForm)
