import React from "react";
import { connect } from 'react-redux'
import { getProduct } from '../../../actions/getProduct.action';
import TextField from '@material-ui/core/TextField';
import { getDistributors } from '../../../actions/getDistributors.action';
import { getCategories } from '../../../actions/getCategories.action';
import NumberFormat from 'react-number-format'
import Edit from '@material-ui/icons/Edit';

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

class ProductShow extends React.Component {
  state = {
    isEditing: false,
    distributor: '',
    category: '',
    caseQuantity: '',
    markUp: '',
    price: '',
    barcode:'',
    description: '',
    distributorNumber: '',
    brand: '',
    unitSize: ''
  }

  handleEdit = () => {
    this.setState({isEditing: !this.state.isEditing}) 
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount = () => {
    this.props.onRequestProduct(this.props.match.params.id)
    this.props.onRequestCategories()
    this.props.onRequestDistributors()    
  } 
 
	render() {
      const {product} = this.props.onGetProduct
      const {isEditing} = this.state
      const categoryMenu = this.props.onGetCategories.map(category => {
        return <option key={category.id} value={category.name}>{category.name}</option>
      })
      const distributorMenu = this.props.onGetDistributors.map(distributor => {
        return <option key={distributor.id} value={distributor.name}>{distributor.name}</option>      
      })
	    return (
  			<div>
         {product && (
          <div className="container"> 
            <h1 align="center"> {product.name} </h1> 
            <div align="center"> 
              {product.documents.map(img => 
                  <img key={img.id} width="150" height="150" alt="" src={`${process.env.REACT_APP_API_URL}${img.document}`}/>
              )}
            </div>
            
            <div> 
              <h2>Product Details <Edit style={{cursor:'pointer'}} onClick={() => this.handleEdit()}/></h2> 
              <hr/>
            </div>
            
            {
              !isEditing ?
            <ul>
              <li>Distributor: {product.distributor.name} </li>
              <li>Category: {product.category.name}</li>
              <li>Case Quantity: {product.caseQuantity}</li>
              <li>Price: ${product.price}</li>
              <li>Mark Up: {product.markUp}</li>
              <li>Barcode: {product.barcode}</li>
              <li>Brand: {product.brand}</li>
              <li>Unit Size: {product.unitSize}</li>
              <li>Destributor Number: {product.distributorNumber}</li>
              <li>Description: {product.description}</li>
            </ul> 

            :

            <ul>
            <li>
              <TextField
                select
                  label="Distributor"
                  name="distributor"
                  defaultValue={product.distributor.name}
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
            </li>
            <li>
              <TextField
                  select
                  label="Category"
                  name="category"
                  defaultValue={product.category.name}
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
              </li>
              <li><TextField label="Case Quantity" fullWidth value={product.caseQuantity} /></li>
              <li>
                <TextField
                  required
                  value={product.price}
                  label="Price"
                  placeholder="Add Price"
                  fullWidth
                  name="price"
                  margin="normal"
                  onChange={this.handleChange('price')}
                  InputLabelProps={{
                    shrink: true,
                  }}            
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />                
              </li>
              <li><TextField label="Mark Up" fullWidth value={product.markUp}/></li>
              <li><TextField label="Barcode" fullWidth value={product.barcode}/></li>
              <li><TextField label="Brand" fullWidth value={product.brand}/></li>
              <li><TextField label="Unit Size" fullWidth value={product.unitSize}/></li>
              <li><TextField label="Destributor Number" fullWidth value={product.distributorNumber}/></li>
              <li><TextField label="Description" fullWidth value={product.description}/></li>
            </ul>             


            }
          </div>
         )}
  			</div>  
	    )
	}

}

const mapStateToProps = state => ({
  onGetProduct: state.productReducer,
  onGetCategories: state.categoryReducer.categories,
  onGetDistributors: state.distributorReducer.distributors,    
 
});

const mapActionsToProps = {
  onRequestProduct: getProduct,
  onRequestCategories: getCategories,
  onRequestDistributors: getDistributors,  
};

export default connect(mapStateToProps, mapActionsToProps)(ProductShow);
