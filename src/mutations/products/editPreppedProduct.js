import gql from 'graphql-tag';

export default gql`
  mutation editPreppedProduct(
    $id: Int!,
	  $name: String!, 
	  $category: String!, 
	  $caseQuantity: Int, 
	  $markUp: Int!, 
    $portionSize: Int,
    $markedUpPrice: Float,
  ) {
    editPreppedProduct(input: { 
      id: $id,
    	name: $name, 
    	category: $category,
    	caseQuantity: $caseQuantity,
    	markUp: $markUp,
      portionSize: $portionSize,
      markedUpPrice: $markedUpPrice,
    }) {
      product {
        id
        name
        category {
          id
          name
        }
        portionSize
        caseQuantity
        markUp
        markedUpPrice
      }
      errors
    }
  }
`;