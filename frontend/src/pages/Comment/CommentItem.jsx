import { memo } from "react"
import { Link } from "react-router-dom"

const CommentItem = (props) => {
    // 评论人的信息  登陆人的信息  删除方法  文章的别名
    const { comment, currentUser, deleteComment, slug } = props

    const showDelete = comment && currentUser && currentUser.username === comment.userInfo.username

    return (
        <div className="card">
            {/* 评论的内容 */}
            <div className="card-block">
                <p className="card-text">
                    {comment && comment.body}
                </p>
            </div>

            {/* 评论人的信息 */}
            <div className="card-footer">
                <Link to={`/profile/${comment.userInfo.username}`}>
                    <img className="comment-author-img"
                         src={comment.userInfo.avatar || "http://localhost:8000/default.png"} alt="" />
                </Link>
                {" "}
                <Link to={`/profile/${comment.userInfo.username}`}>
                    {comment.userInfo.username}
                </Link>
                {/* 删除 */}
                {
                    showDelete ? <button className="mod-potions btn-dangerous"
                                         onClick={() => {
                                             deleteComment(slug, comment.id)
                                         }}
                    >
                        删除
                    </button> : null
                }
            </div>
        </div>
    )

}

export default memo(CommentItem)