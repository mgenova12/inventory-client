import React from "react";
import LocationsTable from './LocationsTable'

class Locations extends React.Component {


  render() {

    return (    
	    <div className="container-fluid"> 
	    	<h5>Locations</h5>
	    	<LocationsTable storeId={this.props.match.params.storeId}/>
			</div>
    );
  }
}

export default Locations;
