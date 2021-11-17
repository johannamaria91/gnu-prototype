import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
const [username, setUsername] = useState('Johanna')
const [subject, setSubject] = useState('')
const [messageText, setMessageText] = useState('')
const [newMessage, setNewMessage] = useState()
const [messageDone, setMessageDone] = useState(false)
const [dataList, setDataList] = useState([])

function handleClick(e) {
  e.preventDefault()
  setMessageDone(true)
  let message = {
    user: username,
    subject: subject,
    text: messageText
  }
  setNewMessage(message)
}

useEffect(() => {
  
  async function getData() {
  const response = await fetch('http://localhost:3363/api/posts') 
  const data = await response.json()
  const one = data[0]
  setDataList(data)
console.log(data) 
}
  getData()


}, [])

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

    {/* <p>{dataList? dataList[0].user:null}</p> */}
          { dataList? dataList.map(comment => 
            <article key={comment.Id}>
              <h4>Username: {comment.User}</h4>
              <h4>Time: {comment.dateTime}</h4>
              <p>{comment.Text}</p>
            </article>
          )
         : 'oops kan inte nå api'}
          {/* <article>
          <h4>Username: En kompis</h4>
          <h4>Time: 21-11-15 16:06</h4>
            <h4>Subject: Ämne</h4>
            <p>This is an old message!</p>
          </article>

          <article>
          <h4>Username: En annan kompis</h4>
          <h4>Time: 21-11-15 16:06</h4>
            <h4>Subject: Ämne</h4>
            <p>This is an old message!</p>
          </article>

          <article>
          <h4>Username: En tredje kompis</h4>
          <h4>Time: 21-11-15 16:06</h4>

            <h4>Subject: Ämne</h4>
            <p>This is an old message!</p>
          </article>
          {messageDone? <article>
            <h4>Username: {newMessage.user}</h4>
            <h4>Time: 21-11-15 16:06</h4>
            <h4>Subject: {newMessage.subject}</h4>
            <p>{newMessage.text}</p>
          </article> */}
         {/*  : null} */}
          

        </section>
        <section className="new-message">
        {/* <form> 
          <input type="text" placeholder={username} value={username}/> 
          <input type="text" placeholder="Ämne..." value={subject} onChange={e => setSubject(e.target.value)}/> 
          <input type="text" placeholder="Ditt meddelande..." onChange={e => setMessageText(e.target.value)}/> 
          <button onClick={(e)=>handleClick(e)}>Send message</button>
        </form> */}
        </section>
      </main>
    </div>
  );
}

export default App;
