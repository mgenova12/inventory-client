import gql from 'graphql-tag';

export default gql`
  query getStoreGoods($id: Int!) {   
    getStoreGoods(id: $id) {
    	id
      product{
				id
        name
        barcode
        prepped
      }
      location {
        id
        name
      }
      distributor {
        id
        name
      }
      amountInStock
      countBy {
        id
        name
      }        
      maxAmount
      replenishBy
      deliveryDay 
      containerType {
        id
        name
      }         
    }

  }
`;