import React from "react";

const Display = (props) => {
    const {lists} = props
  const loaded = () => {
    return (<div key={lists._id}>
            {lists.map((list) => {
                return <article>
                    <h2>{list.storeName}</h2>
                    
                    <div> {list.items.map((item)=>{
                        
                        return<div key={item._id}>
                           
                            <h3>{item}</h3>
                            
                            </div>
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
