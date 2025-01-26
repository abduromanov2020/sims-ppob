export interface BaseResponse<T> {
    status: number;
    message: string;
    data: T;
}

export interface ErrorResponse {
    status: number;
    message: string;
    data: null;
}

export interface BaseResponseArray<T> {
    status: number;
    message: string;
    data: T[];
}