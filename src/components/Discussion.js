import { useEffect, useState } from 'react';
import Comments from './Comments';
import "../styles/discussion.css";
import Friends from './Friends/Friends'
import { useParams, useLocation } from 'react-router-dom'
import NavBar from './NavBar/NavBar';

function Discussion(props) {
  const [username, setUsername] = useState('')
  const [messageText, setMessageText] = useState('')
  const [dataList, setDataList] = useState()
  const url = 'http://localhost:3363/api/'
  const [showComments, setShowComments] = useState(false)
  const [commentsSection, setCommentsSection] = useState('')
  const [activePost, setactivePost] = useState(false)
  const [editActive, setEditActive] = useState(false)
  const [postActive, setPostActive] = useState('')
  const [deleteActivated, setDeleteActivated] = useState(false)
  const [charactersLeft, setCharactersLeft] = useState(0)
  const [hideForm, setHideForm] = useState(false)
  let location = useLocation();
  let topicInfo = location.state
  const [numberOfPosts, setNumberOfPosts]  = useState(topicInfo.numberOfPosts);
  console.log(topicInfo)
  console.log(location)

  const { id } = useParams();

  useEffect(() => {
    getData()


  }, [id])

  async function getData() {
    const response = await fetch(url + 'discussions/' + id)
    const data = await response.json()
    console.log(data)
    setDataList(data);
    
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
      User: username,
      Text: messageText,
      discussionid: Number(id),

    }
    console.log(message)
    addNewPost(message)
    setMessageText('')
    setUsername('')
    
  }

  function goToComments(e, Id) {
    e.preventDefault();
    setCommentsSection(<Comments id={Id} />)
    
    if (showComments && activePost === Id) {
      setactivePost('')
      setShowComments(false)
    } else {
      setShowComments(true)
      setactivePost(Id)
    }
  }

function createNewPost() {
  setShowComments(false);
  
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
    setNumberOfPosts(numberOfPosts +1);
    setCharactersLeft(0);
  }

  async function sendEdit(e, changedPost) {
    e.preventDefault()

    if (changedPost.text !== messageText) {
      changedPost.text = messageText
      console.log(changedPost)
      await fetch(url + 'posts/' + changedPost.postid, {
        method: 'PUT',
        body: JSON.stringify(changedPost),
        headers: {
          "Content-type": "application/json",
        }
      })
    }

    setEditActive(false)
    setCharactersLeft(0)
    setMessageText('')
    setHideForm(false)
  }

  function editPost(e, post) {
    e.preventDefault()
    setHideForm(true)
    setPostActive(post.postid)
    setEditActive(true)
    setMessageText(post.text)
    
  }

  async function deletePost(e, id) {
    e.preventDefault()
    await fetch(url + `posts/${id}`, {
      method: 'DELETE',
      body: { postid: id },
      headers: {
        "Content-type": "application/json",
      }
    });
    getData()
    setNumberOfPosts(numberOfPosts -1);

  }

  function activateDelete(e, post) {
    e.preventDefault()
    setDeleteActivated(true)
    setPostActive(post.postid)
  }

  function cancleDelete(e, post) {
    e.preventDefault()
    setDeleteActivated(false)
    setPostActive(post.postid)
  }



  return (

    <div className="discussionMain-container" >
      <NavBar />
      <main>
        <section className="main-container">
          <section className="friends">
            <ul>
              <Friends />
            </ul>

          </section >

          <section className="discussion" >
            <section className="topic-intro" >
              <div className="user-info">
                <figure>
                  <img />
                </figure>
                <h5 className="user-name">{topicInfo.user}</h5>
              </div>
              <h4>{topicInfo.headline}</h4>
              <p>{topicInfo.text}</p>
              <footer className="reaction-box">
                <h5>{topicInfo.date.slice(0, 19).replace('T', ' ').slice(0, 16)}</h5>
                <h5>{numberOfPosts} posts on this topic</h5>
                <button onClick={()=>createNewPost()}><h5>Create post on this topic</h5></button>
              </footer>
            </section>
            {dataList ? dataList.posts.map(post =>
              <div className="border-container"  >

                <article className="post" key={post.postid} >
                  <div>
                    <div className="border-placeholder"> </div>
                    <div className="content">
                      <div className="header">
                        <div className="user-info">
                          <figure>
                            <img />
                          </figure>
                          <h5 className="user-name">{post.user}</h5>
                        </div>
                      </div>

                      {editActive && postActive === post.postid
                        ? <textarea maxlength="500" value={messageText} className="edit" onChange={e => maxCharacters(e.target.value)} />
                        : <p maxlength="500" >{post.text}</p>}

                      <section className="reaction-container"  >
                        <h4>{post.dateTime.slice(0, 19).replace('T', ' ').slice(0, 16)}</h4>

                        <button className={activePost === post.postid ? "active-post" : null} onClick={(e) => goToComments(e, post.postid)}>
                          <h4>{console.log(post)}comments</h4>
                        </button>
                        {deleteActivated && postActive === post.postid
                          ? <> <button onClick={(e) => deletePost(e, post.postid)}><h4>Confirm delete</h4></button>
                            <button onClick={(e) => cancleDelete(e, post)}><h4>Cancel</h4></button> </>
                          : <button onClick={(e) => activateDelete(e, post)}><h4>Delete</h4></button>
                        }

                        {editActive && postActive === post.postid
                          ? <button type="button" onClick={(e) => sendEdit(e, post)}><h4>Done</h4></button>
                          :
                          <button type="button" onClick={(e) => editPost(e, post)}><h4>Edit</h4></button>}

                      </section>
                    </div>
                  </div>
                  {showComments && activePost === post.postid ? commentsSection : null}

                </article>
              </div>
            )
              : 'oops kan inte nå api'}

            <article className={showComments | hideForm ? "hide" : "new-message"}>
              <form>
                <input maxlength="500" type="text" placeholder={"Username"} value={username} className="input-name" onChange={e => setUsername(e.target.value)} />
                <textarea rows="4" maxlength="500" placeholder="Write something..." value={messageText}className="input-text" onChange={e => maxCharacters(e.target.value)} />
                <p>{charactersLeft}/500</p>
                <button type="button" className="btn" onClick={(e) => handleClick(e)}>Post</button>
              </form>
            </article>
          </section>
        </section>
      </main>
    </div>
  );
}
export default Discussion;
