import gql from 'graphql-tag';

export default gql`
  {
    products {
      id
      name
	    distributor {
	      id
	      name
	    }    
	    category {
	      id
	      name
	    }   
	    caseQuantity 
	    markUp  
	    price
	    markedUpPrice
	    brand
	    daysTillExpire
    }
  }
`;