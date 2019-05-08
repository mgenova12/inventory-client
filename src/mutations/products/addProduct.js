import gql from 'graphql-tag';

export default gql`
  mutation createProduct(
	  $name: String!, 
	  $distributorId: Int!, 
	  $categoryId: Int!, 
	  $countById: Int!,
	  $price: Float!, 
	  $markUp: Int!, 
	  $caseQuantity: Int, 
	  $prepped: Boolean!
  ) {
    createProduct(input: { 
    	name: $name, 
    	distributorId: $distributorId,
    	categoryId: $categoryId,
    	countById: $countById,
    	price: $price,
    	markUp: $markUp,
    	caseQuantity: $caseQuantity,
    	prepped: $prepped,
    }) {
      product {
        id
        name
      }
      errors
    }
  }
`;