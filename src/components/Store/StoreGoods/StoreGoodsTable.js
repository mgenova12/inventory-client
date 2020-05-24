import React from "react";
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import { getStoreGoods } from '../../../actions/getStoreGoods.action';
import { deleteStoreGood } from '../../../actions/deleteStoreGood.action';
import { editStoreGood } from '../../../actions/editStoreGood.action';
import { getDistributors } from '../../../actions/getDistributors.action';
import { getCountBies } from '../../../actions/getCountBies.action';
import { getLocations } from '../../../actions/getLocations.action';

class StoreGoodsTable extends React.Component {
  state = {
    isLoading: true
  }

  componentDidMount = () => {
    this.props.onRequestStoreGoods(parseInt(this.props.storeId)).then(() => this.setState({isLoading: false})) 
    this.props.onRequestLocations(parseInt(this.props.storeId))
    this.props.onRequestDistributors()
    this.props.onRequestCountBies()
  }    

  render() {
    const storeGoods = this.props.onGetStoreGoods
    let distributors = this.props.onGetDistributors.reduce((obj, item) => (obj[item.name] = item.name, obj) ,{});
    let countBies = this.props.onGetCountBies.reduce((obj, item) => (obj[item.name] = item.name, obj) ,{}); 
    let locations = this.props.onGetLocations.reduce((obj, item) => (obj[item.name] = item.name, obj) ,{}); 
       
    return (    
			<div> 
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />      
        <MaterialTable
          isLoading={this.state.isLoading}
          title="Store Goods"
          columns={[
              { title: 'ID', field: 'id', editable: 'never' },
              { title: 'Name', field: 'product', editable: 'never' },
              { title: 'Location', field: 'location',
                lookup: locations 
              },
              { title: 'Local Distributor', field: 'distributor',
                lookup: distributors
              },
              { title: 'Amount In Stock', field: 'amountInStock' },
              { title: 'Count By', field: 'countBy',
                lookup: countBies
              },
              { title: 'Max Amount', field: 'maxAmount' },
              { title: 'Replenish By', field: 'replenishBy',
                lookup: countBies
              },
              { title: 'Delivery Day', field: 'deliveryDay',
                lookup: {'Tuesday': 'Tuesday', 'Friday': 'Friday', 'Both': 'Both'}
              },
          ]}
          data={storeGoods}
          options={{
            paging: false,
            actionsColumnIndex: -1
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.props.onEditStoreGood(
                    newData.id, 
                    newData.location,
                    newData.distributor,
                    newData.countBy,
                    newData.maxAmount,
                    newData.replenishBy,
                    newData.deliveryDay,
                    newData.amountInStock
                  )
                }, 600);
              }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                this.props.onDeleteStoreGood(oldData.id)
              }, 600);
            }),        
            }}
        />
			</div>
    );
  }
}

const mapStateToProps = state => ({
  onGetStoreGoods: state.storeGoodsReducer.storeGoods,
  onGetDistributors: state.distributorReducer.distributors,
  onGetCountBies: state.countByReducer.countBies,
  onGetLocations: state.locationReducer.locations,
});

const mapActionsToProps = {
  onRequestDistributors: getDistributors,
  onRequestCountBies: getCountBies,
  onRequestLocations: getLocations,	
  onRequestStoreGoods: getStoreGoods,
  onDeleteStoreGood: deleteStoreGood,
  onEditStoreGood: editStoreGood,  
};


export default connect(mapStateToProps, mapActionsToProps)(StoreGoodsTable);



