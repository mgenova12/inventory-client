import React from 'react';
import { connect } from 'react-redux'
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Check from '@material-ui/icons/Check';
import AddCircle from '@material-ui/icons/AddCircle';
import MUIDataTable from "mui-datatables";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import PreppedProductForm from '../PreppedProductForm'

import { getProducts } from '../../../actions/getProducts.action';
import { getDistributors } from '../../../actions/getDistributors.action';
import { getCategories } from '../../../actions/getCategories.action';

import { editProduct } from '../../../actions/editProduct.action';
import { deleteProduct } from '../../../actions/deleteProduct.action';

class ProductTable extends React.Component {
	state = {
		isEditing: false,
		currentProductId: '',
		name: '',
		distributor: '',
		category: '',
		caseQuantity: '',
		markUp: '',
		price: '',
		prepped: false,
		togglePreppedDrawer: false,
		rowData: []
	}

	getRows = (obj) => {
	  	const categoryMenu = this.props.onGetCategories.map(category => {
	  		return <option key={category.id} value={category.name}>{category.name}</option>
	  	})
	  	const distributorMenu = this.props.onGetDistributors.map(distributor => {
	  		return <option key={distributor.id} value={distributor.name}>{distributor.name}</option>
	  	})			
			let formatter = new Intl.NumberFormat('en-US', {
			  style: 'currency',
			  currency: 'USD',
			});

	    let rows = []
	    for (var key in obj) {
				if(this.state.isEditing && this.state.currentProductId === obj.id && key !== 'id'){
					if (['category', 'distributor'].includes(key)) {
						var menuOption = (
						  key === 'category' ? categoryMenu : 
						  key === 'distributor' ? distributorMenu : 
						  null 
						);						
	    			rows.push(
				    	<TextField
				    		select
				    		onChange={this.handleChange(key)}
				    		defaultValue={obj[key] ? obj[key].name : ''}
			          SelectProps={{
			            native: true,
			          }}				                 
				        >		
				        <option> </option>			        
				        {menuOption}
				      </TextField>	
			       )
					} else {
						var adornment = (
							key === 'price' ? {position:'startAdornment', symbol: '$'} :
							key === 'markUp' ? {position:'endAdornment', symbol: '%'} :
							''
						)
		    		rows.push(
		    				<TextField 
		    					value={this.state[key]} 
		    					onChange={this.handleChange(key)}
				          InputProps={{
				            [adornment.position]: <InputAdornment>{adornment.symbol}</InputAdornment>,
				          }}
		    					/>
		    		)
	    		}

				} else {
			    if (!obj[key]) {
							rows.push('');
		    		} else if (typeof obj[key] === "object") {
		           rows.push(obj[key].name)   
		        } else if (key === "markUp") {
		        	rows.push(`${obj[key]}%`)
		        } else if(key === "price") {
		        	rows.push(formatter.format(obj[key]))
		        } else {
		          rows.push(obj[key]);    
		        } 
				}    
			}
	    return rows
	}

	handleEdit = tableMeta => event  => {
		event.stopPropagation()
		let currentProductId = tableMeta.rowData[0]
		this.setState(prevState => ({ 
			togglePreppedDrawer: false,
			isEditing: !prevState.isEditing, 
			currentProductId: currentProductId,
			name: tableMeta.rowData[1],
			distributor: tableMeta.rowData[2],
			category: tableMeta.rowData[3],
			caseQuantity: tableMeta.rowData[4],
			markUp:tableMeta.rowData[5].slice(0, -1),		
			price:tableMeta.rowData[6].substring(1)			
		}))
	}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

	handleSubmit = event => {
		event.preventDefault()
		event.stopPropagation()
		this.setState({ isEditing: false })
		this.props.onEditProduct(
			this.state.currentProductId, 
			this.state.name,
			this.state.distributor,
			this.state.category,
			this.state.price,
			this.state.markUp,
			this.state.caseQuantity,
			this.state.prepped,
		)
	}	

	handleDelete = (tableMeta, event) => {
		event.stopPropagation()
		if (window.confirm('Are you sure you wish to delete this item?')) {
			this.setState({togglePreppedDrawer: false})
			let id = tableMeta.rowData[0]
			this.props.onDeleteProduct(id)
		}
	}

	handlePreppedDrawer = tableMeta => event => {
		event.stopPropagation()
		this.setState({togglePreppedDrawer: true, rowData: tableMeta.rowData})
	}

	redirectToShow = (rowData) => {
		let id = rowData[0];
		if (!this.state.isEditing){
			this.props.history.push(`/products/${id}`)
		}
	}

	componentWillMount = () => {
		this.props.onRequestProducts()
		this.props.onRequestCategories()
		this.props.onRequestDistributors()
	}	

  render() {
  	const { products } = this.props.onGetProducts

		const columns = [
			"ID", "Name", "Distributor", 
			"Category", "Case Quantity", "Mark Up", "Price",
				{
	        name: "",
	        options: {
	          filter: false,
	          customBodyRender: (value, tableMeta, updateValue) => (
	          	(this.state.isEditing && tableMeta.rowData && tableMeta.rowData[0] === this.state.currentProductId ) ? (
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
	      {
	        name: "",
	        options: {
	          filter: false,
	          customBodyRender: (value, tableMeta, updateValue) => (
	          	<AddCircle style={{cursor:'pointer'}} onClick={ this.handlePreppedDrawer(tableMeta) }/>
	          )
	        }
	      },		      		
		];
    
		const data = products.map(product => {
		  	return this.getRows(product)
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

      <div>
      <PreppedProductForm togglePreppedDrawer={this.state.togglePreppedDrawer} rowData={this.state.rowData}/>
      <MuiThemeProvider theme={theme}>
				<MUIDataTable
				  title={"Global Products"}
				  data={data}
				  columns={columns}
				  options={{
				    selectableRows: false,
				    responsive: "scroll",
				    rowsPerPage: 100,
				    onRowClick: rowData => this.redirectToShow(rowData)
				  }}		  
				/>     	
				</MuiThemeProvider>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  onGetProducts: state.productReducer,
  onGetCategories: state.categoryReducer.categories,
  onGetDistributors: state.distributorReducer.distributors,  
});

const mapActionsToProps = {
  onRequestProducts: getProducts,
  onRequestCategories: getCategories,
  onRequestDistributors: getDistributors,  
  onDeleteProduct: deleteProduct,
  onEditProduct: editProduct,
};


export default connect(mapStateToProps, mapActionsToProps)(ProductTable);

