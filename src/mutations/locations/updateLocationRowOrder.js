import gql from 'graphql-tag';

export default gql`
  mutation updateLocationRowOrder($locationIds: [Int!]!) {
    updateLocationRowOrder(input: { locationIds: $locationIds }) {
	    locations {
				id
	      name
	    }    	
    	errors
    }
  }
`;