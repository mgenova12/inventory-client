import React from "react";
import LocationsTable from './LocationsTable'
import AddLocation from './AddLocation'

class Locations extends React.Component {


  render() {

    return (    
	    <div className="container-fluid"> 
	    	<h5>Locations</h5>
	    	<AddLocation storeId={this.props.match.params.storeId}/>
	    	<LocationsTable storeId={this.props.match.params.storeId}/>
			</div>
    );
  }
}

export default Locations;
