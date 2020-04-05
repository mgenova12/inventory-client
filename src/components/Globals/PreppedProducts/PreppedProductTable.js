import React from "react";
import MaterialTable from 'material-table';
import { connect } from 'react-redux'

import { getPreppedProducts } from '../../../actions/getPreppedProducts.action';
import { getCategories } from '../../../actions/getCategories.action';
import { editPreppedProduct } from '../../../actions/editPreppedProduct.action';
import { deleteProduct } from '../../../actions/deleteProduct.action';


class PreppedProductTable extends React.Component {

    componentDidMount = () => {
      this.props.onRequestPreppedProducts()
      this.props.onRequestCategories()    
    }    

  render() {
      let preppedProducts = this.props.onGetPreppedProducts
      let categories = this.props.onGetCategories.reduce((obj, item) => (obj[item.name] = item.name, obj) ,{});

    return (    
      <div> 
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />      
  
        <MaterialTable
          title="Prepped Products"
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name' },
            { title: 'Category', field: 'category',
              lookup: categories
            },
            { title: 'Portion Size', field: 'portionSize' },
            { title: 'Case Quantity', field: 'caseQuantity' },
            { title: 'Mark Up', field: 'markUp'},
            { title: 'Final Price', field: 'markedUpPrice', editable: 'never', type: "currency" },

          ]}
          data={preppedProducts}
          options={{
            paging: false,
            actionsColumnIndex: -1
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                    this.props.onEditPreppedProduct(
                      newData.id, 
                      newData.name,
                      newData.category,
                      newData.markUp,
                      newData.caseQuantity,
                      newData.portionSize
                    )
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.props.onDeleteProduct(oldData.id, true)
                }, 600);
              }), 
            }}           
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  onGetPreppedProducts: state.productReducer.preppedProducts,
  onGetCategories: state.categoryReducer.categories,
});

const mapActionsToProps = {
  onRequestPreppedProducts: getPreppedProducts,
  onRequestCategories: getCategories,
  onDeleteProduct: deleteProduct,
  onEditPreppedProduct: editPreppedProduct,
};



export default connect(mapStateToProps, mapActionsToProps)(PreppedProductTable);



