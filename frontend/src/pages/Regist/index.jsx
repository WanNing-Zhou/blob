import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom'
import Errors from '../../components/Errors'
import {connect} from "react-redux";
import * as action from '../../actions/user'
import {registFiledUpdate,registSubmit} from "../../actions/user";

 class Regist extends PureComponent {

    onSubmit = (e)=>{
        e.preventDefault(); //阻止默认行为
        const {email,username,password} = this.props;
        this.props.registSubmit({email,username,password})
    }

    changeEmail = (e)=>{
        this.props.registFiledUpdate("email", e.target.value)
    }

    changeUserName = (e) =>{
        this.props.registFiledUpdate("username", e.target.value)

    }

    changePassword = (e)=>{
        this.props.registFiledUpdate("password", e.target.value)

    }

    render() {
        const {email, username, password, errors} = this.props
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1>注册</h1>
                        <p className='text-xs-center'>
                            <Link to="/login">
                                有账号直接登录？
                            </Link>
                        </p>
                        <Errors errors={errors}/>
                        <form onSubmit={this.onSubmit}>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户邮箱'
                                    value={email}
                                    onChange={this.changeEmail}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="text"
                                    placeholder='用户名称'
                                    value={username}
                                    onChange={this.changeUserName}
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <input
                                    className='form-control form-control-lg'
                                    type="password"
                                    placeholder='用户密码'
                                    value={password}
                                    onChange={this.changePassword}
                                />
                            </fieldset>
                            <button
                                className='btn btn-lg btn-primary pull-xs-right'
                                type='submit'
                            >
                                注册
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = state =>({
    ...state.user
})

export default connect(mapState,{registFiledUpdate,registSubmit})(Regist)