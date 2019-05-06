import React from "react";
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { addDistributor } from '../../../actions/addDistributor.action';


class NewDistributorForm extends React.Component {

	state = {
		name: ''
	}

	handleSubmit = () => {
		this.props.onAddDistributor(this.state.name, this.props.history)
	}

	handleChange = (event) => {
		this.setState({ name: event.target.value })
	}


	render(){
		console.log(this.state.name)
		return (
			<div className='container'> 
				<h3> New Distributor </h3> 
				
		    	<TextField
		          label="Name"
		          name="name"
		          placeholder="Add Distributor Name"
		          fullWidth
		          onChange={this.handleChange}
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}
		        />		        			

			   <Button variant="contained" color="primary" onClick={this.handleSubmit}>
		        	Add Distributor
		      </Button>
			</div>
			
		)
	}
}

const mapActionsToProps = {
  onAddDistributor: addDistributor,
};

export default connect(null, mapActionsToProps)(NewDistributorForm)


