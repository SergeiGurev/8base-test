import React, { useState, useEffect } from 'react';
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

const UPDATE_MUTATION = gql`
  mutation ClientUpdate($data: ClientUpdateInput!) {
    clientUpdate(data: $data) {
      id
    }
  }
`;

export const ClientEditDialog = ({
  closeDialog,
  isOpen,
  initialData,
}) => {
  const [
    clientUpdate,
    { loading },
  ] = useMutation(UPDATE_MUTATION, {
    refetchQueries: ['ClientsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Client successfuly updated'
    },
  });
  const [data, setData] = useState({});
  const onSubmit = async () => {
    await clientUpdate({ variables: { data }});
    closeDialog();
  };

  useEffect(() => {
    if (initialData) {
      const { __typename, ...data } = initialData
      setData(data)
    }
  }, [initialData]);

  return (
    <Dialog size="sm" isOpen={isOpen}>
      <Dialog.Header title="Edit Client" onClose={closeDialog} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <InputField
              label="First Name"
              input={{
                name: 'firstName',
                value: data.firstName,
                onChange: value => setData({ ...data, firstName: value }),
              }}
            />
          </Grid.Box>
          <Grid.Box>
            <InputField
              label="LastName"
              input={{
                name: 'lastName',
                value: data.lastName,
                onChange: value => setData({ ...data, lastName: value }),
              }}
            />
          </Grid.Box>
          <Grid.Box>
            <InputField
              label="Email"
              input={{
                name: 'email',
                value: data.email,
                onChange: value => setData({ ...data, email: value }),
              }}
            />
          </Grid.Box>
          <Grid.Box>
            <InputField
              label="Phone"
              input={{
                name: 'phone',
                value: data.phone,
                onChange: value => setData({ ...data, phone: value }),
              }}
            />
          </Grid.Box>
          <Grid.Box>
            <DateInputField
              label="Birthday"
              input={{
                name: 'birthday',
                value: data.birthday,
                onChange: value => setData({ ...data, birthday: value }),
              }} />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={loading} onClick={closeDialog}>Cancel</Button>
        <Button color="primary" loading={loading} onClick={onSubmit}>Edit client</Button>
      </Dialog.Footer>
    </Dialog>
  )
};
