import gql from 'graphql-tag';

export default gql`
  query getStore($id: Int!) {   
    getStore(id: $id) {
      id
      name
      storeType{
        id
        name
      }
    }

  }
`;