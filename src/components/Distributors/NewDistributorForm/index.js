import React from "react";
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import DistributorTable from './DistributorTable'

import { addDistributor } from '../../../actions/addDistributor.action';
import { getDistributors } from '../../../actions/getDistributors.action';


class NewDistributorForm extends React.Component {

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
	
	componentDidMount = () => {
		this.props.onRequestDistributors()
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

		      	<DistributorTable distributors={this.props.onGetDistributors}/>
			</div>
			
		)
	}
}

const mapStateToProps = state => ({
  onGetDistributors: state.distributorReducer.distributors,
});

const mapActionsToProps = {
  onAddDistributor: addDistributor,
  onRequestDistributors: getDistributors,
};


export default connect(mapStateToProps, mapActionsToProps)(NewDistributorForm)


