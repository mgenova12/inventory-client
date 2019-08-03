import React from "react";
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';

import { addLocation } from '../../../actions/addLocation.action';

class AddLocation extends React.Component {

	state = {
		name: '',
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.onAddLocation(this.state.name, parseInt(this.props.storeId))
		this.setState({ name: '' })
	}

	handleChange = (event) => {
		this.setState({ name: event.target.value })
	}
	

	render(){
		return (
			<div> 
				<div className='container'>
				<h3>New Locations</h3>
					<form onSubmit={this.handleSubmit}>
				    	<TextField
				          label="Name"
				          required
				          value={this.state.name}
				          name="name"
				          placeholder="Add Location Name"
				          fullWidth
				          onChange={this.handleChange}
				          margin="normal"
				          variant="outlined"
				          InputLabelProps={{
				            shrink: true,
				          }}
				        />	
			        </form>
			     </div>
			</div>
			
		)
	}
}

const mapActionsToProps = {
  onAddLocation: addLocation,
};


export default connect(null, mapActionsToProps)(AddLocation)


