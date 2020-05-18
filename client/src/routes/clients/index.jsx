import React, { useState } from 'react';
import {
  Card,
  Heading,
} from '@8base/boost';

import { ClientCreateDialog } from './ClientCreateDialog';
import { ClientDeleteDialog } from './ClientDeleteDialog';
import { ClientEditDialog } from './ClientEditDialog';
import { ClientsTable } from './ClientsTable';

export const Clients = () => {
  const [createDialogOpened, setCreateDialogOpened] = useState(false);
  const [deleteDialogOpened, setDeleteDialogOpened] = useState(false);
  const [editDialogOpened, setEditDialogOpened] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState(null);
  const [curentEditableClient, setСurentEditableClient] = useState(null);


  const openDeleteModal = (id) => {
    setDeleteClientId(id);
    setDeleteDialogOpened(true);
  };

  const openEditModal = (data) => {
    setСurentEditableClient(data);
    setEditDialogOpened(true);
  };

  return (
    <Card padding="md" stretch>
      <Card.Header>
        <Heading type="h4" text="Clients" />
      </Card.Header>
  
      <ClientDeleteDialog
        closeDialog={() => setDeleteDialogOpened(false)}
        isOpen={deleteDialogOpened}
        clientId={deleteClientId}
      />
      <ClientCreateDialog
        closeDialog={() => setCreateDialogOpened(false)}
        isOpen={createDialogOpened}
      />
      <ClientEditDialog
        closeDialog={() => setEditDialogOpened(false)}
        isOpen={editDialogOpened}
        initialData={curentEditableClient}
      />
  
      <Card.Body padding="none" stretch scrollable>
        <ClientsTable
          openCreateModal={() => setCreateDialogOpened(true)}
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
        />
      </Card.Body>
    </Card>
  )
};
