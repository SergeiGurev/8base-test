import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from 'react-apollo';

import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

import {
  PRODUCTS_QUERY,
  CREATE_ORDER_MUTATION,
  CREATE_ITEM_MUTATION,
} from './queries';

export const useOrderCreate = () => {
  const history = useHistory();
  const [orderCreate] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: ['OrdersList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Order successfuly created',
    }
  });
  const [orderItemCreate] = useMutation(CREATE_ITEM_MUTATION, {
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'OrderItem successfuly created',
    }
  });
  const {
    loading: productsLoading,
    data: products,
  } = useQuery(PRODUCTS_QUERY);
  const [orderData, setOrderData] = useState({});
  const [client, setClient] = useState(null);
  const [rows, setRows] = useState([]);
  const [orderItems, setOrderItems] = useState({});

  const addRow = () => {
    setRows(rows[0] ? [...rows, rows.length + 1] : [1]);
  }

  const changeProduct = (id, index) => setOrderItems({
    ...orderItems,
    [index]: {
      ...orderItems[index],
      id,
    }
  });
  const changeQuantity = (quantity, index) => setOrderItems({
    ...orderItems,
    [index]: {
      ...orderItems[index],
      quantity,
    }
  });

  const onSubmit = async () => {
    const {
      data: { orderCreate: { id } },
    } = await orderCreate({ variables: { data: {
      ...orderData,
      client: {
        connect: { id: client },
      },
    }}});

    for (const key in orderItems) {
      await orderItemCreate({ variables: { data: {
        quantity: orderItems[key].quantity,
        order: {
          connect: { id },
        },
        product: {
          connect: { id: orderItems[key].id },
        },
      }}});
    };

    history.push(`/orders`);
  };

  return {
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
  }
}
