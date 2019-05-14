import React from "react";
import { connect } from 'react-redux'

import MUIDataTable from "mui-datatables";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import { deleteDistributor } from '../../../actions/deleteDistributor.action';

class DistributorTable extends React.Component {

	getRows = (obj) => {
	    let rows = []
	    for (var key in obj) {
	    	rows.push(obj[key]);
	    }
	    return rows
	}

	handleEdit = (tableMeta) => {
		console.log(tableMeta.rowData)
		// console.log(event.target.value)
	}

	handleDelete = (tableMeta) => {
		 if (window.confirm('Are you sure you wish to delete this item?')) {
			let id = tableMeta.rowData[0]
			this.props.onDeleteDistributor(id)
		 }
	}


	render(){

		const columns = [
	      	{
		        name: "ID",
		        options: {
		          filter: true,
		        }
	        },
	      	{
		        name: "Name",
		        options: {
		          filter: true,
		        }
	        },
		      {
		        name: "",
		        options: {
		          filter: false,
		          customBodyRender: (value, tableMeta, updateValue) => (
		          	<Edit onClick={ () => this.handleEdit(tableMeta) }/>
		          )
		        }
		      },	
		      {
		        name: "",
		        options: {
		          filter: false,
		          customBodyRender: (value, tableMeta, updateValue) => (
		          	<Delete onClick={ () => this.handleDelete(tableMeta) }/>
		          )
		        }
		      },			              	        

		];

		const data = this.props.distributors.map(distributor => {
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

const mapActionsToProps = {
  onDeleteDistributor: deleteDistributor,
};


export default connect(null, mapActionsToProps)(DistributorTable)



