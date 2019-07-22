import React from "react";
import { connect } from 'react-redux'
import MenuList from '@material-ui/core/MenuList';
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getDistributors } from '../../../actions/getDistributors.action';
import { getCountBies } from '../../../actions/getCountBies.action';
import { getLocations } from '../../../actions/getLocations.action';

class StoreGoodFormDrawer extends React.Component {
  
  state = { 
    isSubmitted: false,
  	drawer: false,
  	maxAmount: '',
  	location: '',
  	localDistributor: '',
  	deliveryDay: '',
  	countBy: '',
  	replenishByEach: false
  };

  toggleDrawer(open) {
    this.setState({
      drawer: open
    });
  }  
 
 handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };  

  handleChecked = name => event => {
  	this.setState({
      [name]: event.target.checked,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ drawer: props.togglePreppedDrawer })
  }

 	componentDidMount = () => {
		this.props.onRequestDistributors()
		this.props.onRequestCountBies()
		this.props.onRequestLocations(this.props.storeId)
	}	

  render() {  
    const localDistributorMenu = this.props.onGetDistributors.map(distributor => {
      return <option key={distributor.id} value={distributor.id}>{distributor.name}</option>
    })

    const countBiesMenu = this.props.onGetCountBies.map(countBy => {
      return <option key={countBy.id} value={countBy.id}>{countBy.name}</option>
    })

    const locationsMenu = this.props.onGetLocations.map(location => {
      return <option key={location.id} value={location.id}>{location.name}</option>
    })

		const drawerMenu = (
      <div className="container">

    		<MenuList>
          <h3>Add <u>{this.props.rowData[1]}</u> To Store</h3>     
          
          <form onSubmit={this.handleSubmit}>
            <TextField
                required
                type="number"
                label="Max Amount"
                value={this.state.maxAmount}
                onChange={this.handleChange('maxAmount')}
                name="name"
                placeholder="Max Amount"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />  
            
            <TextField
                select
                label="Location"
                name="location"
                value={this.state.location}
                placeholder="Select Location"
                fullWidth
                onChange={this.handleChange('location')}
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
              {locationsMenu}
          	</TextField>


            <TextField
                select
                label="Local Distributor"
                name="localDistributor"
                value={this.state.localDistributor}
                placeholder="Select Local Distributor"
                fullWidth
                onChange={this.handleChange('localDistributor')}
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
              {localDistributorMenu}
          </TextField>

            <TextField
                select
                label="Delivery Day"
                name="deliveryDay"
                value={this.state.deliveryDay}
                placeholder="Select Delivery Day"
                fullWidth
                onChange={this.handleChange('deliveryDay')}
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
              <option key='1' value='Tuesday'>Tuesday</option>
              <option key='2' value='Friday'>Friday</option>
              <option key='3' value='Both'>Both Days</option>

          </TextField>


            <TextField
                select
                label="Count By"
                name="countBy"
                value={this.state.countBy}
                placeholder="Select Count By"
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
              { countBiesMenu }
          </TextField> 

		        <FormLabel component="legend">Assign Replenish By Each</FormLabel>
		        <FormGroup>
		          <FormControlLabel
		            control={<Checkbox checked={this.state.replenishByEach} onChange={this.handleChecked('replenishByEach')} />}
		            label="Replenish By Each"
		          />
		          </FormGroup>



           <Button type='submit' variant="contained" color="primary">
                Add To Store
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

const mapStateToProps = state => ({
  onGetDistributors: state.distributorReducer.distributors,
  onGetCountBies: state.countByReducer.countBies,
  onGetLocations: state.locationReducer.locations,
});

const mapActionsToProps = {
  onRequestDistributors: getDistributors,
  onRequestCountBies: getCountBies,
  onRequestLocations: getLocations
};


export default connect(mapStateToProps, mapActionsToProps)(StoreGoodFormDrawer);
