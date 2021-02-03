import logo from "./logo.svg";
import "./App.css";
import Display from "./Display";
import Form from "./Form"
import FormItem from './FormItem'
import { Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const url = "https://grocery-list-sd.herokuapp.com";
  const [lists, setLists] = useState([]);
  
  const emptyList = { storeName: ""}
  const emptyItem = {
    name: "",
    qty: 0,
    category: ""}
  const[listId, setListId] = useState("")

  // Index - get all
  const getLists = () => {
    axios.get(url + "/lists").then((res) => {
      const lists = res.data;
      setLists(lists);
    });
  };
  useEffect(() => {
    getLists();
  }, []);
  // CREATE - create list
  const handleCreate = (newList) => {
    axios
      .post(url + "/lists", newList)
      .then((res) => {
        setLists(...lists, newList);
      })
      .then(() => getLists());
  };
  
  const getListId = (listId) =>{
    setListId(listId)
  }
  const handleCreateItem = (newItem) => {
    axios.post(url +'/items/' + listId, newItem)
    .then((res)=>{getLists()})
  }
  

  return (
    <div className="App">
      <h1>Hello World</h1>
      <Link to='/create'>
      <button>Add a List</button>
      </Link>
      <Route exact path="/" render={(rp) => 
      <Display 
        {...rp}
        lists={lists}
        getListId={getListId} 
      />
      }/>
      <Route exact path="/create" render={(rp) => (
          <Form
            {...rp}
            label="create"
            list={emptyList}
            handleSubmit={handleCreate}
          />
        )}
      />
      <Route exact path="/createItem" render={(rp) => (
          <FormItem
            {...rp}
            label="Add"
            item={emptyItem}
            handleSubmit={handleCreateItem}
          />
        )}
      />
    </div>
  );
}

export default App;
