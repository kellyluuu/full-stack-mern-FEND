import {useEffect, useState} from "react"
import { Routes, Route} from "react-router-dom"
import Index from "../page/Index"
import Show from "../page/Show"

// -> App
//   -> Header
//   -> Main |state: people|
//     -> Routes
//       -> Route |path: "/"|
//         -> Index |Props: people, createPeople|
//       -> Route |path="/people/:id|
//         -> Show |Props: people, updatePeople, deletePeople|


function Main(props) {
  const[people, setPeople] = useState(null)
  const URL = "https://kluufullstackmernapp.herokuapp.com/people/"
  
  const getPeople = async ()=>{
    const response = await fetch (URL)
    const data = await response.json()
    setPeople(data)
  }
  const createPeople = async (person)=>{
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    })
    // update list of people
    getPeople()
  }
  const updatePeople = async (person, id)=>{
    await fetch(URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person)
    })
    // update list of people
    getPeople()
  }

  const deletePeople = async (id)=>{
    // make delete request to create people
    await fetch(URL + id, {
      method: "DELETE",
    })
    // update list of people
    getPeople()
  }

  useEffect(()=>{getPeople()},[])
  return (
    <main>
      <Routes>

      <Route exact path ="/" 
      element = {<Index people={people} createPeople={createPeople} />}
      />

      <Route path = "/people/:id" 
      element = {
        <Show
        people={people}
        updatePeople={updatePeople}
        deletePeople={deletePeople}
      />
      }
      />
      </Routes>
    </main>

  )
}

export default Main

