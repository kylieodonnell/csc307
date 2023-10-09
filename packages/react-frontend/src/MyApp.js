// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from './Form';


function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );


  function removeOneCharacter (index) {
    const characterToDelete = characters[index];
    fetch(`http://localhost:8000/users/${characterToDelete.id}`, { //call fetch to make HTTP DELETE request to right route & appended id 
      method: 'DELETE'
    })
    .then(res => {
      if(res.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      } else if(res.status === 404) {
        console.log("resource not found");
      } else {
        console.log("error ");
      }
    })
    .catch(error => console.error('Error:', error));
  }

  // function removeOneCharacter (index) {
  //   const updated = characters.filter((character, i) => {
  //       return i !== index
  //   });
  //   setCharacters(updated);
  // }

  function updateList(person) { 
    postUser(person)
      .then((res) => res.json()) // extract json 
      .then((newUser) => setCharacters([...characters, newUser])) // user object to update state
      .catch((error) => {
        console.log(error);
      })
  }
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise.then((res) => {
    if(res.status === 201)
    {
      return res.json(); 
    } else
    {
      throw new Error('failed to create user');
    }
  });
}

return (

  <div className="container">
    <Form handleSubmit={updateList} />
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
  </div>  
  
);


}

export default MyApp;