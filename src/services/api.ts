import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { LoginRequest, RegisterRequest, UpdateProfileRequest } from '../types/request';
import { BalanceResponse, BannerResponse, LoginResponse, ProfileResponse, RegisterResponse, ServiceResponse, TransactionHistoryResponse, TransactionResponse } from '../types/response';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Profile', 'Balance', 'Services', 'Banners', 'TransactionHistory'],
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (credentials) => ({
                url: '/registration',
                method: 'POST',
                body: credentials,
            }),
        }),

        getProfile: builder.query<ProfileResponse['data'], void>({
            query: () => '/profile',
            transformResponse: (response: ProfileResponse) => response.data,
            providesTags: ['Profile'],
        }),

        getBalance: builder.query<BalanceResponse['data'], void>({
            query: () => '/balance',
            transformResponse: (response: BalanceResponse) => response.data,
            providesTags: ['Balance'],
        }),

        getServices: builder.query<ServiceResponse['data'], void>({
            query: () => '/services',
            transformResponse: (response: ServiceResponse) => response.data,
            providesTags: ['Services'],
        }),

        getBanners: builder.query<BannerResponse['data'], void>({
            query: () => '/banner',
            transformResponse: (response: BannerResponse) => response.data,
            providesTags: ['Banners'],
        }),

        getTransactionHistory: builder.query<TransactionHistoryResponse['data'], { limit: number, offset: number }>({
            query: (params) => ({
                url: '/transaction/history',
                method: 'GET',
                params,
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                if (!currentCache) return newItems;
                return {
                    ...newItems,
                    records: [...currentCache.records, ...newItems.records],
                };
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
            transformResponse: (response: TransactionHistoryResponse) => response.data,
            providesTags: ['TransactionHistory'],
        }),

        updateProfile: builder.mutation<ProfileResponse, UpdateProfileRequest>({
            query: (data) => ({
                url: '/profile/update',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Profile'],
        }),

        updateProfileImage: builder.mutation<ProfileResponse, FormData>({
            query: (data) => ({
                url: '/profile/image',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Profile'],
        }),

        createTransaction: builder.mutation<TransactionResponse, { service_code: string }>({
            query: (data) => ({
                url: '/transaction',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Balance', 'TransactionHistory'],
        }),

        topup: builder.mutation<{ balance: number }, { top_up_amount: number }>({
            query: (data) => ({
                url: '/topup',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Balance'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetProfileQuery,
    useGetBalanceQuery,
    useGetServicesQuery,
    useGetBannersQuery,
    useTopupMutation,
    useGetTransactionHistoryQuery,
    useUpdateProfileMutation,
    useUpdateProfileImageMutation,
    useCreateTransactionMutation,
} = api;