import React, {Component} from 'react';
import {connect} from "react-redux";


class SettingForm extends Component {

    state = {};

    changeAvatar=(e)=>{

    }

    changeBio=(e)=>{

    }

    onSubmit=(e)=>{

    }

    render() {
        const { username, password, bio, avatar } = this.props
        return (
            <form onSubmit={this.onSubmit}>
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

const mapDispatch = dispatch => ({

})

export default connect(mapState, mapDispatch)(SettingForm)
