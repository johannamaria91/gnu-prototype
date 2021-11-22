import { useEffect, useState } from "react"
import "../styles/comments.css";



function Comments(props) {
    const [commentsList, setCommentsList] = useState([]);
    const id = props.id
    const [username, setUsername] = useState('')
    const [messageText, setMessageText] = useState('')
    const baseUrl = 'http://localhost:3363/'
    const [editActive, setEditActive] = useState(false)
    const [commentActive ,setCommentActive] = useState('')
    const [deletecommentActive ,setDeleteCommentActive] = useState('')
    const [deleteActive, setDeleteActive] = useState(false)
    const [showForm,setShowForm]= useState(true)

    
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
        setMessageText("");
        setUsername("");
      }    

    function cancel(){
      setShowForm(false)
      setMessageText("");
      setUsername("");
    }

      function handleEdit(e, comment){
          e.preventDefault()
          setCommentActive(comment.commentid)
          setEditActive(true)
          setMessageText(comment.comment_text)
      }

      async function SendEdit(e, changedComment){
        e.preventDefault()

        if(changedComment.comment_text !== messageText){
        changedComment.comment_text = messageText
        console.log(changedComment)
        await fetch(baseUrl+'api/comments/'+changedComment.commentid, {
          method: 'PUT',
          body: JSON.stringify(changedComment),
          headers: {
            "Content-type": "application/json",
                }
                })
            }
            
    setEditActive(false)
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

      async function handleDelete(e, Cid){
        e.preventDefault()
        await fetch(baseUrl+'api/comments/'+Cid, {
            method: 'DELETE',
            body: {id:Cid},
            headers: {
              "Content-type": "application/json",
            }
        })
        getComments(id)
      }
      function setActiveDelete(e, comment){
        e.preventDefault()
        setDeleteActive(true)
        setDeleteCommentActive(comment.commentid)
    }


    return (
       
        <section className="comments">
           
            {commentsList? commentsList.map(comment => <article key={comment.commentid}>
                <div className="header">
              <h4 className="user">{comment.user} said:</h4>
              <h4>{comment.date}</h4>
            </div>
               {editActive && commentActive===comment.commentid 
                ? <textarea value={messageText} className="form-control z-depth-1" onChange={e => setMessageText(e.target.value)}/> 
                : <p>{comment.comment_text}</p>}
              
                <div className="footer text-end">
                    {editActive && commentActive===comment.commentid 
                    ?<button type="button" onClick={(e)=>SendEdit(e, comment)}>Done</button>
                    :<><button type="button" onClick={(e)=>handleEdit(e, comment)}>Edit&nbsp;</button>   
                    
                    {deleteActive && deletecommentActive===comment.commentid
                    ?<button type="button" onClick={(e)=>handleDelete(e, comment.commentid)}>Confirm</button>  
                    :<button type="button" onClick={(e)=>setActiveDelete(e, comment)}>Delete</button>  
                    }</>}
                </div>
         

            </article>):'no comments for this post'}
        
        <form className={!showForm?"hide": "newComment-form"}>
      
        <label htmlFor="userName">User</label>
        <input value={username}  type="text" id="userName" className="form-control form-control-sm" onChange={e => setUsername(e.target.value)}/> 

        <div className="form-group shadow-textarea">
        <label htmlFor="commentArea">Message</label>  
        <textarea value={messageText} className="form-control z-depth-1" id="commentArea" rows="2" onChange={e => setMessageText(e.target.value) }></textarea>
        </div>
        <button type="button" className="btn border border-1 mt-2" onClick={(e)=>handleClick(e)}>Send message</button>
        <button type="button" className="btn border border-1 mt-2" onClick={()=>cancel()}>Cancel</button>

        </form>
        </section>
       
    )
}

export default Comments