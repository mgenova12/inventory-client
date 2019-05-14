import gql from 'graphql-tag';

export default gql`
  mutation deleteDistributor($id: Int!) {
    deleteDistributor(input: { id: $id }) {
    	errors
    }
  }
`;