import gql from 'graphql-tag';

export default gql`
  query storeOrders {   
    storeOrders {
			id
	    deliveryDate
	    status			
			orders{
	      id
	      storeId
	      status
	      store{
	        id
	        name
	        inventories{
	          id
	          quantityNeeded
	        }	        
	      }
	    }
    }

  }
`;