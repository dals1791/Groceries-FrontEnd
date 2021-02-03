import logo from "./logo.svg";
import "./App.css";
import Display from "./Display";
import Form from "./Form"
import FormItem from './FormItem'
import { Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Deployed Db on Heroku URL
  const url = "https://grocery-list-sd.herokuapp.com";
  // States and initalizers -----------------------------------
  const [lists, setLists] = useState([]);
  const emptyList = { storeName: ""}
  const emptyItem = {
    name: "",
    qty: 0,
    category: ""}
  const[listId, setListId] = useState("")
  const [itemId, setItemId ]= useState(emptyItem)

  // Index - get all Lists ---------------------------------
  const getLists = () => {
    axios.get(url + "/lists").then((res) => {
      const lists = res.data;
      setLists(lists);
    });
  };
  useEffect(() => {
    getLists();
  }, []);
  // CREATE - create list---------------------------
  const handleCreate = (newList) => {
    axios
      .post(url + "/lists", newList)
      .then((res) => {
        setLists(...lists, newList);
      })
      .then(() => getLists());
  };
  // CREATE - create Item-------------------------
  const getListId = (listId) =>{
    setListId(listId)
  }
  const handleCreateItem = (newItem) => {
    axios.post(url +'/items/' + listId, newItem)
    .then((res)=>{getLists()})
  }
  // DESTROY ----------------------------------------
  // Lists ----
  const deleteList = (list)=>{
    axios.delete(url + '/lists/' + list._id)
    .then((res)=>{getLists()})
  }
  // Items -----
  const deleteItem = (item)=>{
    axios.delete(url + '/items/' + item._id)
    .then((res)=>{getLists()})
  }
  // UPDATE ------------------------------------------
  // Items ------------
  const getSelectedItem = (item) =>{
    setItemId(item)
  }
  const handleUpdateItem = (item)=>{
    axios.put(url +'/items/' + item._id, item)
    .then((res)=>{getLists()})
  }
  // List name
  const handleUpdateList = (list)=>{
    axios.put(url +'/lists/' + list._id, list)
    .then((res)=>{getLists()})
  }

  return (
    <div className="App">
      <header>
      <h1>I need Food!</h1>
      <Link to='/create'>
      <button>Add a List</button>
      </Link>
      </header>
      
      <div className="listContainer">
      <Route exact path="/" render={(rp) => 
      <Display 
          {...rp}
          lists={lists}
          getListId={getListId}
          deleteList={deleteList}
          deleteItem={deleteItem}
          getSelectedItem={getSelectedItem} 
        />
      
      }/>
      </div>
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
      <Route exact path="/editItem" render={(rp) => (
          <FormItem
            {...rp}
            label="Edit"
            item={itemId}
            handleSubmit={handleUpdateItem}
          />
        )}
      />
      <Route exact path="/editList" render={(rp) => (
          <Form
            {...rp}
            label="Edit"
            list={listId}
            handleSubmit={handleUpdateList}
          />
        )}
      />
    </div>
  );
}

export default App;
