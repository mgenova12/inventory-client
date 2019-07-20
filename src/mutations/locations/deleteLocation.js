import gql from 'graphql-tag';

export default gql`
  mutation deleteLocation($id: Int!) {
    deleteLocation(input: { id: $id }) {
    	errors
    }
  }
`;