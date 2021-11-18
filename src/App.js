import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
const [username, setUsername] = useState('')
const [messageText, setMessageText] = useState('')
const [dataList, setDataList] = useState([])
const url = 'http://localhost:3363/api/posts'
/* const testdata = [{
User: "Johanna",
DateTime: new Date().toLocaleString(),
Text: "Hej hej!"
},
{
  User: "Johanna",
  DateTime: new Date().toLocaleString(),
  Text: "Hej hej!"
  },
  {
    User: "Johanna",
    DateTime: new Date().toLocaleString(),
    Text: "Hej hej! hkadfhsk hfakskf  hkfahka fhahkhfakhfk ahkfahks hdashkhfsf hasfhkaf h afhkafh ak ahhjdhajhsah  dhajdhsaj d hajhdjd ahj"
    },
    {
      User: "Johanna",
      DateTime: new Date().toLocaleString(),
      Text: "Hej hej!"
      }] */

useEffect(() => {
  getData()
}, [])

async function getData() {
const response = await fetch(url)
const data = await response.json()
console.log(data)
setDataList(data);
}

function handleClick(e) {
  e.preventDefault()
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
  getData();
}

  return (
    <div className="App">
      <header> <h1>I want a Gnu</h1></header>
      <main> 
        <section class="main-container">
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
              <div className="header">
              <h4 className="user">{comment.User} said:</h4>
              <h4>{comment.DateTime}</h4>

              </div>
              <p>{comment.Text}</p>
              <section className="reaction-container">
              <button>Reply</button>
              </section>
            </article>
          )
         : 'oops kan inte nå api'}


         <article className="new-message">
         <form> 
          <input type="text" placeholder={"Namn"} className="input-name" onChange={e => setUsername(e.target.value)}/> 
          <textarea placeholder="Ditt meddelande..."  className="input-text"onChange={e => setMessageText(e.target.value)}/> 
          <button type="button" className="btn" onClick={(e)=>handleClick(e)}>Send message</button>
        </form> 
        </article>
        </section>

          </section> 
        
        
      </main>
    </div>
  );
}
export default App;
