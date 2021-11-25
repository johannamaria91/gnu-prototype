import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Search from '../NavBar/SearchField/Search';
import Overlay from './Overlay';
import './overlay.css'
import './homepage.css'
import share from '../../icons/share.svg'
import trash from '../../icons/trash.svg'

//testar
function CreateNewTopicPage() {
  const [topicData, setTopicData] = useState([])
  const url = 'http://localhost:3363/api/discussions'
  const [showOverlay, setShowOverlay] = useState(false)
  const [ searchTerm, setSearchTerm ] = useState('')
  const filteredTopics = filterTopics(topicData, searchTerm)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const response = await fetch(url)
    const topicResponse = await response.json()
    console.log(topicResponse)
    setTopicData(topicResponse)
  }

  async function deleteTopic(e, id) {
    e.preventDefault()
    await fetch (url+`/${id}`, {
      method: 'DELETE',
      body: {id:id},
      headers: {
        "Content-type": "application/json",
      }
    });
      fetchData()
  }

  const close = () => {
    setShowOverlay(false)
  }

function filterTopics(topicList, searchTerm) {
    return topicList.filter((data)  => {
      if( searchTerm === "") {
          return true
      } else if ( data.headline.toLowerCase().includes(searchTerm.toLowerCase())) {
          return data
      }
      
    })
}

 function search(s) {
   setSearchTerm(s)
 }
 
  return (
    <div className="mainContainer-NewTopic">

      <NavBar search={search} />
      {showOverlay ?
    <>
     <div className="inputWrapper">
        <input className="newTopic" type="text" placeholder={"Post something"} onClick={() => setShowOverlay(true)} />
     </div> 
     <Overlay fetchData={fetchData} close={close} />
    </> 
  : <div className="inputWrapper">
        <input className="newTopic" type="text" placeholder={"Post something"} onClick={() => setShowOverlay(true)} />
      </div>}

            {filteredTopics ? filteredTopics.map(topic =>
            <Link className="topicUser" to={`/discussions/${topic.discussionid}`}> 
              <div  key={topic.discussionid}>
                <h4 className="createDate">{topic.createddate}</h4>

      <section className="discussionsMain">
        <div className="friendsTopics">

          {topicData ? topicData.map(topic =>
            <Link className="topicUser" to={`/discussions/${topic.discussionid}`}>
              <div key={topic.discussionid + topic.user}>
                <div className="userInfo"> 
         
                  <figure>
                    <img />
                  </figure> 
                  <h5 className="userName">{topic.user}</h5>
                  <button onClick={(e)=>deleteTopic(e, topic.discussionid)}><img src={trash}/></button>
                  </div>
                <div className="topicContentContainer">
                <h4 className="topicDescription">{topic.headline}</h4>
                  <div className={topic.discussiontext.length>60? "gradient": ''}>
                    <p className="text">{topic.discussiontext}</p>
                  </div>
                </div>
                <div className="topicInfoContainer">
                  <h4 className="createDate">{topic.createddate.slice(0, 19).replace('T', ' ').slice(0, 16)}</h4>
                  <h4>{topic.numberOfPosts} posts on this topic</h4>
                  <img src={share}/>
                </div>
              </div>
            </Link>
          ) : 'oops kan inte nå api'}
        </div>
      </section>
    </div>
  )
}

export default CreateNewTopicPage;