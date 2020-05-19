import React from 'react';
import * as R from 'ramda';
import { Dropdown } from 'semantic-ui-react';
import {
  Card,
  Grid,
  Heading,
  Input,
  TextArea,
  DateInput,
  Button,
  Table,
} from '@8base/boost';
import { Query } from 'react-apollo';

import { getClientsOptions, getProductsOptions } from './helpers';
import { CLIENTS_QUERY } from './queries';
import { useOrderCreate } from './hook';

export const OrderCreate = () => {
  const {
    addRow,
    setClient,
    client,
    setOrderData,
    orderData,
    productsLoading,
    products,
    changeProduct,
    changeQuantity,
    rows,
    orderItems,
    onSubmit,
  } = useOrderCreate();

  return (
    <Card padding="md" stretch>
      <Card.Header>
        <Heading type="h4" text="Create order" />
      </Card.Header>
  
      <Card.Body padding="none">
        <Card.Section>
          <Grid.Layout gap="sm" stretch>
            <Grid.Box>
              <Query query={CLIENTS_QUERY}>
                {
                  ({ data, loading }) => (
                    <Dropdown
                      onChange={(e, { value }) => setClient(value)}
                      options={loading ? [] : getClientsOptions(data.clientsList.items)}
                      placeholder="Select a client"
                      selection
                      value={client}
                    />
                  )
                }
              </Query>
            </Grid.Box>
            <Grid.Box>
              <Input
                placeholder='Address...'
                value={orderData.address || ''}
                onChange={value => setOrderData({ ...orderData, address: value })}
              />
            </Grid.Box>
            <Grid.Box>
              <DateInput
                withTime
                onChange={value => setOrderData({ ...orderData, deliveryDt: value })}
              />
            </Grid.Box>
            <Grid.Box>
              <TextArea
                placeholder='comment'
                value={orderData.comment || ''}
                onChange={value => setOrderData({ ...orderData, comment: value })}
              />
            </Grid.Box>
          </Grid.Layout>
        </Card.Section>
        <Card.Section>
        <Table>
          <Table.Header columns="repeat(2, 1fr)">
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
          </Table.Header>
      
          <Table.Body
            data={rows}
            action="Add product"
            loading={productsLoading}
            onActionClick={() => addRow()}
          >
            {row => (
              <Table.BodyRow columns="repeat(2, 1fr)" key={row}>
                <Table.BodyCell>
                  <Dropdown
                    onChange={(e, { value }) => changeProduct(value, row)}
                    options={getProductsOptions(products.productsList.items)}
                    placeholder="Select a product"
                    selection
                    value={R.propOr('', 'id', orderItems[row])}
                  />
                </Table.BodyCell>
                <Table.BodyCell>
                  <Input
                    type="number"
                    onChange={value => changeQuantity(value, row)}
                    value={R.propOr('', 'quantity', orderItems[row])}
                    stretch={false}
                  />
                </Table.BodyCell>
              </Table.BodyRow>
            )}
          </Table.Body>
        </Table>
        </Card.Section>
      </Card.Body>
      <Card.Footer>
        <Button onClick={onSubmit}>Submit</Button>
      </Card.Footer>
    </Card>
  )
};
