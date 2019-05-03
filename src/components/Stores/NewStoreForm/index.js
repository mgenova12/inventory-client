import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class NewStoreForm extends React.Component {

  render() {
    return (    
    	<div class="container"> 
	    	<TextField
	          id="outlined-full-width"
	          label="Name"
	          style={{ margin: 8 }}
	          placeholder="Add a store name!"
	          fullWidth
	          margin="normal"
	          variant="outlined"
	          InputLabelProps={{
	            shrink: true,
	          }}
	        />

	    	<TextField
	          id="outlined-full-width"
	          label="Store Type"
	          style={{ margin: 8 }}
	          placeholder="Add a store name!"
	          fullWidth
	          margin="normal"
	          variant="outlined"
	          InputLabelProps={{
	            shrink: true,
	          }}
	        />

	    <Button variant="contained" color="primary">
        	Save Store
      	</Button>

		</div>
    );
  }
}

export default NewStoreForm;
