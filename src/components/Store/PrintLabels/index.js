import React from "react";
import PrintLabelsTable from './PrintLabelsTable'
import './index.css';


class PrintLabels extends React.Component {

  render() {
    return (    
	    <div> 
	    	<PrintLabelsTable storeId={this.props.match.params.storeId}/>			
			</div>
    );
  }
}

export default PrintLabels;
