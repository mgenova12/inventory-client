import gql from 'graphql-tag';

export default gql`
  query getStoreGoods($id: Int!) {   
    getStoreGoods(id: $id) {
    	id
      product{
				id
        name
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