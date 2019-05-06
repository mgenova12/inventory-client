import gql from 'graphql-tag';

export default gql`
  mutation createDistributor($name: String!) {
    createDistributor(input: { name: $name }) {
      distributor {
        id
        name
      }
    }
  }
`;