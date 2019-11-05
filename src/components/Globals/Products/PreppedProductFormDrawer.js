import React from 'react';
import { connect } from 'react-redux'
import MenuList from '@material-ui/core/MenuList';
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import { finalPreppedMarkUpPrice } from "../../../utils/markUpUtils";

import { addProduct } from '../../../actions/addProduct.action';

class PreppedProductFormDrawer extends React.Component {

  state = { 
    isSubmitted: false,
  	drawer: false,
    prepped: true,
    name: '',
    category: '',
    caseQuantity: '',
    portionSize: '',
    markUp: '',
    barcode: '',
    description: '',
    daysTillExpire: ''
  };

  toggleDrawer(open) {
    this.setState({
      drawer: open
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({isSubmitted: true, drawer: false})
    const { name, category, markUp, caseQuantity, prepped, barcode, description, portionSize, daysTillExpire} = this.state
    let markedUpPrice = finalPreppedMarkUpPrice(parseFloat(this.props.rowData[6].substring(1)), parseInt(portionSize), parseInt(markUp))
    this.props.onAddProduct(name, null, category, null, markUp, caseQuantity, prepped, barcode, description, null, null, null, [], markedUpPrice, portionSize, daysTillExpire)
  } 

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };  

  generateBarcode = () => {
    let barcode = Math.floor(Math.random() * 9000000000) + 1000000000;
    this.setState({barcode: barcode})
  }  

  componentWillReceiveProps(props) {
    this.setState({ drawer: props.togglePreppedDrawer })
  }

  render() {
    
    const categoryMenu = this.props.categories.map(category => {
      return <option key={category.id} value={category.id}>{category.name}</option>
    })

    const drawerMenu = (
      <div className="container">

    		<MenuList>

          <h3>Add Prepped Product Version of {this.props.rowData[1]}</h3>     
          <form onSubmit={this.handleSubmit}>
            <TextField
                required
                label="Prepped Name"
                value={this.state.name}
                onChange={this.handleChange('name')}
                name="name"
                placeholder="Add Prepped Name"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />  
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
                  type="number"
                  label="Portion Size"
                  value={this.state.portion_size}
                  onChange={this.handleChange('portionSize')}
                  name="portionSize"
                  placeholder="Add Portion Size"
                  fullWidth
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
                  select
                  label="Days Till Expire"
                  name="daysTillExpire"
                  value={this.state.daysTillExpire}
                  placeholder="Select a Day Till Expire"
                  fullWidth
                  onChange={this.handleChange('daysTillExpire')}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  SelectProps={{
                    native: true,
                  }}              
                >
                <option key='' value=''></option>
                <option key='7' value='7'>7 Days</option>
                <option key='14' value='14'>14 Days</option>
                <option key='30' value='30'>30 Days</option>

              </TextField>

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

           <Button type='submit' variant="contained" color="primary">
                Save Product
           </Button>                               
          </form>
    		</MenuList>

      </div>
    );

    return (
      <div>
        <Drawer
          open={this.state.drawer}
          onClose={() => this.toggleDrawer(false)}
          variant="temporary"
          keepMounted={true}
          anchor="right"
        >
          <div
            tabIndex={0}
            role="button"
          >
            {drawerMenu}
          </div>
        </Drawer>

      </div>
    );
  }
}

const mapActionsToProps = {
  onAddProduct: addProduct,
};


export default connect(null, mapActionsToProps)(PreppedProductFormDrawer);

