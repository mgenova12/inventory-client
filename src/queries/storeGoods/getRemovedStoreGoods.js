import gql from 'graphql-tag';

export default gql`
  query getRemovedStoreGoods($id: Int!) {   
    getRemovedStoreGoods(id: $id) {
      id
      name     
      brand
      prepped           
    }

  }
`;