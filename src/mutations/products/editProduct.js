import gql from 'graphql-tag';

export default gql`
  mutation editProduct(
    $id: Int!,
	  $name: String!, 
	  $distributor: String!, 
	  $category: String!, 
	  $price: Float!, 
	  $markUp: Int!, 
	  $caseQuantity: Int, 
	  $prepped: Boolean!
  ) {
    editProduct(input: { 
      id: $id,
    	name: $name, 
    	distributor: $distributor,
    	category: $category,
    	price: $price,
    	markUp: $markUp,
    	caseQuantity: $caseQuantity,
    	prepped: $prepped,
    }) {
      product {
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
      }
      errors
    }
  }
`;