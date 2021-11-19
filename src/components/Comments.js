import { useEffect, useState } from "react"




function Comments(props) {
    const [commentsList, setCommentsList] = useState([]);
    const id = props.id
    const [username, setUsername] = useState('')
    const [messageText, setMessageText] = useState('')
    const baseUrl = 'http://localhost:3363/'

    
    useEffect(()=>{
        getComments(id)
    }, [id])

    async function getComments(id) {
        const response = await fetch(baseUrl+'api/comments/'+id)
        const data = await response.json()
        console.log(data)
        setCommentsList(data)
    }

    function handleClick(e) {
        e.preventDefault()
        let message = {
          user: username,
          comment_text: messageText,
          postid: id
        }
        console.log(id)
        addNewComment(message)
      }    

      async function addNewComment(message) {
          console.log(message)
        await fetch(baseUrl+'api/comments', {
          method: 'POST',
          body: JSON.stringify(message),
          headers: {
            "Content-type": "application/json",
          }
        })
        getComments(id);
      }

    return (
       
        <section className="comments">
           
            {commentsList? commentsList.map(comment => <article key={comment.commentid}>

                <p>{comment.comment_text}</p>
            </article>):'no comments for this post'}
        <div>

        <form> 
          <input type="text" placeholder={"Namn"} className="input-name" onChange={e => setUsername(e.target.value)}/> 
          <textarea placeholder="Ditt meddelande..."  className="input-text" onChange={e => setMessageText(e.target.value)}/> 
          <button type="button" className="btn border border-1" onClick={(e)=>handleClick(e)}>Send message</button>
        </form> 

        </div>
        </section>
       
    )
}

export default Comments