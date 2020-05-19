import * as R from 'ramda';

export const getClientsOptions = (clients = []) => clients.map((item) => ({
  key: item.id,
  value: item.id,
  text: `${R.propOr('Unititled', 'firstName', item)} ${R.propOr('Unititled', 'lastName', item)}`,
}))

export const getProductsOptions = (products = []) => products.map((item) => ({
  key: item.id,
  value: item.id,
  text: item.name,
}))
