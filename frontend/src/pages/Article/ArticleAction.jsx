import React, {memo} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deleteArticle, favoriteArticle, unfavoriteArticle} from "../../actions/article"

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const ArticleAction = (props) => {
    const {article, currentUser} = props
    const {slug, author} = article
    if (currentUser) {
        //登录时 才能有 用户的文章还是别人的文章
        const isMe = currentUser && author && currentUser.username === author.username
        if (isMe) {
            //自己的文章
            return ( //可以进行编辑或者删除
                <span>
                    <Link to={`/article/edit/${slug}`}>
                        编辑
                    </Link>
                    {" "}
                    {/* 删除方法暂时没写  */}
                    <button
                        onClick={() => {
                            props.deleteArticle(slug)
                        }}>
                        删除
                    </button>
                </span>
            )
        } else {
            //别人的文章
            return (
                <button
                    className={article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}
                    onClick={
                        () => {
                            if (article.favorited) {
                                props.unfavoriteArticle(slug)
                            } else {
                                props.favoriteArticle(slug)
                            }
                        }
                    }
                >
                    <i className="iconfont icon-xihuan"></i> {article.favoriteCount}
                </button>
            )
        }
    }else{
        //未登录状态,提示登录
        return (
            <button
                onClick={() => {
                    console.log("重定向到登录页面");
                }}
            >
                未登录 请登录
            </button>
        )
    }
    return (
        <div>

        </div>
    );
}

const mapDispatch = {
    deleteArticle,
    favoriteArticle,
    unfavoriteArticle
}

export default connect(null, mapDispatch)(ArticleAction)