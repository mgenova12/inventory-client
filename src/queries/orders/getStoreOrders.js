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
        inventories{
          id
          quantityNeeded
		      store {
		        id
		        name
		      }	          
          storeGood{
          	id
          	distributor{
          		id
          		name
          	}
          	product{
          		id
          		name
          	}
          }
        }		      
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