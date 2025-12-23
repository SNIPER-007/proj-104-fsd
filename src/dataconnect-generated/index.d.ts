import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateWatchlistData {
  watchlist_insert: Watchlist_Key;
}

export interface CreateWatchlistVariables {
  name: string;
  description?: string | null;
}

export interface GetUserPortfoliosData {
  portfolios: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
  } & Portfolio_Key)[];
}

export interface ListStocksData {
  stocks: ({
    id: UUIDString;
    symbol: string;
    companyName: string;
    exchange?: string | null;
    sector?: string | null;
    currency: string;
  } & Stock_Key)[];
}

export interface Portfolio_Key {
  id: UUIDString;
  __typename?: 'Portfolio_Key';
}

export interface Stock_Key {
  id: UUIDString;
  __typename?: 'Stock_Key';
}

export interface Transaction_Key {
  id: UUIDString;
  __typename?: 'Transaction_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WatchlistEntry_Key {
  watchlistId: UUIDString;
  stockId: UUIDString;
  __typename?: 'WatchlistEntry_Key';
}

export interface Watchlist_Key {
  id: UUIDString;
  __typename?: 'Watchlist_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface ListStocksRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStocksData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListStocksData, undefined>;
  operationName: string;
}
export const listStocksRef: ListStocksRef;

export function listStocks(): QueryPromise<ListStocksData, undefined>;
export function listStocks(dc: DataConnect): QueryPromise<ListStocksData, undefined>;

interface CreateWatchlistRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWatchlistVariables): MutationRef<CreateWatchlistData, CreateWatchlistVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateWatchlistVariables): MutationRef<CreateWatchlistData, CreateWatchlistVariables>;
  operationName: string;
}
export const createWatchlistRef: CreateWatchlistRef;

export function createWatchlist(vars: CreateWatchlistVariables): MutationPromise<CreateWatchlistData, CreateWatchlistVariables>;
export function createWatchlist(dc: DataConnect, vars: CreateWatchlistVariables): MutationPromise<CreateWatchlistData, CreateWatchlistVariables>;

interface GetUserPortfoliosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserPortfoliosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserPortfoliosData, undefined>;
  operationName: string;
}
export const getUserPortfoliosRef: GetUserPortfoliosRef;

export function getUserPortfolios(): QueryPromise<GetUserPortfoliosData, undefined>;
export function getUserPortfolios(dc: DataConnect): QueryPromise<GetUserPortfoliosData, undefined>;

