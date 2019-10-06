import React from "react";
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import { getStoreGoods } from '../../../actions/getStoreGoods.action';
import { deleteStoreGood } from '../../../actions/deleteStoreGood.action';
import { editStoreGood } from '../../../actions/editStoreGood.action';
import { getDistributors } from '../../../actions/getDistributors.action';
import { getCountBies } from '../../../actions/getCountBies.action';
import { getLocations } from '../../../actions/getLocations.action';

class AddToInventoryTable extends React.Component {
    state = {
        columns: [
          { title: 'ID', field: 'id', editable: 'never' },
          { title: 'Name', field: 'product', editable: 'never' },
          { title: 'Location', field: 'location',
            lookup: {}  
          },
          { title: 'Local Distributor', field: 'distributor',
            lookup: {}
          },
          { title: 'Amount In Stock', field: 'amountInStock' },
          { title: 'Count By', field: 'countBy',
            lookup: {}
          },
          { title: 'Max Amount', field: 'maxAmount' },
          { title: 'Replenish By', field: 'replenishBy',
            lookup: {}
          },
          { title: 'Delivery Day', field: 'deliveryDay',
            lookup: {'Tuesday': 'Tuesday', 'Friday': 'Friday', 'Both': 'Both'}
          },
        ],
        data: [],
    }

    getLookups = () => {
      this.state.columns.forEach((column, idx) => {
        if(column.field === 'distributor'){
          this.props.onGetDistributors.forEach(distributor => { 
            const newColumns = [...this.state.columns]
            newColumns[3].lookup[distributor.name] = distributor.name
          })
        } else if (column.field === 'location'){
          this.props.onGetLocations.forEach(location => { 
            const newColumns = [...this.state.columns]
            newColumns[2].lookup[location.name] = location.name
          }) 
        } else if (column.field === 'countBy'){
          this.props.onGetCountBies.forEach(countBy => { 
            const newColumns = [...this.state.columns]
            newColumns[5].lookup[countBy.name] = countBy.name            
          })
        } else if (column.field === 'replenishBy'){
          this.props.onGetCountBies.forEach(countBy => { 
            const newColumns = [...this.state.columns]
            newColumns[7].lookup[countBy.name] = countBy.name            
          })
        }
      })
    }

    getRows = (storeGoods) => {
      this.getLookups()
      const flattenObject = (obj) => {
        const flattened = {}
        Object.keys(obj).forEach((key) => {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            flattened[key] = obj[key].name
          } else {
            flattened[key] = obj[key]
          }
        })
        const data = [...this.state.data];
        data.push(flattened);
        this.setState({ ...this.state, data });
      }       
        storeGoods.forEach(storeGood => {  
          flattenObject(storeGood)       
        })
    }

    componentDidMount = () => {
      this.props.onRequestStoreGoods(parseInt(this.props.storeId)).then(() => this.getRows(this.props.onGetStoreGoods))
      this.props.onRequestLocations(parseInt(this.props.storeId))
      this.props.onRequestDistributors()
      this.props.onRequestCountBies()
    }    

  render() {
    
    return (    
			<div> 
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />      
        <MaterialTable
          title="Add To Inventory"
          columns={this.state.columns}
          data={this.state.data}
          options={{
            paging: false,
            actionsColumnIndex: -1,
            searchFieldStyle: {
              width: '100vh',
              fontSize: 35,
              marginRight: '50vh'
            }
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data[data.indexOf(oldData)] = newData;
                  this.setState({ ...this.state, data });
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
                const data = [...this.state.data];
                data.splice(data.indexOf(oldData), 1);
                this.setState({ ...this.state, data });
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


export default connect(mapStateToProps, mapActionsToProps)(AddToInventoryTable);



