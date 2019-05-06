import React from "react";
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import { addStore } from '../../../actions/addStore.action';
import { getStoreTypes } from '../../../actions/getStoreTypes.action';


	
class NewStoreForm extends React.Component {
	state = {
		name: '',
		storeType: '',
		storeTypeId: '',
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.onAddStore(this.state.name, parseInt(this.state.storeTypeId), this.props.history)
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
		this.setState({ storeTypeId: event.nativeEvent.target.dataset.value })
	}

	componentWillMount = () => {
		this.props.onRequestStoreTypes()
	}

  render() {
  	const storeTypesMenu = this.props.onGetStoreTypes.map(storeType => {
  		return <MenuItem key={storeType.id} value={storeType.id}>{storeType.name}</MenuItem>
  	})

    return (    
    	<div className="container">
    		<h3>Create New Store</h3>
	        <div>
		    	<TextField
		          label="Name"
		          name="name"
		          onChange={this.handleChange}
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
		          select
		          name="storeType"
		          onChange={this.handleChange}
		          label="Store Type"
		          fullWidth
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}	          
		        >

		        {storeTypesMenu}
		        </TextField>

			   <Button variant="contained" color="primary" onClick={this.handleSubmit}>
		        	Save Store
		      </Button>
		    
		    </div>

		</div>
    );
  }
}
const mapActionsToProps = {
  onAddStore: addStore,
  onRequestStoreTypes: getStoreTypes,
};

const mapStateToProps = state => ({
  onGetStoreTypes: state.storeTypesReducer.storeTypes
});


export default connect(mapStateToProps, mapActionsToProps)(NewStoreForm)


