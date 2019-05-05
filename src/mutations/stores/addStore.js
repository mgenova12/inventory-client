import gql from 'graphql-tag';

export default gql`
  mutation createStore($name: String!, $storeTypeId: Int!) {
    createStore(input: { name: $name, storeTypeId: $storeTypeId }) {
      store {
        id
        name
        storeTypeId
      }
    }
  }
`;