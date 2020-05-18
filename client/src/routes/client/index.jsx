import React from 'react';
import * as R from 'ramda';
import {
  Card,
  Heading,
  Table,
} from '@8base/boost';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const GET_CLIENT = gql`
  query Client($id: ID!) {
    client(id: $id) {
      email
      firstName
      lastName
      phone
      birthday
      orders {
        items {
          address
          comment
          status
        }
      }
    }
  }
`

export const Client = ({ location: { pathname } }) => {
  const clientId = pathname.split('/')[2];
  const { data, loading } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
  })

  return (
    <Card padding="md" stretch>
      <Card.Header>
        <Heading type="h4" text="Client" />
      </Card.Header>
  
      <Card.Body padding="none">
        <Card.Section>
          FirstName: {R.pathOr('', ['client', 'firstName'], data)}
          <br />
          LastName: {R.pathOr('', ['client', 'lastName'], data)}
          <br />
          Phone: {R.pathOr('', ['client', 'phone'], data)}
          <br />
          Email: {R.pathOr('', ['client', 'email'], data)}
          <br />
          Birthday: {R.pathOr('', ['client', 'birthday'], data)}
        </Card.Section>
        <Card.Section>
          <Table>
            <Table.Header columns="repeat(3, 1fr)">
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Comment</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Header>
        
            <Table.Body loading={loading} data={R.pathOr([], ['client', 'orders', 'items'], data)}>
              {order => (
                <Table.BodyRow columns="repeat(3, 1fr)" key={order.id}>
                  <Table.BodyCell>
                    {R.pathOr('Unititled', ['address'], order)}
                  </Table.BodyCell>
                  <Table.BodyCell>
                    {R.pathOr('Unititled', ['comment'], order)}
                  </Table.BodyCell>
                  <Table.BodyCell>
                    {R.pathOr('Unititled', ['status'], order)}
                  </Table.BodyCell>
                </Table.BodyRow>
              )}
            </Table.Body>
          </Table>
        </Card.Section>
      </Card.Body>
    </Card>
  )
};
