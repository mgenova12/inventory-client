import React from "react";
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format'

import { getCategories } from '../../../actions/getCategories.action';
import { getCountBies } from '../../../actions/getCountBies.action';
import { getDistributors } from '../../../actions/getDistributors.action';

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
	}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };	
	
	componentWillMount = () => {
		this.props.onRequestCategories()
		this.props.onRequestDistributors()
		this.props.onRequestCountBies()
	}

	render(){  	
  	const categoryMenu = this.props.onGetCategories.map(category => {
  		return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
  	})

  	const countByMenu = this.props.onGetCountBies.map(countBy => {
  		return <MenuItem key={countBy.id} value={countBy.id}>{countBy.name}</MenuItem>
  	})

  	const distributorMenu = this.props.onGetDistributors.map(distributor => {
  		return <MenuItem key={distributor.id} value={distributor.id}>{distributor.name}</MenuItem>
  	})

		return (
			<div className='container'> 
				<h3> New Product Form </h3> 
		    	<TextField
		          label="Product Name"
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
		        >	
		        <MenuItem key='' value=''></MenuItem>
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
		        >	
		        <MenuItem key='' value=''></MenuItem>
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
		        >
		        <MenuItem key='' value=''></MenuItem>
		        {categoryMenu}
		        </TextField>		

		    	<TextField
		          label="Case Quantity"
		          name="caseQuantity"
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
		          label="Mark Up"
		          name="markUp"
		          type="number"
		          placeholder="Add a Mark Up"
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
	          label="Price"
	          variant="outlined"
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

			   <Button variant="contained" color="primary" onClick={this.handleSubmit}>
		        	Save Product
		      </Button>

			</div>
			
		)
	}
}


const mapActionsToProps = {
  onRequestCategories: getCategories,
  onRequestCountBies: getCountBies,
  onRequestDistributors: getDistributors,
};

const mapStateToProps = state => ({
  onGetCountBies: state.countByReducer.countBies,
  onGetCategories: state.categoryReducer.categories,
  onGetDistributors: state.distributorReducer.distributors,
});


export default connect(mapStateToProps, mapActionsToProps)(NewProductForm)
