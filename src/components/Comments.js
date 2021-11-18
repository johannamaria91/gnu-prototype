import { useEffect, useState } from "react"


function Comments(props) {
    const [commentsList, setCommentsList] = useState([]);
    const id = props.id
    console.log(props.id)
    useEffect(()=>{
        getComments(id)
    }, [id])

    async function getComments(id) {
        const response = await fetch('http://localhost:3363/api/comments/'+id)
        const data = await response.json()
        console.log(data)
        setCommentsList(data)
    }

    return (
       
        <section className="comments">
           
            {commentsList? commentsList.map(comment => <article key={comment.commentid}>

                <p>{comment.comment_text}</p>
            </article>):'no comments for this post'}
        </section>
       
    )
}

export default Comments