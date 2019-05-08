import React from "react";
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format'

import Notifications from '../../Common/Notifications'

import { getCategories } from '../../../actions/getCategories.action';
import { getCountBies } from '../../../actions/getCountBies.action';
import { getDistributors } from '../../../actions/getDistributors.action';
import { addProduct } from '../../../actions/addProduct.action';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

class NewProductForm extends React.Component {
	state = {
		name: '',
		distributor: '',
		countBy: '',
		category: '',
		caseQuantity: '',
		markUp: '',
		price: '',
		prepped: false,
		isSubmitted: false,
	}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };	

 	resetForm = () => {
    this.setState({name: '', distributor: '', countBy: '', category: '', caseQuantity:'', markUp: '', price: ''});
	}

  handleSubmit = (event) => {
  	event.preventDefault()
  	this.setState({isSubmitted: true})
  	const { name, distributor, category, countBy, price, markUp, caseQuantity, prepped } = this.state
  	this.props.onAddProduct(name, distributor, category, countBy, price, markUp, caseQuantity, prepped)
  	this.resetForm()
     setTimeout(function(){
           this.setState({isSubmitted: false});
      }.bind(this),2000)
  }	

  handleKeyPress = (event) => {
		if (event.which === 13) {
			event.preventDefault();
		}
  }

	componentDidMount = () => {
		this.props.onRequestCategories()
		this.props.onRequestDistributors()
		this.props.onRequestCountBies()
	}

	render(){  	
		console.log(this.state.isSubmitted)
  	const categoryMenu = this.props.onGetCategories.map(category => {
  		return <option key={category.id} value={category.id}>{category.name}</option>
  	})

  	const countByMenu = this.props.onGetCountBies.map(countBy => {
  		return <option key={countBy.id} value={countBy.id}>{countBy.name}</option>
  	})

  	const distributorMenu = this.props.onGetDistributors.map(distributor => {
  		return <option key={distributor.id} value={distributor.id}>{distributor.name}</option>
  	})

  	// const { onGetErrors } = this.props

		return (
			<div className='container'> 
				{this.state.isSubmitted && <Notifications/>}

				<h3> New Product Form </h3>
				<form onSubmit={this.handleSubmit}
				  		onKeyPress={this.handleKeyPress}
				 >
		    	<TextField
							required
		          label="Product Name"
		          value={this.state.name}
		          name="name"
		          placeholder="Add Product Name"
		          fullWidth
		          onChange={this.handleChange('name')}
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}
		        />

		    	<TextField
		    			select
		          label="Distributor"
		          name="distributor"
		          value={this.state.distributor}
		          placeholder="Select a Distributor"
		          fullWidth
		          onChange={this.handleChange('distributor')}
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}
		          required
		          SelectProps={{
		            native: true,
		          }}		          
		        >	
		        <option key='' value=''></option>
		        {distributorMenu}
		        </TextField>	

		    	<TextField
		    			select
		          label="Count By"
		          name="countBy"
		          value={this.state.countBy}
		          placeholder="Select A Count By"
		          fullWidth
		          onChange={this.handleChange('countBy')}
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}
		          required
		          SelectProps={{
		            native: true,
		          }}		          
		        >	
		        <option key='' value=''></option>
		        {countByMenu}
		        </TextField>	

		    	<TextField
		    			select
		          label="Category"
		          name="category"
		          value={this.state.category}
		          placeholder="Select a Category"
		          fullWidth
		          onChange={this.handleChange('category')}
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}
		          required
		          SelectProps={{
		            native: true,
		          }}		          
		        >
		        <option key='' value=''></option>
		        {categoryMenu}
		        </TextField>		

		    	<TextField
		          label="Case Quantity"
		          name="caseQuantity"
		          value={this.state.caseQuantity}
		          type="number"
		          placeholder="Leave Blank if Not a Case"
		          fullWidth
		          onChange={this.handleChange('caseQuantity')}
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}
		        />	

		    	<TextField
		    			required
		          label="Mark Up"
		          name="markUp"
		          type="number"
		          value={this.state.markUp}
		          placeholder="Add Mark Up"
		          fullWidth
		          onChange={this.handleChange('markUp')}
		          margin="normal"
		          variant="outlined"
		          InputLabelProps={{
		            shrink: true,
		          }}	
		          InputProps={{
		            startAdornment: <InputAdornment position="start">%</InputAdornment>,
		          }}		          
		        />	

	        <TextField
	        	required
	          label="Price"
	          variant="outlined"
	          placeholder="Add Price"
	          fullWidth
	          name="price"
	          margin="normal"
	          value={this.state.price}
	          onChange={this.handleChange('price')}
	          InputLabelProps={{
	            shrink: true,
	          }}	          
	          InputProps={{
	            inputComponent: NumberFormatCustom,
	          }}
	        />		        	        		        

			   <Button type='submit' variant="contained" color="primary">
		        	Save Product
		     </Button>
		     </form>

			</div>
			
		)
	}
}


const mapActionsToProps = {
  onRequestCategories: getCategories,
  onRequestCountBies: getCountBies,
  onRequestDistributors: getDistributors,
  onAddProduct: addProduct,
};

const mapStateToProps = state => ({
  onGetCountBies: state.countByReducer.countBies,
  onGetCategories: state.categoryReducer.categories,
  onGetDistributors: state.distributorReducer.distributors,
  onGetErrors: state.errorReducer.errors,
});


export default connect(mapStateToProps, mapActionsToProps)(NewProductForm)
