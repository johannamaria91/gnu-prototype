import { useEffect, useState } from "react"
import "../styles/comments.css";



function Comments(props) {
  const [commentsList, setCommentsList] = useState([]);
  const id = props.id
  const [username, setUsername] = useState('')
  const [messageText, setMessageText] = useState('')
  const baseUrl = 'http://localhost:3363/'
  const [editActive, setEditActive] = useState(false)
  const [commentActive, setCommentActive] = useState('')
  const [deletecommentActive, setDeleteCommentActive] = useState('')
  const [deleteActive, setDeleteActive] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [charactersLeft, setCharactersLeft] = useState(0)


  useEffect(() => {
    getComments(id)
  }, [id])

  async function getComments(id) {
    const response = await fetch(baseUrl + 'api/comments/' + id)
    const data = await response.json()
    console.log(data)
    setCommentsList(data)
  }
  
  function maxCharacters(messageText) {
    if (messageText.length <= 500) {
      setMessageText(messageText)
      setCharactersLeft(messageText.length)
    }
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
      setCharactersLeft(500)
    }

    function cancel() {
      setShowForm(false)
      setMessageText("");
      setUsername("");
    }

    function handleEdit(e, comment) {
      e.preventDefault()
      setCommentActive(comment.commentid)
      setEditActive(true)
      setMessageText(comment.comment_text)
    }

    async function SendEdit(e, changedComment) {
      e.preventDefault()

      if (changedComment.comment_text !== messageText) {
        changedComment.comment_text = messageText
        console.log(changedComment)
        await fetch(baseUrl + 'api/comments/' + changedComment.commentid, {
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
      await fetch(baseUrl + 'api/comments', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          "Content-type": "application/json",
        }
      })
      getComments(id);
    }

    async function handleDelete(e, Cid) {
      e.preventDefault()
      await fetch(baseUrl + 'api/comments/' + Cid, {
        method: 'DELETE',
        body: { id: Cid },
        headers: {
          "Content-type": "application/json",
        }
      })
      getComments(id)
    }

    function setActiveDelete(e, comment) {
      e.preventDefault()
      setDeleteActive(true)
      setDeleteCommentActive(comment.commentid)
    }

    return (

      <section className="comments">
        <section className="existing-comments">
          {commentsList ? commentsList.map(comment =>

            <article key={comment.commentid}><div className="border-test">
              <div>
                <div className="border-node"></div>
                <div className="content">
                  <header>
                    <div className="user-info">
                      <figure>
                        <img />
                      </figure>
                      <h5 className="user-name">{comment.user}</h5>
                    </div>

                    <h4>{comment.date.slice(0, 19).replace('T', ' ').slice(0, 16)}</h4>
                  </header>
                  {editActive && commentActive === comment.commentid
                    ? <textarea maxlength="500" value={messageText} className="form-control z-depth-1" onChange={e=> maxCharacters(e.target.value)} />
                    : <p maxlength="500">{comment.comment_text}</p>}
                  <div className="footer text-end">
                    {editActive && commentActive === comment.commentid
                      ? <button type="button" onClick={(e) => SendEdit(e, comment)}>Done</button>
                      : <><button type="button" onClick={(e) => handleEdit(e, comment)}>Edit&nbsp;</button>
                        {deleteActive && deletecommentActive === comment.commentid
                          ? <button type="button" onClick={(e) => handleDelete(e, comment.commentid)}>Confirm</button>
                          : <button type="button" onClick={(e) => setActiveDelete(e, comment)}>Delete</button>
                        }</>}
                  </div>
                </div>
              </div>
            </div>
            </article>
          ) : 'no comments for this post'}
        </section>

        <form className={!showForm ? "hide" : "newComment-form"}>
          <label htmlFor="userName">User</label>
          <input maxlength="500" value={username} type="text" id="userName" className="form-control form-control-sm" onChange={e => setUsername(e.target.value)} />
          <div className="form-group shadow-textarea">
            <label htmlFor="commentArea">Message</label>
            <textarea maxlength="500" value={messageText} className="form-control z-depth-1" id="commentArea" rows="2" onChange={e=> maxCharacters(e.target.value)}></textarea>
            <p>{charactersLeft}/500</p>
          </div>
          <button type="button" className="btn border border-1 mt-2" onClick={(e) => handleClick(e)}>Send message</button>
          <button type="button" className="btn border border-1 mt-2" onClick={() => cancel()}>Cancel</button>
        </form>
      </section>
    )
  }
  export default Comments