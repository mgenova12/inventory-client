import React from "react";
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux'
import { getRemovedStoreGoods } from '../../../actions/getRemovedStoreGoods.action';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';
import StoreGoodFormDrawer from './StoreGoodFormDrawer'

class AddStoreGoodsTable extends React.Component {

	state = {
		togglePreppedDrawer: false,
		rowData: []
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

	handleStoreGoodDrawer = tableMeta => event => {
		event.stopPropagation()
		this.setState({togglePreppedDrawer: true, rowData: tableMeta.rowData})
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
		        name: "Brand",
	        },
	      	{
		        name: "Prepped",
	        },	        	        
		      {
		        name: "",
		        options: {
		          filter: false,
		          customBodyRender: (value, tableMeta, updateValue) => (
		          	<AddCircle style={{cursor:'pointer'}} onClick={ this.handleStoreGoodDrawer(tableMeta) }/>
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
	      <StoreGoodFormDrawer 
	      	togglePreppedDrawer={this.state.togglePreppedDrawer} 
	      	rowData={this.state.rowData}
	      	storeId={this.props.storeId}
	      	/>			
				<MUIDataTable
				  title={"Add Store Good"}
				  data={data}
				  columns={columns}
				  options={{
				    selectableRows: "none",
				    responsive: "scrollFullHeight",
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
