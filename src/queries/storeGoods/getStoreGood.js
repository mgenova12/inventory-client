import gql from 'graphql-tag';

export default gql`
  query getStoreGood($id: Int!) {   
    getStoreGood(id: $id) {
    	id
      product{
				id
        name
        barcode
        prepped
        daysTillExpire
        category{
          id
          name
        }         
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
    }

  }
`;