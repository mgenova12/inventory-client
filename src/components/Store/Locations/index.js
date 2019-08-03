import React from "react";
import LocationsTable from './LocationsTable'
import AddLocation from './AddLocation'

class Locations extends React.Component {


  render() {

    return (    
	    <div className="container-fluid"> 
	    	<AddLocation storeId={this.props.match.params.storeId}/>
	    	<LocationsTable storeId={this.props.match.params.storeId}/>
			</div>
    );
  }
}

export default Locations;
