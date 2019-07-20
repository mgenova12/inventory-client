import React from "react";
import LocationsTable from './LocationsTable'

class Locations extends React.Component {


  render() {

    return (    
	    <div className="container-fluid"> 
	    	<h3>Locations for {this.props.match.params.storeId}</h3>
	    	<LocationsTable storeId={this.props.match.params.storeId}/>
			</div>
    );
  }
}

export default Locations;
