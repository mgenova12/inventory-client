import React from "react";
import MUIDataTable from "mui-datatables";
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Check from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { getStoreGoods } from '../../../actions/getStoreGoods.action';
import { deleteStoreGood } from '../../../actions/deleteStoreGood.action';
import { editStoreGood } from '../../../actions/editStoreGood.action';
import { getDistributors } from '../../../actions/getDistributors.action';
import { getCountBies } from '../../../actions/getCountBies.action';
import { getLocations } from '../../../actions/getLocations.action';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class AddStoreGoodsTable extends React.Component {

	state = {
		isEditing: false,
		rowData: [],
		storeGoods: [],
		currentStoreGoodId: '',
		location: '',
		distributor: '',
		countBy: '',
		maxAmount: '',
		replenishByEach: '',
		deliveryDay: '',
	}

	getRows = (obj) => {
	    let rows = []
	  	
	  	const distributorMenu = this.props.onGetDistributors.map(distributor => {
	  		return <option key={distributor.id} value={distributor.name}>{distributor.name}</option>
	  	})	
	  	const countByMenu = this.props.onGetCountBies.map(countBy => {
	  		return <option key={countBy.id} value={countBy.name}>{countBy.name}</option>
	  	})
	  	const locationMenu = this.props.onGetLocations.map(location => {
	  		return <option key={location.id} value={location.name}>{location.name}</option>
	  	})				
	  	const deliveryDayMenu = ["Tuesday","Friday","Both"].map(day => {
	  		return <option key={day} value={day}>{day}</option>
	  	})
	  	const replenishByEachMenu = [true, false].map(bool => {
	  		return <option key={bool} value={bool}>{bool.toString()}</option>
	  	})	  	

	    for (var key in obj) {
		    if(this.state.isEditing && this.state.currentStoreGoodId === obj.id && key !== 'id' && key !== 'product'){
		    
		    	if(['distributor', 'countBy', 'location', 'deliveryDay', 'replenishByEach'].includes(key)){
						var menuOption = (
						  key === 'distributor' ? distributorMenu : 
						  key === 'countBy' ? countByMenu : 
						  key === 'location' ? locationMenu : 
						  key === 'deliveryDay' ? deliveryDayMenu : 
						  key === 'replenishByEach' ? replenishByEachMenu : 
						  null 
						);	
	    			rows.push(
				    	<TextField
				    		select
				    		onChange={this.handleChange(key)}
				    		defaultValue={ this.state[key] }
			          SelectProps={{
			            native: true,
			          }}				                 
				        >		
				        {menuOption}
				      </TextField>	
			       )
		    	} else {
		    		rows.push(
							<TextField
	    					value={this.state[key]} 
	    					onChange={this.handleChange(key)}
		    			/>
		    		)		    		
		    	}


		    } else {
			    if (obj['product'] === null){   	
				    	rows.push('DELETED');
				    } else if (!obj[key]) {
							rows.push('');
			    	} else if (typeof obj[key] === "object") {
		        	rows.push(obj[key].name)   
			    	} else if(typeof obj[key] === "boolean"){
			    		rows.push(obj[key].toString())
			    	} else {
			    		rows.push(obj[key]);
			    	}
			  	}		    	
		    }

	    return rows
	}

	handleSubmit = event => {
		event.preventDefault()
		event.stopPropagation()
		this.setState({ isEditing: false })
		this.props.onEditStoreGood(
			this.state.currentStoreGoodId, 
			this.state.location,
			this.state.distributor,
			this.state.countBy,
			this.state.maxAmount,
			this.stringToBoolean(this.state.replenishByEach),
			this.state.deliveryDay,
		)
	}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

	handleEdit = tableMeta => event  => {
		event.stopPropagation()
		let currentStoreGoodId = tableMeta.rowData[0]
		this.setState(prevState => ({ 
			currentStoreGoodId: currentStoreGoodId,
			isEditing: !prevState.isEditing, 
			location: tableMeta.rowData[2],
			distributor: tableMeta.rowData[3],
			countBy: tableMeta.rowData[4],
			maxAmount: tableMeta.rowData[5],
			replenishByEach: tableMeta.rowData[6],
			deliveryDay: tableMeta.rowData[7] 		
		}))
	}
	handleDelete = (tableMeta, event) => {
		event.stopPropagation()
		if (window.confirm('Are you sure you wish to delete this item?')) {
			let id = tableMeta.rowData[0]
			this.props.onDeleteStoreGood(id)
		}
	}

	stringToBoolean = (val) =>  {
	  var a = {
	    'true': true,
	    'false': false
	  };
	  return a[val];
	}

	componentWillMount = () => {
		this.props.onRequestStoreGoods(parseInt(this.props.storeId))
		this.props.onRequestDistributors()
		this.props.onRequestLocations(parseInt(this.props.storeId))
		this.props.onRequestCountBies()
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
	        name: "Local Distributor",
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
				{	
	        name: "",
	        options: {
	          filter: false,
	          customBodyRender: (value, tableMeta, updateValue) => (
	          	(this.state.isEditing && tableMeta.rowData && tableMeta.rowData[0] === this.state.currentStoreGoodId ) ? (
	          		<Check style={{cursor:'pointer'}} onClick={this.handleSubmit}/>
	          	) :(
	          		<Edit style={{cursor:'pointer'}} onClick={ this.handleEdit(tableMeta) }/>
	          	)
	          )
	        }
	      },	
	      {
	        name: "",
	        options: {
	          filter: false,
	          customBodyRender: (value, tableMeta, updateValue) => (
	          	<Delete style={{cursor:'pointer'}} onClick={ (e) => this.handleDelete(tableMeta, e) }/>
	          )
	        }
	      },        	 	                       	        
		];
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
  onGetDistributors: state.distributorReducer.distributors,
  onGetCountBies: state.countByReducer.countBies,
  onGetLocations: state.locationReducer.locations,
});

const mapActionsToProps = {
  onRequestDistributors: getDistributors,
  onRequestCountBies: getCountBies,
  onRequestLocations: getLocations,	
  onRequestStoreGoods: getStoreGoods,
  onDeleteStoreGood: deleteStoreGood,
  onEditStoreGood: editStoreGood,  
};


export default connect(mapStateToProps, mapActionsToProps)(AddStoreGoodsTable);
