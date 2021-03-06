import gql from 'graphql-tag';

export default gql`
  query getProduct($id: Int!) {   
    getProduct(id: $id) {
      id
      name
      distributor {
        id
        name
      }  
      category {
        id
        name
      }   
      caseQuantity 
      markUp  
      price 
      barcode
      description
      distributorNumber
      brand 
      unitSize
      documents {
        id
        document
      }                     
    }

  }
`;