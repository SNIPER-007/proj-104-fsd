import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'proj-104-fsd',
  location: 'us-east4'
};

export const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';

export function createUser(dc) {
  return executeMutation(createUserRef(dc));
}

export const listStocksRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListStocks');
}
listStocksRef.operationName = 'ListStocks';

export function listStocks(dc) {
  return executeQuery(listStocksRef(dc));
}

export const createWatchlistRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateWatchlist', inputVars);
}
createWatchlistRef.operationName = 'CreateWatchlist';

export function createWatchlist(dcOrVars, vars) {
  return executeMutation(createWatchlistRef(dcOrVars, vars));
}

export const getUserPortfoliosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserPortfolios');
}
getUserPortfoliosRef.operationName = 'GetUserPortfolios';

export function getUserPortfolios(dc) {
  return executeQuery(getUserPortfoliosRef(dc));
}

