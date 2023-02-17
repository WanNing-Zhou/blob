import React,{memo} from 'react';
import CommentItem from "./CommentItem";

const CommentList = memo(props => {
    const { comments, currentUser, deleteComment, slug } = props
    // console.log(comments, currentUser);
    if (comments.length === 0) {
        return <div>当前没有评论哟！</div>
    } else {
        return <div>
            {
                comments.map(comment => {
                    return <CommentItem
                        key={comment.id}
                        comment={comment}
                        currentUser={currentUser}
                        deleteComment={deleteComment}
                        slug={slug}
                    />
                })
            }
        </div>
    }
})

export default CommentList