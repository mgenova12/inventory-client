import React from 'react';
import { connect } from 'react-redux'
import { getProducts } from '../../../actions/getProducts.action';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import MUIDataTable from "mui-datatables";

class ProductTable extends React.Component {

	getRows = (obj) => {
		let formatter = new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'USD',
		});

	    let rows = []
	    for (var key in obj) {
	    	if (!obj[key]) {
				rows.push('');
	    	} else if (typeof obj[key] === "object") {
	            rows.push(obj[key].name)   
	        } else if(key === "price") {
	        	rows.push(formatter.format(obj[key]))
	        } else {
	            rows.push(obj[key]);    
	        } 
	    }
    	rows.push(<Edit/>);
    	rows.push(<Delete/>);	    
	    return rows
	}

	componentWillMount = () => {
		this.props.onRequestProducts()
	}	


  render() {
  	const { products } = this.props.onGetProducts

	const columns = [
		"ID", "Name", "Distributor", "Count By", 
		"Category", "Case Quantity", "Price", "","" 
	];
    
	const data = products.map(product => {
	  	return this.getRows(product)
	})

    return (

      <div>
		<MUIDataTable
		  title={"Global Products"}
		  data={data}
		  columns={columns}
		  options={{
		    selectableRows: false,
		    responsive: "scroll",
		    rowsPerPage: 15,
		    onCellClick: (cellIndex, rowIndex) => {
        		console.log(cellIndex, rowIndex);
      		}
		  }}		  
		/>     	
      </div>

    );
  }
}

const mapStateToProps = state => ({
  onGetProducts: state.productReducer
});

const mapActionsToProps = {
  onRequestProducts: getProducts,
};


export default connect(mapStateToProps, mapActionsToProps)(ProductTable);

