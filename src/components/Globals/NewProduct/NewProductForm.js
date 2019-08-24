import React from "react";
import "./index.css";
import { connect } from 'react-redux'
// import StyledDropzone from '../../Common/StyledDropzone'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import { finalMarkUpPrice } from "../../../utils/markUpUtils";	

import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format'
import Notifications from '../../Common/Notifications'
import { getCategories } from '../../../actions/getCategories.action';
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
   getInitialState = () => {
     const initialState = {
			name: '',
			distributor: '',
			category: '',
			caseQuantity: '',
			markUp: '',
			price: '',
			prepped: false,
			barcode:'',
			description: '',
			distributorNumber: '',
			brand: '',
			unitSize: '',
			isSubmitted: false,
			imgs: []        
     };
     return initialState;
 	}	

	state = this.getInitialState();

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };	

 	resetForm = () => {
 		this.setState(this.getInitialState());
	}

  handleSubmit = (event) => {
  	event.preventDefault()
  	this.setState({isSubmitted: true})
  	const { name, distributor, category, price, markUp, caseQuantity, prepped, barcode, description, distributorNumber, brand, unitSize, imgs } = this.state
  	let markedUpPrice = finalMarkUpPrice(parseInt(price), parseInt(markUp))
  	this.props.onAddProduct(name, distributor, category, price, markUp, caseQuantity, prepped, barcode, description, distributorNumber, brand, unitSize, imgs, markedUpPrice)
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

	generateBarcode = () => {
		let barcode = Math.floor(Math.random() * 9000000000) + 1000000000;
		this.setState({barcode: barcode})
	}

	getBase64 = (files) => {
		files.forEach(file => {
	   var reader = new FileReader();
	   reader.readAsDataURL(file);
	   reader.onload = function () {
	   		var joined = this.state.imgs.concat(reader.result);
				this.setState({ imgs: joined })
	   }.bind(this);
	   reader.onerror = function (error) {
	     console.log('Error: ', error);
	   };
		})
	}

	componentDidMount = () => {
		this.props.onRequestCategories()
		this.props.onRequestDistributors()
	}

	render(){  	
	  	const categoryMenu = this.props.onGetCategories.map(category => {
	  		return <option key={category.id} value={category.id}>{category.name}</option>
	  	})
	  	const distributorMenu = this.props.onGetDistributors.map(distributor => {
	  		return <option key={distributor.id} value={distributor.id}>{distributor.name}</option>
	  	})
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
		          placeholder="Leave Blank If Not Case"
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

					<TextField
					  placeholder="Add Brand"
					  variant="outlined"
					  margin="normal"
					  label="Brand"
					  fullWidth
					  value={this.state.brand}
					  onChange={this.handleChange('brand')}
	          InputLabelProps={{
	            shrink: true,
	          }}					  
					/>

					<TextField
					  placeholder="Add Unit Size"
					  variant="outlined"
					  margin="normal"
					  label="Unit Size"
					  fullWidth
					  value={this.state.unitSize}
					  onChange={this.handleChange('unitSize')}
	          InputLabelProps={{
	            shrink: true,
	          }}					  
					/>

					<TextField
					  placeholder="Add Distributor ID Number"
					  variant="outlined"
					  type="number"
					  margin="normal"
					  label="Distributor Number"
					  fullWidth
					  value={this.state.distributorNumber}
					  onChange={this.handleChange('distributorNumber')}
	          InputLabelProps={{
	            shrink: true,
	          }}					  
					/>				

					<TextField
					  placeholder="Add or Generate Barcode"
					  variant="outlined"
					  type="number"
					  margin="normal"
					  label="Barcode"
					  fullWidth
					  value={this.state.barcode}
					  onChange={this.handleChange('barcode')}
	          InputLabelProps={{
	            shrink: true,
	          }}		
	          InputProps={{
	            endAdornment: 
		            <InputAdornment>
		            	<IconButton style={{ outline: 'none' }} onClick={this.generateBarcode}>
		            		<AddBox/>
		            	</IconButton>
		            </InputAdornment>,
	          }}          			  
					/>							

					<TextField
					  placeholder="Add Description"
					  variant="outlined"
					  margin="normal"
					  label="Description"
					  fullWidth
					  value={this.state.description}
					  onChange={this.handleChange('description')}
					  multiline={true}
					  rows={3}
					  rowsMax={5}
	          InputLabelProps={{
	            shrink: true,
	          }}					  
					/>
					
					{/* <StyledDropzone imgs={this.getBase64} isSubmitted={this.state.isSubmitted}/>*/}

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
  onRequestDistributors: getDistributors,
  onAddProduct: addProduct,
};

const mapStateToProps = state => ({
  onGetCategories: state.categoryReducer.categories,
  onGetDistributors: state.distributorReducer.distributors,
});


export default connect(mapStateToProps, mapActionsToProps)(NewProductForm)
