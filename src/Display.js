import React from "react";

const Display = (props) => {
    const {lists, getListId, history, deleteList, deleteItem, getSelectedItem} = props
  const loaded = () => {
    return (<div key={lists._id}>
            {lists.map((list) => {
                return <article>
                    <h2>{list.storeName}
                    <span>
                        <button onClick={()=>{getListId(list)
                        history.push("/editList")}}>Edit</button>
                        <button onClick={()=>{deleteList(list)}}>X</button>
                        </span></h2>
                    
                    <div> {list.items.map((item)=>{
                        
                        return<ul style={{listStyleType: "none"}} key={item._id}>
                           
                                <li style={{textDecoration: "none"}}>{item.name} qty:{item.qty} 
                                    <span className="itemSpan">
                                        <button onClick={()=>{getSelectedItem(item)
                                        history.push("/editItem")}}>Edit</button>

                                        <button onClick={()=>{deleteItem(item)}}>X</button>
                                    
                                    </span>
                                </li>
                            
                            </ul>
                    })}
                    </div>
                    <button onClick={()=>
                            {getListId(list._id) 
                            history.push("/createItem")}}>+ Item</button>
                </article>
            })}
        </div>)
  };
  const loading = <h2>Add a List</h2>;

  return props.lists.length >0 ? loaded() : loading
};

export default Display;
