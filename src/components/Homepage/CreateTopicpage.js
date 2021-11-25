import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Search from '../NavBar/SearchField/Search';
import Overlay from './Overlay';
import './overlay.css'


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
      
      {showOverlay ? <Overlay fetchData={fetchData} close={close} /> : <div className="inputWrapper">
        <input className="newTopic" type="text" placeholder={"Post something"} onClick={() => setShowOverlay(true)} />
      </div>}


      
        <section className="discussionsMain">
          <div className="friendsTopics">

            {filteredTopics ? filteredTopics.map(topic =>
            <Link className="topicUser" to={`/discussions/${topic.discussionid}`}> 
              <div  key={topic.discussionid}>
                <h4 className="createDate">{topic.createddate}</h4>
                <h4 className="topicDescription">{topic.headline}</h4>
                <p className="text">{topic.discussiontext}</p>
                <h4 className="userName">By: {topic.user} </h4>
              </div>
            </Link>
            ) : 'oops kan inte nå api'}
          </div>
        </section>
     


    </div>
  )
}

export default CreateNewTopicPage;