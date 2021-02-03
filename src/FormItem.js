import React from "react";

const FormItem = (props) => {
  //STATE FOR THE FORM
  const [formData, setFormData] = React.useState(props.item);

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Item"
        value={formData.name}
        onChange={handleChange}
      />
       <input
        type= "number"
        name="qty"
        placeholder="qty"
        value={formData.qty}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="category"
        value={formData.category}
        onChange={handleChange}
      />
      
      <input type="submit" value={props.label} />
    </form>
  );
};

export default FormItem;