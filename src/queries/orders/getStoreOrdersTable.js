import gql from 'graphql-tag';

export default gql`
  query storeOrders {   
    storeOrders {
			id
	    deliveryDate
	    status
	    updatedAt
			orders{
	      id
	      storeId
	      status      	      
	      store{
	        id
	        name        
	      }
	    }
    }

  }
`;