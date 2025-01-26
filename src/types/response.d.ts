import { BaseResponse, BaseResponseArray } from './api'


export type RegisterResponse = BaseResponse<>

export type LoginResponse = BaseResponse<{
    user: User
    token: string
}>

export type ProfileResponse = BaseResponse<{
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}>;

export type BalanceResponse = BaseResponse<{
    balance: number;
}>;

export type ServiceResponse = BaseResponseArray<{
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
}>;

export type TransactionResponse = BaseResponse<{
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: 'PAYMENT';
    total_amount: number;
    created_on: string;
}>;

export type BannerResponse = BaseResponseArray<{
    banner_name: string;
    banner_image: string;
    description: string;
}>;

export type TransactionHistoryResponse = BaseResponse<{
    offset: number;
    limit: number;
    records: Array<{
        invoice_number: string;
        transaction_type: 'TOPUP' | 'PAYMENT';
        description: string;
        total_amount: number;
        created_on: string;
    }>;
}>;