import React from 'react';
import { useEffect, useState } from 'react';



function CreateNewTopicPage (){
  const [topic, setmakeNewTopic] = useState('bananer')
  const [description, setdiscriptionOfTopic] = useState('i love mi bannanas')
  const url = 'http://localhost:3363/api/  somthing new'

    useEffect(() => {
        fetchData()
      }, [])
      

    async function fetchData() {
        const response = await fetch(url)
        const topicResponse = await response.json()
        console.log(topicResponse)
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
            <section className="discussions-main-section">
                <div className="friends-topics-div">
                </div>
            </section>

            <section className="makeNewTopic-section">
                <input type="text" placeholder={"Topic"} onChange={e => setmakeNewTopic(e.target.value)}/> 
                <input type="text" placeholder="Ditt meddelande..."  onChange={e => setdiscriptionOfTopic(e.target.value)}/> 
                <button type="button" onClick={(e)=>handleClick(e)}>Send message</button>
            </section>
        </div>
    )

}
export default CreateNewTopicPage();