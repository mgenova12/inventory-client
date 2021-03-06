import React from "react";

class ManagementList extends React.Component {

	render() {

	    return (
 				<div className="list-group">
					<h4>Management Center</h4> 
		  			{/*<a href="/" className="list-group-item list-group-item-action list-group-item-light">Financials</a> */}
		  			<a href="/globals/products" className="list-group-item list-group-item-action list-group-item-light">Globals</a>
		  			<a href="/globals/invoices" className="list-group-item list-group-item-action list-group-item-light">Invoices</a> 
		  			{/* <a href="/" className="list-group-item list-group-item-action list-group-item-light">Manage Users</a> */}
				</div>
	    )
	}

}

export default ManagementList
