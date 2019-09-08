import gql from 'graphql-tag';

export default gql`
  query orders($storeId: Int!) {   
    orders(storeId: $storeId) {
			id
			status
	    createdAt
	    deliveryDay
	    store{
	      name
	    }
    }

  }
`;