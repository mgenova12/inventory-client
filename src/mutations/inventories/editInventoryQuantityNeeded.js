import gql from 'graphql-tag';

export default gql`
  mutation editInventoryQuantityNeeded($storeId: Int!,) {
    editInventoryQuantityNeeded(input: {storeId: $storeId}) {
			errors  	
    }
  }
`;