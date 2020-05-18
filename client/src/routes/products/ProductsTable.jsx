import React from 'react';
import * as R from 'ramda';
import { Table, Dropdown, Icon, Menu } from '@8base/boost';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import styled from '@emotion/styled';

const ProductPicture = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`

const QUERY = gql`
  query ProductsList {
    productsList {
      items {
        id
        name
        price
        picture {
          shareUrl
        }
      }
    }
  }
`;

export const ProductsTable = () => {
  const {
    loading,
    data: products,
  } = useQuery(QUERY);

  return (
    <Table>
      <Table.Header columns="60px repeat(2, 1fr) 60px">
        <Table.HeaderCell>Image</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Header>
  
      <Table.Body loading={loading} data={R.pathOr([], ['productsList', 'items'], products)}>
        {product => (
          <Table.BodyRow columns="60px repeat(2, 1fr) 60px" key={product.id}>
            <Table.BodyCell>
              <ProductPicture
                src={R.pathOr('', ['picture', 'shareUrl'], product)}
              />
            </Table.BodyCell>
            <Table.BodyCell>
              {R.pathOr('Unititled', ['name'], product)}
            </Table.BodyCell>
            <Table.BodyCell>
              {R.pathOr('Unititled', ['price'], product)}
            </Table.BodyCell>
            <Table.BodyCell>
              <Dropdown defaultOpen={false}>
                <Dropdown.Head>
                  <Icon name="More" color="LIGHT_GRAY2" />
                </Dropdown.Head>
                <Dropdown.Body pin="right">
                  {({ closeDropdown }) => (
                    <Menu>
                      <Menu.Item onClick={closeDropdown}>Delete</Menu.Item>
                    </Menu>
                  )}
                </Dropdown.Body>
              </Dropdown>
            </Table.BodyCell>
          </Table.BodyRow>
        )}
      </Table.Body>
    </Table>
  )
};
