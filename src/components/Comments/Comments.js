import { useEffect } from "react";
import { useState } from "react";
import Comment from "../Comment/Comment";

function Comments({ comments, updatePost }) {

    const [commentsComponents, setCommentComponents] = useState([]);

    const getComments = () => {
        return comments.map((data) => {
            const { _id, text, date, account } = data;
            const { name, lastName, isAccountComment } = account;

            return <Comment
                key={_id}
                commentID={_id}
                comment={text}
                profileData={{
                    _id: account._id,
                    name: `${name} ${lastName}`,
                    date: new Date(date).toLocaleString(),
                    isAccountComment

                }}
                updatePost={updatePost}
            />;
        });
    }

    useEffect(() => {
        setCommentComponents(getComments);
    }, [comments]);

    return <>{commentsComponents}</>
}

export default Comments;