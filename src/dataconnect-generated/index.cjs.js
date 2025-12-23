const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'proj-104-fsd',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const listStocksRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListStocks');
}
listStocksRef.operationName = 'ListStocks';
exports.listStocksRef = listStocksRef;

exports.listStocks = function listStocks(dc) {
  return executeQuery(listStocksRef(dc));
};

const createWatchlistRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateWatchlist', inputVars);
}
createWatchlistRef.operationName = 'CreateWatchlist';
exports.createWatchlistRef = createWatchlistRef;

exports.createWatchlist = function createWatchlist(dcOrVars, vars) {
  return executeMutation(createWatchlistRef(dcOrVars, vars));
};

const getUserPortfoliosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserPortfolios');
}
getUserPortfoliosRef.operationName = 'GetUserPortfolios';
exports.getUserPortfoliosRef = getUserPortfoliosRef;

exports.getUserPortfolios = function getUserPortfolios(dc) {
  return executeQuery(getUserPortfoliosRef(dc));
};
