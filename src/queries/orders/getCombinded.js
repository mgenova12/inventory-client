import gql from 'graphql-tag';

export default gql`
  query getCombinded($storeOrderId: Int!, $storeId: Int!) {   
    getCombinded(storeOrderId: $storeOrderId, storeId: $storeId) {
			product
	    onHand
	    total
	    need
	    stores	
    }

  }
`;