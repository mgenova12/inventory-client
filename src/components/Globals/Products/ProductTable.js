import React from "react";
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { getProducts } from '../../../actions/getProducts.action';
import { getDistributors } from '../../../actions/getDistributors.action';
import { getCategories } from '../../../actions/getCategories.action';
import { editProduct } from '../../../actions/product.action';
import { deleteProduct } from '../../../actions/deleteProduct.action';

import PreppedProductFormDrawer from './PreppedProductFormDrawer'

class ProductTable extends React.Component {
    state = {
        togglePreppedDrawer: false,
        rowData: [],
        isLoading: true
    }

    componentDidMount = () => {
      this.props.onRequestProducts().then(() => this.setState({isLoading: false}))
      this.props.onRequestCategories()
      this.props.onRequestDistributors()      
    }    

    handleRowClick = (event, rowData) => {
      this.props.history.push(`/globals/products/${rowData.id}`)
    }

  render() {
      let products = this.props.onGetProducts.products
      let distributors = this.props.onGetDistributors.reduce((obj, item) => (obj[item.name] = item.name, obj) ,{});
      let categories = this.props.onGetCategories.reduce((obj, item) => (obj[item.name] = item.name, obj) ,{});

    return (    
      <div> 
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />      
      <PreppedProductFormDrawer 
        togglePreppedDrawer={this.state.togglePreppedDrawer} 
        rowData={this.state.rowData}
        categories={this.props.onGetCategories}
      />

        <MaterialTable
          isLoading={this.state.isLoading}
          title="Products"
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name' },
            { 
              title: 'Distributor', 
              field: 'distributor',
              lookup: distributors,
            },
            { 
              title: 'Category', 
              field: 'category',
              lookup: categories,
            },
            { title: 'Case Quantity', field: 'caseQuantity' },
            { title: 'Mark Up', field: 'markUp'},
            { title: 'Price', field: 'price', type: "currency" },
            { title: 'Final Price', field: 'markedUpPrice', editable: 'never', type: "currency" },

          ]}
          data={products}
          options={{
            paging: false,
            actionsColumnIndex: -1
          }}  
          onRowClick={this.handleRowClick}        
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.props.onEditProduct(
                    newData.id, 
                    newData.name,
                    newData.distributor,
                    newData.category,
                    newData.price,
                    newData.markUp,
                    newData.caseQuantity,
                    false,
                  )
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.props.onDeleteProduct(oldData.id, false)
                }, 600);
              }), 
            }}
          actions={[
            {
              icon: 'add',
              tooltip: 'Add',
              onClick: (event, rowData) => {
                event.stopPropagation()
                this.setState({togglePreppedDrawer: true, rowData: rowData})                
              }
            },           
          ]}             
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  onGetProducts: state.productReducer,
  onGetCategories: state.categoryReducer.categories,
  onGetDistributors: state.distributorReducer.distributors,  
});

const mapActionsToProps = {
  onRequestProducts: getProducts,
  onRequestCategories: getCategories,
  onRequestDistributors: getDistributors,  
  onDeleteProduct: deleteProduct,
  onEditProduct: editProduct,
};


export default connect(mapStateToProps, mapActionsToProps)(withRouter(ProductTable));



