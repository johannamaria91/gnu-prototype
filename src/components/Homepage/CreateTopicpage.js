import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Overlay from './Overlay';
import './overlay.css'
import './homepage.css'
import DeleteTopic from './DeleteTopic';
import share from '../../icons/share.svg'
import trash from '../../icons/trash.svg'
import HotTopics from './hotTopics/HotTopics';


//testar
function CreateNewTopicPage() {
  const [topicData, setTopicData] = useState([])
  const url = 'http://localhost:3363/api/discussions'
  const [showOverlay, setShowOverlay] = useState(false)
  const [showDeleteConfirm, setshowDeleteConfirm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const filteredTopics = filterTopics(topicData, searchTerm)
  const [activeTopic, setActiveTopic] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const response = await fetch(url)
    const topicResponse = await response.json()
    console.log(topicResponse)
    setTopicData(topicResponse)
  }

  const close = () => {
    setShowOverlay(false)
  }

  const closeDeletion = () => {
    setshowDeleteConfirm(false)
  }

  function search(s) {
    setSearchTerm(s)
  }

  function filterTopics(topicList, searchTerm) {
    return topicList.filter((data) => {
      if (searchTerm === "") {
        return true
      } else if (data.headline.toLowerCase().includes(searchTerm.toLowerCase())) {
        return data
      }

    })
  }

  function openDeleteOverlay(topic) {
    setActiveTopic(topic.discussionid)
    setshowDeleteConfirm(true)
  }


  return (
    <div className="mainContainer-NewTopic">
      <NavBar search={search} />

      <section className="discussionsMain">
        {showOverlay ? <> <div className="inputWrapper">
          <input className="newTopic" type="text" placeholder={"Post something"} onClick={() => setShowOverlay(true)} />
        </div> <Overlay fetchData={fetchData} close={close} /> </> :
        
          <div className="inputWrapper">
            <input className="newTopic" type="text" placeholder={"Post something"} onClick={() => setShowOverlay(true)} />
          </div>}
         <HotTopics filteredTopics={filteredTopics}/>
        <div className="friendsTopics">
          {filteredTopics ? filteredTopics.map(topic =>
            <div className="topic-container" key={topic.discussionid + topic.user}>
              <div className="userInfo">
                <div className="user-view">
                  <figure>
                    <img />
                  </figure>
                  <h5 className="userName">{topic.user}</h5>
                </div>

                {showDeleteConfirm && activeTopic === topic.discussionid ? <>
                  <div className="delete-conferm-container">
                    <button onClick={() => openDeleteOverlay(topic)}><img alt="delete" src={trash} /></button>
                  </div> <DeleteTopic fetchData={fetchData} close={closeDeletion} topicid={activeTopic} /> </> :
                  <div className="delete-conferm-container">
                    <button onClick={() => openDeleteOverlay(topic)}><img alt="delete" src={trash} /></button>
                  </div>}
              </div>
              <div className="topicContentContainer">
                <Link className="topicUser" to={`/discussions/${topic.discussionid}`} state={{
                  text: topic.discussiontext,
                  headline: topic.headline,
                  date: topic.createddate,
                  user: topic.user,
                  numberOfPosts: topic.numberOfPosts
                }} >
                  <h4 className="topicDescription">{topic.headline}</h4>
                  <div className={topic.discussiontext.length > 60 ? "gradient" : ''}>
                    <p className="text">{topic.discussiontext}</p>
                  </div>
                </Link>
              </div>

              <div className="topicInfoContainer">
                <h4 className="createDate">{topic.createddate.slice(0, 19).replace('T', ' ').slice(0, 16)}</h4>
                <h4>{topic.numberOfPosts} posts on this topic</h4>
                <img src={share} alt="share" />
              </div>
            </div>
          ) : 'oops kan inte nå api'}
        </div>
      </section>
    </div>
  )
}

export default CreateNewTopicPage;