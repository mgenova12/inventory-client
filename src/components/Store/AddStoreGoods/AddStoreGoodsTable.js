import React from "react";
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import { getRemovedStoreGoods } from '../../../actions/getRemovedStoreGoods.action';
import StoreGoodFormDrawer from './StoreGoodFormDrawer'

class AddStoreGoodsTable extends React.Component {
    state = {
        columns: [
          { title: 'ID', field: 'id' },
          { title: 'Name', field: 'name' },
          { title: 'Brand', field: 'brand' },
          { title: 'Prepped', field: 'prepped', type: 'boolean' },
        ],
        togglePreppedDrawer: false,
        rowData: []
    }

    componentDidMount = () => {
      this.props.onRequestRemovedStoreGoods(this.props.storeId)
    }

  render() {
    let removedStoreGoods = this.props.onGetRemovedStoreGoods
    return (    
			<div> 
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />      
	      <StoreGoodFormDrawer 
	      	togglePreppedDrawer={this.state.togglePreppedDrawer} 
	      	rowData={this.state.rowData}
	      	storeId={this.props.storeId}
	      	/>	      
        <MaterialTable
          title="Add To Store"
          columns={this.state.columns}
          data={removedStoreGoods}
          options={{
            paging: false,
            actionsColumnIndex: -1,
          }}
				  actions={[
				    {
				      icon: 'add',
				      tooltip: 'Add Product',
				      onClick: (event, rowData) => {
				      	event.stopPropagation()
				        this.setState({togglePreppedDrawer: true, rowData: rowData})
				      }
				    }
				  ]}
        />
			</div>
    );
  }
}

const mapStateToProps = state => ({
  onGetRemovedStoreGoods: state.storeGoodsReducer.removedStoreGoods,
});

const mapActionsToProps = {
  onRequestRemovedStoreGoods: getRemovedStoreGoods,
};


export default connect(mapStateToProps, mapActionsToProps)(AddStoreGoodsTable);




