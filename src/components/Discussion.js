import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comments from './Comments';
import "../styles/discussion.css";
import Friends from './Friends/Friends'
import { useParams } from 'react-router-dom'


function Discussion (){
    const [username, setUsername] = useState('')
    const [messageText, setMessageText] = useState('')
    const [dataList, setDataList] = useState()
    const url = 'http://localhost:3363/api/'
    const [showComments, setShowComments] = useState(false)
    const [commentsSection, setCommentsSection] = useState('')
    const [activePost, setactivePost] = useState(false)
    
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
    
      return (
    
        <div className="discussionMain-container">
          <header> <h1>I want a Gnu</h1></header>
          <main> 
            <section className="main-container">
              <section className="friends">
             <ul>
               <Friends/>
             </ul> 
            
            </section>

            <section className="messages">

              {  dataList?  dataList.posts.map(post => 
                <article key={post.postid} >
                  <div className="header">
                  <h4 className="user">{post.user} said:</h4>
                  <h4>{post.dateTime}</h4>
                
                  </div>
                  <p>{post.text}</p>
                  <section className="reaction-container">
    
                  <button className={activePost===post.postid? "active-post":null} onClick={(e) => goToComments(e, post.postid) }>Comments</button>
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