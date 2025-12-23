import { CreateUserData, ListStocksData, CreateWatchlistData, CreateWatchlistVariables, GetUserPortfoliosData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useListStocks(options?: useDataConnectQueryOptions<ListStocksData>): UseDataConnectQueryResult<ListStocksData, undefined>;
export function useListStocks(dc: DataConnect, options?: useDataConnectQueryOptions<ListStocksData>): UseDataConnectQueryResult<ListStocksData, undefined>;

export function useCreateWatchlist(options?: useDataConnectMutationOptions<CreateWatchlistData, FirebaseError, CreateWatchlistVariables>): UseDataConnectMutationResult<CreateWatchlistData, CreateWatchlistVariables>;
export function useCreateWatchlist(dc: DataConnect, options?: useDataConnectMutationOptions<CreateWatchlistData, FirebaseError, CreateWatchlistVariables>): UseDataConnectMutationResult<CreateWatchlistData, CreateWatchlistVariables>;

export function useGetUserPortfolios(options?: useDataConnectQueryOptions<GetUserPortfoliosData>): UseDataConnectQueryResult<GetUserPortfoliosData, undefined>;
export function useGetUserPortfolios(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserPortfoliosData>): UseDataConnectQueryResult<GetUserPortfoliosData, undefined>;
