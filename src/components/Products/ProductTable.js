import React, { Component } from 'react';


import MUIDataTable from "mui-datatables";

export class ProductTable extends Component {

	getRows = (obj) => {
	    let rows = []

	    for (var key in obj) {
	        if (typeof obj[key] === "object") {
	            rows.push(obj[key].name)   
	        } else {
	            rows.push(obj[key]);    
	        }
	    }
	    return rows
	}


  render() {
	const columns = ["ID", "Name", "Distributor", "Count By", "Category", "Case Quantity", "Price", "Markup", "Prepped"];
    

	const data = this.props.products.map(product => {
	  	return this.getRows(product)
	})


	// const { products } = this.props;
    return (


      <div>
		<MUIDataTable
		  title={"Products"}
		  data={data}
		  columns={columns}
		  options={{
		    selectableRows: false 
		  }}		  
		/>     	
      </div>

    );
  }
}

export default ProductTable;