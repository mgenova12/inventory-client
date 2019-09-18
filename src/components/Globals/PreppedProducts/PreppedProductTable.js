import React from 'react';
import { connect } from 'react-redux'
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Check from '@material-ui/icons/Check';
import MUIDataTable from "mui-datatables";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { finalPreppedMarkUpPrice } from "../../../utils/markUpUtils";

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { getPreppedProducts } from '../../../actions/getPreppedProducts.action';
import { getCategories } from '../../../actions/getCategories.action';

import { editPreppedProduct } from '../../../actions/editPreppedProduct.action';
import { deleteProduct } from '../../../actions/deleteProduct.action';

class PreppedProductTable extends React.Component {
	state = {
		isEditing: false,
		currentProductId: '',
		name: '',
		category: '',
		caseQuantity: '',
		portionSize: '',
		markUp: '',
		price: '',
		prepped: true,
		rowData: []
	}

	getRows = (obj) => {
	  	const categoryMenu = this.props.onGetCategories.map(category => {
	  		return <option key={category.id} value={category.name}>{category.name}</option>
	  	})		
			let formatter = new Intl.NumberFormat('en-US', {
			  style: 'currency',
			  currency: 'USD',
			});

	    let rows = []
	    for (var key in obj) {
				if(this.state.isEditing && this.state.currentProductId === obj.id && key !== 'id' && key !== 'markedUpPrice'){
					if (['category'].includes(key)) {
						var menuOption = (
						  key === 'category' ? categoryMenu : 
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
					} else	 {
						var adornment = (
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
		        } else if(key === "markedUpPrice") {
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
		console.log(tableMeta.rowData[6].substring(1))
		this.setState(prevState => ({ 
			togglePreppedDrawer: false,
			isEditing: !prevState.isEditing, 
			currentProductId: currentProductId,
			name: tableMeta.rowData[1],
			category: tableMeta.rowData[2],
			portionSize: tableMeta.rowData[3],
			caseQuantity: tableMeta.rowData[4],
			markUp:tableMeta.rowData[5].slice(0, -1),		
			price:tableMeta.rowData[6].substring(1),		
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
		let markedUpPrice = finalPreppedMarkUpPrice(parseFloat(this.state.price), parseInt(this.state.portionSize), parseInt(this.state.markUp))
		this.setState({ isEditing: false })
		this.props.onEditPreppedProduct(
			this.state.currentProductId, 
			this.state.name,
			this.state.category,
			this.state.markUp,
			this.state.caseQuantity,
			markedUpPrice,
			this.state.portionSize
		)
	}	

	handleDelete = (tableMeta, event) => {
		event.stopPropagation()
		if (window.confirm('Are you sure you wish to delete this item?')) {
			let id = tableMeta.rowData[0]
			this.props.onDeleteProduct(id, this.state.prepped)
		}
	}

	handlePreppedDrawer = tableMeta => event => {
		event.stopPropagation()
		this.setState({togglePreppedDrawer: true, rowData: tableMeta.rowData})
	}

	redirectToShow = (rowData) => {
		// let id = rowData[0];
		// if (!this.state.isEditing){
		// 	this.props.history.push(`/products/${id}`)
		// }
	}

	componentDidMount = () => {
		this.props.onRequestPreppedProducts()
		this.props.onRequestCategories()
	}	

  render() {
  	const { preppedProducts } = this.props.onGetPreppedProducts

		const columns = [
			"ID", "Name", "Category", "Portion Size", "Case Quantity", "Mark Up", "Final Price",
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
	      }	      		
		];
    
		const data = preppedProducts.map(product => {
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
      <MuiThemeProvider theme={theme}>
				<MUIDataTable
				  title={"Global Prepped Products"}
				  data={data}
				  columns={columns}
				  options={{
				    selectableRows: "none",
				    responsive: "scrollFullHeight",
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
  onGetPreppedProducts: state.productReducer,
  onGetCategories: state.categoryReducer.categories,
});

const mapActionsToProps = {
  onRequestPreppedProducts: getPreppedProducts,
  onRequestCategories: getCategories,
  onDeleteProduct: deleteProduct,
  onEditPreppedProduct: editPreppedProduct,
};


export default connect(mapStateToProps, mapActionsToProps)(PreppedProductTable);

