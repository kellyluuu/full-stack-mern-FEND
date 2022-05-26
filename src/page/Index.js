import {Link} from "react-router-dom"
import {useState} from "react"

// Let's now add a form to our Index.js:

// State to hold the form data
// Form inputs in our JSX
// handleChangefunction to allow our state to control the form
// handleSubmitfunction handle form submisssion


function Index (props){
  // load function 
  const loaded = ()=>{

    return props.people.map((person)=>(
      <div key={person._id} className = "person">
        <Link to = {`/people${person._id}`}>
          <h1>{person.name}</h1>
        </Link>
        <img src={person.name} alt={person.name}/>
        <h3>{person.title}</h3>
      </div>
    ))
  }
  const loading = ()=>{
    return <h1>Loading...</h1>
  }
  return props.people ? loaded() : loading ()
}
export default Index