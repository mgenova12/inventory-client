import React from "react";
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';

import { addDistributor } from '../../../actions/addDistributor.action';

class AddDistributor extends React.Component {

	state = {
		name: '',
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.onAddDistributor(this.state.name)
		this.setState({ name: '' })
	}

	handleChange = (event) => {
		this.setState({ name: event.target.value })
	}	

	render(){
		return (
			<div> 
				<div className='container'>
					<h3> New Distributor </h3> 
					<form onSubmit={this.handleSubmit}>
				    	<TextField
				          label="Name"
				          required
				          value={this.state.name}
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
			        </form>
			     </div>

			</div>
			
		)
	}
}

const mapActionsToProps = {
  onAddDistributor: addDistributor,
};


export default connect(null, mapActionsToProps)(AddDistributor)


