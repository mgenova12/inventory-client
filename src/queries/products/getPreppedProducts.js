import gql from 'graphql-tag';

export default gql`
  {
    preppedProducts {
      id
      name    
	    category {
	      id
	      name
	    }   
	    portionSize
	    caseQuantity 
	    markUp 
	    markedUpPrice
    }
  }
`;