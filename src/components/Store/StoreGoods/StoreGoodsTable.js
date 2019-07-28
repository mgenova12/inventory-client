import React from "react";
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux'
import { getStoreGoods } from '../../../actions/getStoreGoods.action';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class AddStoreGoodsTable extends React.Component {

	state = {
		rowData: [],
		storeGoods: []
	}

	getRows = (obj) => {
	    let rows = []
	    for (var key in obj) {
	    if (!obj[key]) {
					rows.push('');
    		} else if (typeof obj[key] === "object") {
           rows.push(obj[key].name)   
	    	} else if(typeof obj[key] === "boolean"){
	    		rows.push(obj[key].toString())
	    	} else {
	    		rows.push(obj[key]);
	    	}
	    }
	    return rows
	}

	componentWillMount = () => {
		this.props.onRequestStoreGoods(parseInt(this.props.storeId))
	}


  render() {
		const columns = [
      	{
	        name: "ID",
        },
      	{
	        name: "Name",
        },	
      	{
	        name: "Location",
        },
      	{
	        name: "Distributor",
        },	      	
        {
	        name: "Count By",
        },	        	        
        {
	        name: "Max Amount",
        },	 								 
        {
	        name: "Replenish By Each",
        },	 	      
        {
	        name: "Delivery Day",
        },	 	                       	        
		];
		console.log(this.props.onGetStoreGoods)
		const data = this.props.onGetStoreGoods.map(StoreGood => {
		  return this.getRows(StoreGood)
		})

	  const theme = createMuiTheme({
		  typography: {
		    useNextVariants: true,
		  },	  	
	    overrides: {
	      MUIDataTable: {
	        responsiveScroll: {
	          overflowX: 'none',
	          height: 'auto',
	          maxHeight: 'auto',
	        },
	      },
	    },
	  })		

    return (    
			<div > 
			<MuiThemeProvider theme={theme}>		
				<MUIDataTable
				  title={"Store Goods"}
				  data={data}
				  columns={columns}
				  options={{
				    selectableRows: false,
				    responsive: "scroll",
				    rowsPerPage: 100,			    	    
				  }}		  
				/>  
				</MuiThemeProvider>  
			</div>
    );
  }
}

const mapStateToProps = state => ({
  onGetStoreGoods: state.storeGoodsReducer.storeGoods,
});

const mapActionsToProps = {
  onRequestStoreGoods: getStoreGoods,
};


export default connect(mapStateToProps, mapActionsToProps)(AddStoreGoodsTable);
