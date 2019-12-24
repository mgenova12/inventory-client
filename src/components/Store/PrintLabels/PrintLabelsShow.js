import React from "react";
import { connect } from 'react-redux'
import { getStoreGood } from '../../../actions/getStoreGood.action';
import Barcode from 'react-barcode'
import Button from '@material-ui/core/Button';
import './index.css';

class PrintLabelsShow extends React.Component {

	getUsebyDate = (daysTillExpire) => {
	  const result = new Date();
	  result.setDate(result.getDate() + daysTillExpire);
	  return result.toLocaleDateString();
	}

	showRefrigeratedLabel = (category) => {
		if(category !== 'Dry'){
			return 'KEEP REFRIGERATED'
		}
	}

  componentDidMount = () => {
    this.props.onRequestStoreGood(parseInt(this.props.match.params.productId))
  }   

  render() {
  	const storeGood = this.props.onGetStoreGood
  	
  	if(storeGood){
	  	const today = new Date();
	  	var currentDate = today.toLocaleString()
  	}
    return (    
	    <div> 
    		<script src="https://cdn.jsdelivr.net/jsbarcode/3.3.20/JsBarcode.all.min.js"></script>
		    {storeGood && (
		    <div>	
		    	<div className='label'>
			    	<h3><span> {storeGood.product.name}</span> </h3>
			    	<h4> {currentDate} </h4>
			    	<h4> CATEGORY: {storeGood.product.category.name} </h4>
			    	<h4> DAYS TILL EXPIRE: {storeGood.product.daysTillExpire} </h4>
			    	<h4> USE BY DATE: {this.getUsebyDate(storeGood.product.daysTillExpire)} </h4>
			    	<h4> POST THAW ________________________ </h4>
			    	<h4>{this.showRefrigeratedLabel(storeGood.product.category.name)} </h4>
			    	<div className='barcode'> <Barcode value={storeGood.product.barcode} height={50} /> </div>
		    	</div>
		    	
		    	<div className="print-button">
         		<Button variant="contained" color="primary" onClick={() => window.print()}> Print Label </Button> 
         	</div>

         </div>
				)}
			</div>
    );
  }
}

const mapStateToProps = state => ({
	onGetStoreGood: state.storeGoodsReducer.storeGood,
});

const mapActionsToProps = {
	onRequestStoreGood: getStoreGood
};

export default connect(mapStateToProps, mapActionsToProps)(PrintLabelsShow);
