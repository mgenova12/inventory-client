import gql from 'graphql-tag';

export default gql`
  mutation createLocation($name: String!, $storeId: Int!) {
    createLocation(input: { name: $name, storeId: $storeId }) {
	    location {
				id
	      name
	    }
    }
  }
`;
