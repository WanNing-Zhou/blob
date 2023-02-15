import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {store} from '../../store'
import {replace} from 'connected-react-router'
import Errors from "../../components/Errors";
import {loginSubmit, loginFiledUpdate, loginUnload} from '../../actions/user'

class Login extends PureComponent {

    state = {};

    //当页面更新的时候
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.redirect && this.props.redirect !== prevProps.redirect) {
            store.dispatch(replace(this.props.redirect))
        }
    }

    componentWillUnmount() {
        this.props.loginUnload()
    }

    changeEmail = (e) => {
        this.props.loginFiledUpdate("email", e.target.value)
    }

    changePassword = (e) => {
        this.props.loginFiledUpdate("password", e.target.value)
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {email, password} = this.props
        this.props.loginSubmit(email, password)
    }


    render() {
        const {email, password, errors} = this.props
        return (
            <div className='container page'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 col-xs-12'>
                        <h1>登录</h1>
                        <p className='text-xs-center'>
                            <Link to="/regist">
                                没有账号直接注册？
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
                                登录
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


const mapState = state => ({
    ...state.user.login
})


export default connect(mapState, {loginFiledUpdate, loginSubmit, loginUnload})(Login)