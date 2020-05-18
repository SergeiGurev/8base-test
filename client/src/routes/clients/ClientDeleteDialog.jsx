import React from 'react';
import { Dialog, Button } from '@8base/boost';
import { useMutation } from 'react-apollo';

import gql from 'graphql-tag';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const DELETE_MUTATION = gql`
  mutation ClientDelete($id: ID!) {
    clientDelete(data: { id: $id }) {
      success
    }
  }
`;

export const ClientDeleteDialog = ({
  closeDialog,
  isOpen,
  clientId,
}) => {
  const [
    clientDelete,
    { loading },
  ] = useMutation(DELETE_MUTATION, {
    refetchQueries: ['ClientsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Client successfuly deleted'
    }
  });

  const onDelete = async () => {
    await clientDelete({ variables: { id: clientId }});
    closeDialog();
  };

  return (
    <Dialog size="sm" isOpen={isOpen}>
      <Dialog.Header title="Delete Client" onClose={closeDialog} />
      <Dialog.Body scrollable>
        Are you really want to delete client?
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={loading} onClick={closeDialog}>Cancel</Button>
        <Button color="danger" loading={loading} onClick={onDelete}>Delete Client</Button>
      </Dialog.Footer>
    </Dialog>
  )
};
