import gql from 'graphql-tag';

export default gql`
  query locations($storeId: Int!) {   
    locations(storeId: $storeId) {
      id
      name                     
    }

  }
`;