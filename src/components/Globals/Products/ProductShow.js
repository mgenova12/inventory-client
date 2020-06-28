import React from "react";
import { connect } from 'react-redux'
import { getProduct } from '../../../actions/getProduct.action';
import TextField from '@material-ui/core/TextField';
import { getDistributors } from '../../../actions/getDistributors.action';
import { getCategories } from '../../../actions/getCategories.action';
import { editProduct } from '../../../actions/product.action';
import NumberFormat from 'react-number-format'
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

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
    productId: '',
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
    unitSize: '',
    prepped: false
  }

  handleEdit = (product) => {
    this.setState({
      isEditing: !this.state.isEditing,
      productId: product.id,
      name: product.name,
      distributor: product.distributor.name,
      category: product.category.name,
      price: product.price,
      markUp: product.markUp,
      caseQuantity: product.caseQuantity,
      description: product.description,
      unitSize: product.unitSize,
      brand: product.brand,
      distributorNumber: product.distributorNumber,
      barcode: product.barcode,
    }) 
  }

  handleSave = () => {
    this.props.onEditProduct(
      this.state.productId, 
      this.state.name,
      this.state.distributor,
      this.state.category,
      this.state.price,
      this.state.markUp,
      this.state.caseQuantity,
      this.state.prepped,
      this.state.description,
      this.state.unitSize,
      this.state.brand,
      this.state.distributorNumber,
      this.state.barcode,
    )
    window.location.reload();
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
            
            <div className="d-inline-block"> 
              <h2>Product Details <Edit style={{cursor:'pointer'}} onClick={() => this.handleEdit(product)}/></h2> 
            </div>


            <hr/>
            
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
            <form onSubmit={this.handleSave}>
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
              <li><TextField label="Case Quantity" fullWidth defaultValue={product.caseQuantity} onChange={this.handleChange('caseQuantity')}/></li>
              <li>
                <TextField
                  required
                  defaultValue={product.price}
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
              <li><TextField label="Mark Up" fullWidth defaultValue={product.markUp} onChange={this.handleChange('markUp')}/></li>
              <li><TextField label="Barcode" fullWidth defaultValue={product.barcode} onChange={this.handleChange('barcode')}/></li>
              <li><TextField label="Brand" fullWidth defaultValue={product.brand} onChange={this.handleChange('brand')}/></li>
              <li><TextField label="Unit Size" fullWidth defaultValue={product.unitSize} onChange={this.handleChange('unitSize')}/></li>
              <li><TextField label="Destributor Number" fullWidth defaultValue={product.distributorNumber} onChange={this.handleChange('distributorNumber')}/></li>
              <li><TextField label="Description" fullWidth defaultValue={product.description} onChange={this.handleChange('description')}/></li>
            </ul>             

             <Button type='submit' variant="contained" color="primary">
                  Save Product
             </Button>
             </form>


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
  onEditProduct: editProduct,
  onRequestProduct: getProduct,
  onRequestCategories: getCategories,
  onRequestDistributors: getDistributors,  
};

export default connect(mapStateToProps, mapActionsToProps)(ProductShow);
