import React from "react";
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux'
import { getRemovedStoreGoods } from '../../../actions/getRemovedStoreGoods.action';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';

class AddStoreGoodsTable extends React.Component {

	getRows = (obj) => {
	    let rows = []
	    for (var key in obj) {
	    	rows.push(obj[key]);
	    }
	    return rows
	}

	componentDidMount = () => {
		this.props.onRequestRemovedStoreGoods(this.props.storeId)
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
		        name: "",
		        options: {
		          filter: false,
		          customBodyRender: (value, tableMeta, updateValue) => (
		          	<AddCircle style={{cursor:'pointer'}} />
		          )
		        }
		      },			              	        
		];
		
		const data = this.props.onGetRemovedStoreGoods.map(removedStoreGood => {
		  	return this.getRows(removedStoreGood)
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
				  title={"Add Store Good"}
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
  onGetRemovedStoreGoods: state.storeGoodsReducer.removedStoreGoods,
});

const mapActionsToProps = {
  onRequestRemovedStoreGoods: getRemovedStoreGoods,
};


export default connect(mapStateToProps, mapActionsToProps)(AddStoreGoodsTable);
