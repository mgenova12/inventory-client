import gql from 'graphql-tag';

export default gql`
  mutation editInventory($id: Int!, $quantity: Int!) {
    editInventory(input: {id: $id, quantity: $quantity }) {
	    inventory{
	      id
				quantity
				storeGood{
	        id
	        product{
	          id
	          name
	        }
	        countBy{
	          id
	          name
	        }
	      }
	    }   	
    }
  }
`;