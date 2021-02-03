import React from "react";

const Form = (props) => {
  //STATE FOR THE FORM
  const [formData, setFormData] = React.useState(props.list);

  //FUNCTIONS
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    props.handleSubmit(formData); // Submit to Parents desired function
    props.history.push("/"); //Push back to display page
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="formContainer">
    <form onSubmit={handleSubmit}>
      <input
        className="inputField"
        type="text"
        name="storeName"
        placeholder="Store Name"
        value={formData.name}
        onChange={handleChange}
      />
      
      <input className="formSubmit" type="submit" value={props.label} />
    </form>
    <button className="backButton" onClick={()=>{props.history.push("/")}}>Back</button>
    </div>
    
  );
};

export default Form;