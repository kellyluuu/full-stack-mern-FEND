import { Routes, Route} from "react-router-dom"
import {useEffect, useState} from "react"
import Index from "../page/Index"
import Show from "../page/Show"


function Main(props) {
  const[people, setPeople] = useState(null)
  const URL = "https://kluuportfolio.herokuapp.com/"
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
  useEffect(()=>{getPeople()},[])
  return (
    <main>
      <Routes>

      <Route path ="/" 
      element = {<Index people={people} createPeople={createPeople} />}
      />

      <Route path = "/people/:id" 
      element = {<Show people={people}/>}
      />
      </Routes>
    </main>

  )
}

export default Main

// -> App
//   -> Header
//   -> Main |state: people|
//     -> Routes
//       -> Route |path: "/"|
//         -> Index |Props: people, createPeople|
//       -> Route |path="/people/:id|
//         -> Show |Props: people, updatePeople, deletePeople|