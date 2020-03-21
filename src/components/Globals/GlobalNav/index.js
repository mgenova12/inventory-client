import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import LocalPizza from '@material-ui/icons/LocalPizza';
import Restaurant from '@material-ui/icons/Restaurant';
import LocalShipping from '@material-ui/icons/LocalShipping';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Home from '@material-ui/icons/Home';
import { Link } from "react-router-dom"

class GlobalNav extends React.Component {
  state = {
  	drawer: false
  }

  toggleDrawer(open) {
    this.setState({
      drawer: open
    });
  }

  render() {

		const drawerNav = (
      <List>
          <ListItem>
            <ListItemText primary={'GLOBALS'} />
          </ListItem>
      		<Divider />
          <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to={`/`} key={'Home'}>
            <ListItemIcon><Home/> </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>          
          <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to="/globals/products" key={'Products'}>
            <ListItemIcon><Restaurant/> </ListItemIcon>
            <ListItemText primary={'Products'} />
          </ListItem>
          <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to="/globals/prepped_products" key={'Prepped Products'}>
            <ListItemIcon><LocalPizza/> </ListItemIcon>
            <ListItemText primary={'Prepped Products'} />
          </ListItem>
          <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to="/globals/distributors" key={'Distributors'}>
            <ListItemIcon><LocalShipping/> </ListItemIcon>
            <ListItemText primary={'Distributors'} />
          </ListItem>
          <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to="/globals/products/new" key={'Add Product'}>
            <ListItemIcon><AddShoppingCart/> </ListItemIcon>
            <ListItemText primary={'Add Product'} />
          </ListItem>                                      
      </List>
		)

    return (   
    	<div> 
	     <AppBar
	        position="relative"
          style={{ background: '#3f51b5' }}
	      >
	        <Toolbar>
	          <IconButton
	            color="inherit"
	            aria-label="open drawer"
	            onClick={() => this.toggleDrawer(true)}
	            edge="start"
	          >
	            <MenuIcon />
	          </IconButton>
	          <Typography style={{ textDecoration: 'none', color: 'white' }} variant="h6" component={Link} to="/" noWrap >
	            Rusticana-Globals
	          </Typography>
	        </Toolbar>
	      </AppBar>

      <Drawer 
          open={this.state.drawer}
          onClose={() => this.toggleDrawer(false)}
          variant="temporary"
          keepMounted={true}
          anchor="left"
      >
        {drawerNav}
      </Drawer>

	    </div>
    );
  }
}

export default GlobalNav;

	