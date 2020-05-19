import gql from 'graphql-tag';

export const CLIENTS_QUERY = gql`
  query ClientsList {
    clientsList {
      items {
        id
        lastName
        firstName
      }
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query ProductsList {
    productsList {
      items {
        id
        name
        price
      }
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation OrderCreate($data: OrderCreateInput!) {
    orderCreate(data: $data) {
      id
    }
  }
`;

export const CREATE_ITEM_MUTATION = gql`
  mutation OrderItemCreate($data: OrderItemCreateInput!) {
    orderItemCreate(data: $data) {
      id
    }
  }
`;
