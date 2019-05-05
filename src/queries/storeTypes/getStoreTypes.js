import gql from 'graphql-tag';

export default gql`
  {
    storeTypes {
      id
      name
      stores {
      	id
      	name
      }
    }
  }
`;