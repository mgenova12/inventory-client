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
import Description from '@material-ui/icons/Description';
import LocalDining from '@material-ui/icons/LocalDining';
import LocationCity from '@material-ui/icons/LocationCity';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Print from '@material-ui/icons/Print';
import NoteAdd from '@material-ui/icons/NoteAdd';
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode';
import Home from '@material-ui/icons/Home';
import EventNote from '@material-ui/icons/EventNote';
import { Link } from "react-router-dom"

class StoreNav extends React.Component {
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
            <ListItemText primary={this.props.storeName ? `Rusticana-${this.props.storeName}` : 'Rusticana'} />
          </ListItem>
          <Divider />

          <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to={`/`} key={'Home'}>
            <ListItemIcon><Home/> </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>

          {this.props.storeType === 'Prepcenter' &&
            <a href={`/store/${this.props.storeId}/storeType/${this.props.storeType}/StoreOrders`}><ListItem onClick={() => this.toggleDrawer(false)} button key={'Store Orders'}>
              <ListItemIcon><ChromeReaderMode/> </ListItemIcon>
              <ListItemText primary={'Store Orders'} />
            </ListItem>  
            </a>
          }

          <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to={`/store/${this.props.storeId}/${this.props.storeType}/DeliveryDay`} key={'Inventory'}>
            <ListItemIcon><Description/> </ListItemIcon>
            <ListItemText primary={'Start Inventory'} />
          </ListItem> 

          <a href={`/store/${this.props.storeId}/storeType/${this.props.storeType}/Orders`}><ListItem onClick={() => this.toggleDrawer(false)} button key={'Orders'}>
            <ListItemIcon><EventNote/> </ListItemIcon>
            <ListItemText primary={'Submitted Inventory'} />
          </ListItem>                          
          </a>

          {this.props.storeType === 'Prepcenter' &&
            <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to={`/store/${this.props.storeId}/storeType/${this.props.storeType}/PrintLabels`} key={'Print Labels'}>
              <ListItemIcon><Print/> </ListItemIcon>
              <ListItemText primary={'Print Labels'} />
            </ListItem> 
          }

          <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to={`/store/${this.props.storeId}/StoreGoods`} key={'Store Goods'}>
            <ListItemIcon><LocalDining/> </ListItemIcon>
            <ListItemText primary={'Store Goods'} />
          </ListItem>

          {this.props.storeType === 'Prepcenter' &&
            <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to={`/store/${this.props.storeId}/storeType/${this.props.storeType}/AddToInventory`} key={'Adjust Inventory'}>
              <ListItemIcon><NoteAdd/> </ListItemIcon>
              <ListItemText primary={'Adjust Inventory'} />
            </ListItem>  
          }

          <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to={`/store/${this.props.storeId}/StoreGoods/Add`} key={'Add Store Goods'}>
            <ListItemIcon><AddShoppingCart/> </ListItemIcon>
            <ListItemText primary={'Add Store Goods'} />
          </ListItem>

          <ListItem onClick={() => this.toggleDrawer(false)} button component={Link} to={`/store/${this.props.storeId}/Locations`} key={'Locations'}>
            <ListItemIcon><LocationCity/> </ListItemIcon>
            <ListItemText primary={'Locations'} />
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
              {`Rusticana-${this.props.storeName}`}
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

export default StoreNav;








// import React from 'react';



// class StoreNav extends React.Component {

// 	render() {
//     return (

//       <div> 
//         <nav className="navbar navbar-expand-lg navbar-dark">
//           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <a className="navbar-brand" href="/">Rusticana-{this.props.storeName}</a>

//           <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
//             <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
//               <li className="nav-item">
//                 <a className="nav-link" href={`/store/${this.props.storeId}/StoreGoods`}>Store Goods</a>
//               </li>        
//               <li className="nav-item">
//                 <a className="nav-link" href={`/store/${this.props.storeId}/StoreGoods/Add`}>Add Store Goods</a>
//               </li>     
//               <li className="nav-item">
//                 <a className="nav-link" href={`/store/${this.props.storeId}/Locations`}>Locations</a>
//               </li>  
//               <li className="nav-item">
//                 <a className="nav-link" href={`/store/${this.props.storeId}/${this.props.storeType}/DeliveryDay`}>Inventory</a>
//               </li>  
//               <li className="nav-item">
//                 <a className="nav-link" href={`/store/${this.props.storeId}/storeType/${this.props.storeType}/Orders`}>Orders</a>
//               </li>
//               {this.props.storeType === 'Prepcenter' &&
//               <React.Fragment>
//                 <li className="nav-item">
//                   <a className="nav-link" href={`/store/${this.props.storeId}/storeType/${this.props.storeType}/StoreOrders`}>Store Orders</a>
//                 </li>  
//                 <li className="nav-item">
//                   <a className="nav-link" href={`/store/${this.props.storeId}/storeType/${this.props.storeType}/AddToInventory`}>Adjust Inventory</a>
//                 </li>    
//                 <li className="nav-item">
//                   <a className="nav-link" href={`/store/${this.props.storeId}/storeType/${this.props.storeType}/PrintLabels`}>Print Labels</a>
//                 </li>                               
//               </React.Fragment>
//               }
//             </ul>
//           </div>
//         </nav> 


//       </div>


//     );
//   }
// }

// export default StoreNav;
