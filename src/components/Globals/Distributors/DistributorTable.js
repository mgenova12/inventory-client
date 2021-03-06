import React from "react";
import { connect } from 'react-redux'

import MUIDataTable from "mui-datatables";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Check from '@material-ui/icons/Check';

import { deleteDistributor } from '../../../actions/deleteDistributor.action';
import { editDistributor } from '../../../actions/editDistributor.action';
import { getDistributors } from '../../../actions/getDistributors.action';

class DistributorTable extends React.Component {
	state = {
		isEditing: false,
		currentDistributorId: '',
		distributor: ''
	}

	handleChange = (event) => {
		this.setState({ distributor: event.target.value })
	}

	getRows = (obj) => {
	    let rows = []
	    for (var key in obj) {
	    	if(this.state.isEditing && this.state.currentDistributorId === obj.id && key !== 'id'){
	    		rows.push(
	    			<TextField value={this.state.distributor} onChange={this.handleChange}/>
	    		)
	    	} else {
	    		rows.push(obj[key]);
	    	}
	    }
	    return rows
	}

	handleSubmit = event => {
		event.preventDefault()
		this.setState({ isEditing: false })
		this.props.onEditDistributor(this.state.currentDistributorId, this.state.distributor)
	}	

	handleEdit = (tableMeta) => {
		let currentDistributorId = tableMeta.rowData[0]
		this.setState(prevState => ({ 
			isEditing: !prevState.isEditing, 
			currentDistributorId: currentDistributorId,
			distributor: tableMeta.rowData[1]
		}))
	}

	handleDelete = (tableMeta) => {
		 if (window.confirm('Are you sure you wish to delete this item?')) {
			let id = tableMeta.rowData[0]
			this.props.onDeleteDistributor(id)
		 }
	}

	componentDidMount = () => {
		this.props.onRequestDistributors()
	}	

	render(){
		const columns = [
	      	{
		        name: "ID",
	        },
	      	{
		        name: "Name",
	        },
		      {
		        name: "",
		        options: {
		          filter: false,
		          customBodyRender: (value, tableMeta, updateValue) => (
				    (this.state.isEditing && tableMeta.rowData && tableMeta.rowData[0] === this.state.currentDistributorId ) ? (
		          		<Check style={{cursor:'pointer'}} onClick={this.handleSubmit}/>
		          	) :(
		          		<Edit style={{cursor:'pointer'}} onClick={ () => this.handleEdit(tableMeta) }/>
		          	)		          	
		          )
		        }
		      },	
		      {
		        name: "",
		        options: {
		          filter: false,
		          customBodyRender: (value, tableMeta, updateValue) => (
		          	<Delete style={{cursor:'pointer'}} onClick={ () => this.handleDelete(tableMeta) }/>
		          )
		        }
		      },			              	        
		];

		const data = this.props.onGetDistributors.map(distributor => {
		  	return this.getRows(distributor)
		})

		return (
			<div > 
				<MUIDataTable
				  title={"Distributors"}
				  data={data}
				  columns={columns}
				  options={{
				    selectableRows: false,
				    responsive: "scroll",
				    rowsPerPage: 15,			    	    
				  }}		  
				/>    
			</div>
			
		)
	}
}

const mapStateToProps = state => ({
  onGetDistributors: state.distributorReducer.distributors,
});

const mapActionsToProps = {
  onDeleteDistributor: deleteDistributor,
  onEditDistributor: editDistributor,
  onRequestDistributors: getDistributors,
};


export default connect(mapStateToProps, mapActionsToProps)(DistributorTable)



