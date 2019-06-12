import React from 'react';

import MenuList from '@material-ui/core/MenuList';
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import TextField from '@material-ui/core/TextField';


class PreppedProductForm extends React.Component {

  state = { 
  	drawer: false
  };

  toggleDrawer(open) {
    this.setState({
      drawer: open
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ drawer: props.togglePreppedDrawer })
  }

  render() {
    const drawerMenu = (
      <div className="container">

    		<MenuList>

          <h3>Add Prepped Product Version of {this.props.rowData[1]}</h3>     
          <form onSubmit={this.handleSubmit}>
              <TextField
                  required
                  label="Product Name"
                  value={this.state.name}
                  name="name"
                  placeholder="Add Product Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />  
              <TextField
                  required
                  label="Count By"
                  value={this.state.name}
                  name="name"
                  placeholder="Add Product Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> 
              <TextField
                  required
                  label="Category"
                  value={this.state.name}
                  name="name"
                  placeholder="Add Product Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> 
              <TextField
                  required
                  label="Case Quantity"
                  value={this.state.name}
                  name="name"
                  placeholder="Add Product Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> 
              <TextField
                  required
                  label="Portion Size"
                  value={this.state.name}
                  name="name"
                  placeholder="Add Product Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />                                                 

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

export default PreppedProductForm;

