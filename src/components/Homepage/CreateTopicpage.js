import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

function CreateNewTopicPage (){
  const [topic, setmakeNewTopic] = useState('bananer')
  const [description, setdiscriptionOfTopic] = useState('i love mi bannanas')
  const [topicData, setTopicData] = useState ([])
  const url = 'http://localhost:3363/api/posts'

    useEffect(() => {
        fetchData()
      }, [])

    async function fetchData() {
        const response = await fetch(url)
        const topicResponse = await response.json()
        console.log(topicResponse)
        setTopicData(topicResponse)
        }

    function handleClick(e) {
        e.preventDefault()
        let topicData = {
          User: topic,
          Text: description,
        }
        addNewPost(topicData)
      }
      
      async function addNewPost(topicData) {
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(topicData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        })
        fetchData();
      }

    return (
        <div className="mainContainer-NewTopic">
          <NavBar/>
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

            <section className="makeNewTopic-section">
                <input type="text" placeholder={"Topic"} onChange={e => setmakeNewTopic(e.target.value)}/> 
                <input type="text" placeholder="Ditt meddelande..."  onChange={e => setdiscriptionOfTopic(e.target.value)}/> 
                <button type="button" onClick={(e)=>handleClick(e)}>create new topic</button>
            </section>
        </div>
    )
}

export default CreateNewTopicPage;