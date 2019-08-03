import React from "react";
import Button from '@material-ui/core/Button';

import ManagementList from './ManagementList'
import StoreList from './StoreList'

class HomeList extends React.Component {


  render() {
    return (    
	    <div className="container"> 
	    	<ManagementList/>
	      <StoreList/>
	      <br/>
	      <a href="/stores/new">
	      	<Button variant="contained" color="primary">
	        	Add Store
	      	</Button>
	      </a>

		</div>
    );
  }
}

export default HomeList;
