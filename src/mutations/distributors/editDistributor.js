import gql from 'graphql-tag';

export default gql`
  mutation editDistributor($id: Int!, $name: String!) {
    editDistributor(input: { id: $id, name: $name }) {
      distributor {
        id
        name
      }
    }
  }
`;