import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import  {getComment,deleteComment,createComment,commentFiledUpdate} from '../../actions/comment'
import CommentList from "./CommentList";

class Comment extends PureComponent {

    state = {};

    componentDidMount() {
        const { slug } = this.props

        this.props.getComment(slug)
    }

    //同步评论
    FiledComment = (e) => {
        this.props.commentFiledUpdate('body', e.target.value)
    }

    //创建评论
    createComment = (e) => {
        e.preventDefault()
        const { slug, body } = this.props
        this.props.createComment(slug, body)
    }

    render() {
        const {slug, comments, currentUser, body} = this.props
        if (!currentUser) {
            return (
                <div className="col-xs-12 col-md-8 offset-md-2">
                    <p>
                        <Link to={"/login"}>登录</Link>
                        &nbsp; or &nbsp;
                        <Link to={"/regist"}>注册</Link>
                    </p>
                    {/* 评论列表 */}
                    <CommentList
                        slug={slug}
                        comments={comments}
                        currentUser={currentUser}
                        deleteComment={this.props.deleteComment}
                    />
                </div>
            )
        } else {
            return (
                <div className="col-xs-12 col-md-8 offset-md-2">
                    <form className="card comment-form" onSubmit={this.createComment}>
                        <div className="card-block">
                            <fieldset className='form-group'>
                                <textarea
                                    className='form-control form-control-lg'
                                    rows="3"
                                    placeholder='添加评论'
                                    value={body}
                                    onChange={this.FiledComment}
                                />
                            </fieldset>
                        </div>
                        <div className="card-footer">
                            <img className="comment-author-img"
                                 src={(currentUser && currentUser.avatar) || "http://localhost:8000/default.png"}
                                 alt=""/>
                            <button className="btn btn-sm btn-primary"
                                    type="submit"
                            >
                                提交
                            </button>
                        </div>
                    </form>
                    {/* 评论列表 */}
                    <CommentList
                        slug={slug}
                        comments={comments}
                        currentUser={currentUser}
                        deleteComment={this.props.deleteComment}
                    />
                </div>
            )
        }
    }
}
const mapState = state =>({
    ...this.state.comment
})

const mapDispatch = {
    getComment,deleteComment,createComment,commentFiledUpdate
}

export default connect(mapState,mapDispatch)(Comment)