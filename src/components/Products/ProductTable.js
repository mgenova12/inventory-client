import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

export class ProductTable extends Component {

	getRows = (obj) => {
		let formatter = new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'USD',
		});

	    let rows = []
	    for (var key in obj) {
	        if (typeof obj[key] === "object") {
	            rows.push(obj[key].name)   
	        } else if(key === "price") {
	        	rows.push(formatter.format(obj[key]))
	        }
	        else {
	            rows.push(obj[key]);    
	        }
	    }
	    return rows
	}


  render() {
	const columns = [
		"ID", "Name", "Distributor", "Count By", 
		"Category", "Case Quantity", "Price", 
		
	];
    
	const data = this.props.products.map(product => {
	  	return this.getRows(product)
	})

    return (

      <div>
		<MUIDataTable
		  title={"Products"}
		  data={data}
		  columns={columns}
		  options={{
		    selectableRows: false,
		    responsive: "scroll"
		  }}		  
		/>     	
      </div>

    );
  }
}

export default ProductTable;
