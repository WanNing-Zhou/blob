import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import ButtonInfo from "./ButtonInfo";
import {getProfile, addFollow, deleteFollow} from "../../actions/profile";
import {getArticleByAuthor, getArticleByFavorite} from "../../actions/articles";
import Articles from "../Articles";

class Profile extends PureComponent {

    state = {};

    componentDidMount() {
        let username = this.props.match.params.username

        this.props.getProfile(username)

        this.props.getArticleByAuthor(username)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let username = this.props.match.params.username
        if (username && username !== this.props.profile.username) {
            this.props.getProfile(username)
        }
    }

    render() {
        const {profile, currentUser, addFollow, deleteFollow, articlesReducer} = this.props
        // console.log(articles);
        const {count, currentPage, articles} = articlesReducer
        // console.log(count);
        const isCurrentUser = currentUser && currentUser.username === profile.username
        return (
            <div className="profile-page">
                {/* 用户信息 */}
                <div className="user-info">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-10 offset-md-1 col-xs-12'>
                                <img src={profile.avatar || "http://localhost:8000/default.png"}
                                     style={{width: 100, height: 100}} alt=""/>
                                <h4>{profile.username}</h4>
                                <p>{profile.bio}</p>

                                {/* 用户的行为，看是否是本人登录，决定显示对应的组件 */}
                                <ButtonInfo
                                    isCurrentUser={isCurrentUser}
                                    profile={profile}
                                    follow={addFollow}
                                    unfollow={deleteFollow}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 offset-md-1 col-xs-12'>
                            {/* 选项卡  */}
                            <div className="aticles-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item">
                                        <button className={this.state.tab === 1 ? "nav-link active" : "nav-link"}
                                                onClick={
                                                    () => {
                                                        this.setState({tab: 1})
                                                        this.props.getArticleByAuthor(profile.username)
                                                    }
                                                }
                                        >
                                            我的文章
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={this.state.tab === 2 ? "nav-link active" : "nav-link"}
                                                onClick={
                                                    () => {
                                                        this.setState({tab: 2})
                                                        this.props.getArticleByFavorite(profile.username)
                                                    }
                                                }
                                        >
                                            喜欢的文章
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* 文章列表 */}
                            <Articles
                                isShowPage={false}
                                articles={articles}
                                count={count}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapState = state => ({
    profile: state.profile,
    currentUser: state.user.login.currentUser,
    articlesReducer: state.articles

})

const mapDispatch = {
    getProfile,
    addFollow,
    deleteFollow,
    getArticleByAuthor,
    getArticleByFavorite
}

export default connect(mapState, mapDispatch)(Profile)