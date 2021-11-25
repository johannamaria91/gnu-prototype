import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Overlay from './Overlay';
import './overlay.css'
import './homepage.css'
import share from '../../icons/share.svg'
import trash from '../../icons/trash.svg'


function CreateNewTopicPage() {
  const [topicData, setTopicData] = useState([])
  const url = 'http://localhost:3363/api/discussions'
  const [showOverlay, setShowOverlay] = useState(false)

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


 

  return (
    <div className="mainContainer-NewTopic">
      <NavBar />
      {showOverlay ? <Overlay fetchData={fetchData} close={close} /> : <div className="inputWrapper">
        <input className="newTopic" type="text" placeholder={"Post something"} onClick={() => setShowOverlay(true)} />
      </div>}



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
                  <h4>10 posts on this topic</h4>
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