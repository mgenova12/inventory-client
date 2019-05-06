import React from "react";
import TextField from '@material-ui/core/TextField';


class NewProductForm extends React.Component {


	render(){

		return (
			<div className='container'> 
				<h3> New Product Form </h3> 
				
		    	<TextField
		          label="Name"
		          name="name"
		          placeholder="Add Product Name"
		          fullWidth
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}
		        />

		    	<TextField
		          label="Name"
		          name="name"
		          placeholder="Add Product Name"
		          fullWidth
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}
		        />			        			

			</div>
			
		)
	}
}



export default NewProductForm;