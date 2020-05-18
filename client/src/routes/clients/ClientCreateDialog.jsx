import React, { useState } from 'react';
import {
  Dialog,
  Grid,
  Button,
  InputField,
  DateInputField,
} from '@8base/boost';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

export const CREATE_MUTATION = gql`
  mutation ClientCreate($data: ClientCreateInput!) {
    clientCreate(data: $data) {
      id
    }
  }
`;

export const ClientCreateDialog = ({
  closeDialog,
  isOpen,
}) => {
  const [
    clientCreate,
    { loading },
  ] = useMutation(CREATE_MUTATION, {
    refetchQueries: ['ClientsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Client successfuly created',
    },
  });
  const [data, setData] = useState({});
  const onSubmit = async () => {
    await clientCreate({ variables: {
      data
    }});
    closeDialog();
  };

  return (
    <Dialog size="sm" isOpen={isOpen}>
      <Dialog.Header title="New Client" onClose={closeDialog} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <InputField
              label="First Name"
              input={{ name: 'firstName', onChange: value => setData({ ...data, firstName: value }) }}
            />
          </Grid.Box>
          <Grid.Box>
            <InputField
              label="LastName"
              input={{ name: 'lastName', onChange: value => setData({ ...data, lastName: value }) }}
            />
          </Grid.Box>
          <Grid.Box>
            <InputField
              label="Email"
              input={{ name: 'email', onChange: value => setData({ ...data, email: value }) }}
            />
          </Grid.Box>
          <Grid.Box>
            <InputField
              label="Phone"
              input={{ name: 'phone', onChange: value => setData({ ...data, phone: value }) }}
            />
          </Grid.Box>
          <Grid.Box>
            <DateInputField
              label="Birthday"
              input={{ name: 'birthday', onChange: value => setData({ ...data, birthday: value }) }} />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={loading} onClick={closeDialog}>Cancel</Button>
        <Button color="primary" loading={loading} onClick={onSubmit}>Create client</Button>
      </Dialog.Footer>
    </Dialog>
  )
};
