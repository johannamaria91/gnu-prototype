import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comments from './Comments';
import "../styles/discussion.css";
import Friends from './Friends/Friends'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar/NavBar';


function Discussion (){
    const [username, setUsername] = useState('')
    const [messageText, setMessageText] = useState('')
    const [dataList, setDataList] = useState()
    const url = 'http://localhost:3363/api/'
    const [showComments, setShowComments] = useState(false)
    const [commentsSection, setCommentsSection] = useState('')
    const [activePost, setactivePost] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [postActive ,setPostActive] = useState('')

    
    const {id} = useParams();

    useEffect(() => {
      getData()
    }, [id])
    
    async function getData() {
    const response = await fetch(url+'discussions/' + id)
    const data = await response.json()
    console.log(data)
    setDataList(data);
    }
    
    function handleClick(e) {
      e.preventDefault()
      let message = {
        User: username,
        Text: messageText,
        discussionid: Number(id),
      
      }
      console.log(message)
      addNewPost(message)
    }
    
    function goToComments(e, Id) {
      e.preventDefault();
      setCommentsSection(<Comments id={Id}/>) 
      setShowComments(!showComments)
      setactivePost(Id)
    }
    
    async function addNewPost(message) {
      await fetch('http://localhost:3363/api/posts', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      getData();
    }

    async function sendEdit(e, changedPost){
      e.preventDefault()

      if(changedPost.text !== messageText){
      changedPost.text = messageText
      console.log(changedPost)
      await fetch(url+'posts/'+changedPost.postid, {
        method: 'PUT',
        body: JSON.stringify(changedPost),
        headers: {
          "Content-type": "application/json",
              }
              })
          }
          
  setEditActive(false)
  }

  function editPost(e, post){
    e.preventDefault()
    setPostActive(post.postid)
    setEditActive(true)
    setMessageText(post.text)
}
    
      return (
    
        <div className="discussionMain-container">
          <header> <h1>I want a Gnu</h1></header>
          <NavBar/>
          <main> 
            <section className="main-container">
              <section className="friends">
                <Friends/>
              </section>

              <section className="messages">

              {  dataList?  dataList.posts.map(post => 
                <article key={post.postid} >
                  <div className="header">
                  <h4 className="user">{post.user} said:</h4>
                  <h4>{post.dateTime.slice(0, 19).replace('T', ' ').slice(0, 16)}</h4>
                
                  </div>
                  {editActive && postActive===post.postid 
                ? <textarea value={messageText} className="form-control z-depth-1" onChange={e => setMessageText(e.target.value)}/> 
                : <p>{post.text}</p>}
                  <section className="reaction-container">
    
                  <button className={activePost===post.postid? "active-post":null} onClick={(e) => goToComments(e, post.postid) }>Comments</button>
                  
                  {editActive && postActive===post.postid 
                    ?<button type="button" onClick={(e)=>sendEdit(e, post)}>Done</button>
                    :
                  <button type="button" onClick={(e)=>editPost(e, post)}>Edit</button> }
                  </section>
                  {showComments && activePost===post.postid? commentsSection : null}
                </article>
              )
             : 'oops kan inte nå api'}
    
    
             <article  className={showComments?"hide": "new-message" }>
             <form> 
              <input type="text" placeholder={"Namn"} className="input-name" onChange={e => setUsername(e.target.value)}/> 
              <textarea placeholder="Ditt meddelande..."  className="input-text"onChange={e => setMessageText(e.target.value)}/> 
              <button type="button" className="btn" onClick={(e)=>handleClick(e)}>Send message</button>
            </form> 
            </article>
            
            </section>
           </section> 
          </main>
        </div>
      );
    }
    export default Discussion;