import React, { Component } from 'react';


import MUIDataTable from "mui-datatables";

export class ProductTable extends Component {


  render() {
	const columns = ["ID", "Name", "City", "State"];
    
    console.log(this.props.products)

	const data = this.props.products.map(product => {
	  return Object.values(product).slice(0,-1)
	})
	console.log(data)

	// const data = [
	//  ["Joe James", "Test Corp", "Yonkers", "NY"],
	//  ["John Walsh", "Test Corp", "Hartford", "CT"],
	//  ["Bob Herm", "Test Corp", "Tampa", "FL"],
	//  ["James Houston", "Test Corp", "Dallas", "TX"],
	// ];

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