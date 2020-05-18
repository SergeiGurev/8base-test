import React from 'react';
import { NavLink } from 'react-router-dom';
import * as R from 'ramda';
import { Table, Dropdown, Icon, Menu } from '@8base/boost';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
  query ClientsList {
    clientsList {
      items {
        id
        lastName
        firstName
        email
        phone
        birthday
      }
    }
  }
`;

export const ClientsTable = ({
  openCreateModal,
  openDeleteModal,
  openEditModal,
}) => {
  const {
    loading,
    data: clients,
  } = useQuery(QUERY);

  return (
    <Table>
      <Table.Header columns="repeat(5, 1fr) 60px">
        <Table.HeaderCell>First Name</Table.HeaderCell>
        <Table.HeaderCell>Last Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Phone</Table.HeaderCell>
        <Table.HeaderCell>Birthday</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Header>
  
      <Table.Body
        loading={loading}
        data={R.pathOr([], ['clientsList', 'items'], clients)}
        action="Create Client"
        onActionClick={() => openCreateModal()}
      >
        {client => (
          <Table.BodyRow columns="repeat(5, 1fr) 60px" key={client.id}>
            <Table.BodyCell>
              {R.pathOr('Unititled', ['firstName'], client)}
            </Table.BodyCell>
            <Table.BodyCell>
              {R.pathOr('Unititled', ['lastName'], client)}
            </Table.BodyCell>
            <Table.BodyCell>
              {R.pathOr('Unititled', ['email'], client)}
            </Table.BodyCell>
            <Table.BodyCell>
              {R.pathOr('Unititled', ['phone'], client)}
            </Table.BodyCell>
            <Table.BodyCell>
              {R.pathOr('Unititled', ['birthday'], client)}
            </Table.BodyCell>
            <Table.BodyCell>
              <Dropdown defaultOpen={false}>
                <Dropdown.Head>
                  <Icon name="More" color="LIGHT_GRAY2" />
                </Dropdown.Head>
                <Dropdown.Body pin="right">
                  {({ closeDropdown }) => (
                    <Menu>
                      <Menu.Item>
                        <NavLink
                          to={`/clients/${client.id}`}
                        >
                          Profile
                        </NavLink>
                      </Menu.Item>
                      <Menu.Item onClick={() => {
                        openEditModal(client)
                        closeDropdown()
                      }}>Edit</Menu.Item>
                      <Menu.Item onClick={() => {
                        openDeleteModal(client.id)
                        closeDropdown()
                      }}>
                        Delete
                      </Menu.Item>
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
