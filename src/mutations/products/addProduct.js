import gql from 'graphql-tag';

export default gql`
  mutation createProduct(
	  $name: String!, 
	  $distributorId: Int!, 
	  $categoryId: Int!, 
	  $price: Float!, 
	  $markUp: Int!, 
	  $caseQuantity: Int, 
	  $prepped: Boolean!,
    $barcode: Int, 
    $description: String,
    $distributorNumber: Int, 
    $brand: String,
    $unitSize: String,
    $documentData: [String!]!
  ) {
    createProduct(input: { 
    	name: $name, 
    	distributorId: $distributorId,
    	categoryId: $categoryId,
    	price: $price,
    	markUp: $markUp,
    	caseQuantity: $caseQuantity,
    	prepped: $prepped,
      barcode: $barcode,
      description: $description,
      distributorNumber: $distributorNumber,
      brand: $brand,
      unitSize: $unitSize,
      documentData: $documentData
    }) {
      product {
        id
        name
      }
      errors
    }
  }
`;