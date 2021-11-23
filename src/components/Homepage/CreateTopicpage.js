import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Overlay from './Overlay';
import './overlay.css'


function CreateNewTopicPage (){
  const [topicData, setTopicData] = useState ([])
  const url = 'http://localhost:3363/api/posts'
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

        const close = () => {
          setShowOverlay(false)
          }


    return (
        <div className="mainContainer-NewTopic">
          <NavBar/>
          {showOverlay? <Overlay fetchData={fetchData} close={close}/> :  <div className="inputWrapper">
             <input className="newTopic" type="text" placeholder={"Post something"} onClick={()=>setShowOverlay(true)} /> 
          </div>  }
         
          
          <Link to="/disc">
            <section className="discussions-main-section">
                <div className="friends-topics-div">
                { topicData? topicData.map(topic => 
                <div key={topic.id}>
                  <h4>{topic.DateTime}</h4>
                  <h4 className="topic-name">{topic.name} said:</h4>
                  <h4 className="topic-description">{topic.description}</h4>
                  <p>{topic.Text}</p>
                </div>
              )
             : 'oops kan inte nå api'}
                </div>
            </section>
          </Link>

           
        </div>
    )
}

export default CreateNewTopicPage;