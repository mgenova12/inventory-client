import React from "react";
import AddDistributor from "./AddDistributor"
import DistributorTable from "./DistributorTable"

class Distributors extends React.Component {

  render() {
    return (    
	    <div> 
	    	<AddDistributor/>
	    	<DistributorTable/>
			</div>
    );
  }
}

export default Distributors;
