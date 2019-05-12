import React from "react";

import MUIDataTable from "mui-datatables";


class DistributorTable extends React.Component {

	getRows = (obj) => {
	    let rows = []
	    for (var key in obj) {
	    	rows.push(obj[key]);
	    }
	    return rows
	}


	render(){
		// console.log('distributors state')
		// console.log(this.props.distributors)
		const columns = [
			"ID", "Name"
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



export default DistributorTable


