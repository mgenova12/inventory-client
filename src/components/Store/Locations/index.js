import React from "react";
import LocationsTable from './LocationsTable'

class Locations extends React.Component {


  render() {

    return (    
	    <div className="container-fluid"> 
	    	<h3>Locations for {this.props.match.params.storeId}</h3>
	    	<LocationsTable/>
			</div>
    );
  }
}

export default Locations;
