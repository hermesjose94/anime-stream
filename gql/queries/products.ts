import { gql } from 'graphql-request'

export const GET_ALL_PRODUCTS = gql`query fetchProducts{
    products {
        id
        name
        price
        image
    }
  }`