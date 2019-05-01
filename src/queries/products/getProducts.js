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
	    countBy {
	      id
	      name
	    }	    
	    category {
	      id
	      name
	    }   
	    caseQuantity   
	    price
    }
  }
`;