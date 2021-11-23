import { useState, useEffect} from 'react'
import './overlay.css'


const Overlay = (props) => {

    const [topic, setmakeNewTopic] = useState('bananer')
    const [description, setdiscriptionOfTopic] = useState('i love mi bannanas')
    const url = 'http://localhost:3363/api/posts'

    useEffect(() => {
        fetchData()
      }, [])

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
        close()
      }

      function fetchData() {
          props.fetchData()
      }

      

        const close = () => {
            props.close()
            }
 
    return (
    

        <div className="newTopicWrapper" >
         <section className="makeNewTopic"> 
                <button className="close" onClick={close}>✖️</button>
                <input type="text" placeholder={"Topic"} onChange={e => setmakeNewTopic(e.target.value)}/> 
                <textarea rows="4" type="text" placeholder="Ditt meddelande..."  onChange={e => setdiscriptionOfTopic(e.target.value)}/> 
                <button type="button" onClick={(e)=>handleClick(e)}>create new topic</button>
          </section>
        </div>
    
    )
}

export default Overlay