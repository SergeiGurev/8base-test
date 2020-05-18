import React from 'react';
import * as R from 'ramda';
import { Table, Dropdown, Icon, Menu } from '@8base/boost';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
  query OrdersList {
    ordersList {
      items {
        address
        comment
        id
        status
        client {
          lastName
          firstName
        }
      }
    }
  }
`;

export const OrdersTable = () => {
  const {
    loading,
    data: orders,
  } = useQuery(QUERY);

  return (
    <Table>
      <Table.Header columns="repeat(4, 1fr) 60px">
        <Table.HeaderCell>Client</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.HeaderCell>Comment</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Header>
  
      <Table.Body loading={loading} data={R.pathOr([], ['ordersList', 'items'], orders)}>
        {order => (
          <Table.BodyRow columns="repeat(4, 1fr) 60px" key={order.id}>
            <Table.BodyCell>
              {`${R.pathOr('Unititled', ['client', 'firstName'], order)} ${R.pathOr('Unititled', ['client', 'lastName'], order)}`}
            </Table.BodyCell>
            <Table.BodyCell>
              {R.pathOr('Unititled', ['address'], order)}
            </Table.BodyCell>
            <Table.BodyCell>
              {R.pathOr('Unititled', ['comment'], order)}
            </Table.BodyCell>
            <Table.BodyCell>
              {R.pathOr('Unititled', ['status'], order)}
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
