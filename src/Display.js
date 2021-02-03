import React from "react";

const Display = (props) => {
    const {lists, getListId, history} = props
  const loaded = () => {
    return (<div key={lists._id}>
            {lists.map((list) => {
                return <article>
                    <h2>{list.storeName}<span>
                        <button onClick={()=>
                            {getListId(list._id) 
                            history.push("/createItem")}}>+</button></span></h2>
                    
                    <div> {list.items.map((item)=>{
                        
                        return<ul key={item._id}>
                           
                            <li>{item.name} qty:{item.qty} </li>
                            
                            </ul>
                    })}
                    </div>
                </article>
            })}
        </div>)
  };
  const loading = <h1>Loading...</h1>;

  return props.lists.length >0 ? loaded() : loading
};

export default Display;
