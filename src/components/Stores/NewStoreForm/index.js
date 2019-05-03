import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

class NewStoreForm extends React.Component {
	state = {
		name: '',
		storeType: ''
	}


	handleSubmit = (event) => {
		event.preventDefault()
		console.log('form submitted!')
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

  render() {
  	console.log(this.state.name)
  	console.log(this.state.storeType)
    return (    
    	<div className="container">
    		<h3>Create New Store</h3>
	        <form 
		         autoComplete="off"
		         onSubmit={(e) => this.handleSubmit(e)}
		         >
		    	<TextField
		          label="Name"
		          name="name"
		          onChange={(e) => this.handleChange(e)}
		          placeholder="Add Store Name!"
		          fullWidth
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}
		        />

		    	<TextField
		          value={this.state.storeType}
		          native="true"
		          select
		          name="storeType"
		          onChange={(e) => this.handleChange(e)}
		          label="Store Type"
		          fullWidth
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}	          
		        >
	            <MenuItem value={'Restaurant'}> Restaurant</MenuItem>
	            <MenuItem value={'Prepcenter'}> Prepcenter</MenuItem>
		        </TextField>

			    <Button type="submit" variant="contained" color="primary">
		        	Save Store
		      	</Button>
		    
		    </form>

		</div>
    );
  }
}




export default NewStoreForm;
