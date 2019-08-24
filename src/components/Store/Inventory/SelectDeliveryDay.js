import React from "react";
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

class SelectDeliveryDay extends React.Component {

	state = {
		deliveryDay: '',
		deliveryDaySelected: false,
		redirect: false
	}

 handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      deliveryDaySelected: true
    });
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
    	let storeId = this.props.match.params.storeId
      return <Redirect to={{ pathname: `/store/${storeId}/Inventory/${this.state.deliveryDay}` }} />
    }
  }

  render() {

    return (    
	    <Grow in={true}>
		    <div className="center-screen"> 
		    	<h1> Select Delivery Day </h1>
	        <TextField
		        select
		        label="Delivery Day"
		        name="deliveryDay"
		        value={this.state.deliveryDay}
		        fullWidth
		        margin="normal"
		        onChange={this.handleChange('deliveryDay')}
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
		      	<option key='Tuesday' value='Tuesday'>Tuesday</option>
		      	<option key='Friday' value='Friday'>Friday</option>
	        </TextField> 
	        
	        {this.state.deliveryDaySelected &&
	        	<Grow in={true}>
		        	<div>
		        		{this.renderRedirect()}
			           <Button type='submit' variant="contained" color="primary" size="large" onClick={this.setRedirect}>
			                Start Inventory
			           </Button>
		           </div>
           	</Grow>
	        }
				</div>
      </Grow>
    );
  }
}

export default withRouter(SelectDeliveryDay);
