import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
const [username, setUsername] = useState('Johannaa')
const [subject, setSubject] = useState('')
const [messageText, setMessageText] = useState('')
/* const [newMessage, setNewMessage] = useState()*/
/* const [messageDone, setMessageDone] = useState(false) */
const [dataList, setDataList] = useState([])
const url = 'http://localhost:3363/api/posts'

useEffect(() => {
  
  async function getData() {
  const response = await fetch(url) 
  const data = await response.json()
  const one = data[0]
  setDataList(data)
console.log(data) 
}
  getData()
}, [])


function handleClick(e) {
  e.preventDefault()
/*   setMessageDone(true)
 */  
  let message = {
    User: username,
    Text: messageText,
  }
  addNewPost(message)
  
}


async function addNewPost(message) {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    }
})
}

  return (
    <div className="App">
      <header> <h1>I want a Gnu</h1></header>
      <main> 
        
        <section className="friends">
         <ul>
           <li>Kompis 1</li>
           <li>Kompis 2</li>
           <li>Kompis 3</li>
         </ul> 
        </section>
        <section className="messages">

          { dataList? dataList.map(comment => 
            <article key={comment.Id}>
              <h4>Username: {comment.User}</h4>
              <h4>Time: {comment.DateTime}</h4>
              <p>{comment.Text}</p>
            </article>
          )
         : 'oops kan inte nå api'}
          

          

        </section>
        <section className="new-message">
         <form> 
          <input type="text" placeholder={username}/> 
          {/* <input type="text" placeholder="Ämne..." value={subject} onChange={e => setSubject(e.target.value)}/>  */}
          <input type="text" placeholder="Ditt meddelande..."  onChange={e => setMessageText(e.target.value)}/> 
          <button onClick={(e)=>handleClick(e)}>Send message</button>
        </form> 
        </section>
      </main>
    </div>
  );
}

export default App;
