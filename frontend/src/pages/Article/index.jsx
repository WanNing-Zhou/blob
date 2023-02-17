import React,{PureComponent} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {marked} from "marked";
import Comment from "../Comment";
import {getArticleBySlut,articleUnload} from '../../actions/article';
import ArticleAction from "./ArticleAction";

class Article extends PureComponent{
    componentDidMount() {
        const slug = this.props.match.params.slug
        this.props.getArticleBySlug(slug)
    }

    componentWillUnmount() {
        this.props.onUnload()
    }


    render() {
        const { article, currentUser } = this.props
        const { slug, title, body, tags, author } = article
        if (!body) {
            return null
        }
        const markdata = body
        const markhtml = marked.parse(markdata, { sanitize: true })
        const markObj = { __html: markhtml }
        return (
            <div className="article-page">
                {/* 文章的头部信息 */}
                <div className="banner">
                    <div className="container">
                        <h1>{title}</h1>
                        <div className="article-meta">
                            <div className="info">
                                <Link to={`/profile/${author && author.username}`}>
                                    <img src={(author && author.avatar) || "http://localhost:8000/default.png"} alt="" />
                                </Link>
                            </div>

                            <div className="info">
                                <Link to={`/profile/${author && author.username}`}>
                                    {author && author.username}
                                </Link>
                                {" "}
                            </div>

                            {/* 按钮行为 */}
                            <ArticleAction article={article} currentUser={currentUser} />
                        </div>

                    </div>
                </div>

                {/* 标签，内容，评论信息 */}
                <div className="row article-content">
                    <div className="col-xs-12">
                        <div dangerouslySetInnerHTML={markObj}></div>
                        <ul className="tag-list">
                            {
                                tags.map(tag => {
                                    return (
                                        <li className="tag-default tag-pill"
                                            key={tag}>
                                            {tag}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                {/* 评论 */}
                <Comment currentUser={currentUser} slug={slug} />
            </div>
        )
    }
}

const mapState = state =>({
    article:state.article,
    currentUser:state.user.login.currentUser
})

const mapDispatch = dispatch =>({
    getArticleBySlut,
    articleUnload
})

export default connect(mapState,mapDispatch)(Article)