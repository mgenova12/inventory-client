import React from "react";
import { connect } from 'react-redux'
import { getStoreGood } from '../../../actions/getStoreGood.action';
import JsBarcode from "jsbarcode";

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
    JsBarcode(".barcode").init();
  }   

  render() {
  	const storeGood = this.props.onGetStoreGood
  	
  	if(storeGood){
	  	const today = new Date();
	  	var currentDate = today.toLocaleString()
  	}
    return (    
	    <div> 
    		<script src="JsBarcode.all.min.js"></script>
		    {storeGood && (
		    	<div>
			    	<h3> {storeGood.product.name} </h3>
			    	<h4> {currentDate} </h4>
			    	<h4> CATEGORY: {storeGood.product.category.name} </h4>
			    	<h4> DAYS TILL EXPIRE: {storeGood.product.daysTillExpire} </h4>
			    	<h4> USE BY DATE: {this.getUsebyDate(storeGood.product.daysTillExpire)} </h4>
			    	<h4> POST THAW ________________________ </h4>
			    	<h4>{this.showRefrigeratedLabel(storeGood.product.category.name)} </h4>
			    	<h4> {storeGood.product.barcode} </h4>
			      <svg
			        class="barcode"
			        jsbarcode-format="CODE128"
			        jsbarcode-value={this.props.value}
			        jsbarcode-textmargin="0"
			        jsbarcode-fontoptions="bold"
			      />

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
