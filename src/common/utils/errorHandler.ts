
import { toast } from 'react-toastify';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {trimToMaxLength} from "@/common/utils/trimToMaxLength.ts";
import {isErrorWithDetailArray} from "@/common/utils/isErrorWithDetailArray.ts";
import {isErrorWithProperty} from "@/common/utils/isErrorWithProperty.ts";


type TMDBErrorData = {
    status_message?: string;
    success?: boolean;
    status_code?: number;
};


export const errorToast = (message: string, error?: unknown) => {
    toast(` ${message}`, {
        theme: 'colored',
        type: 'error',
        position: 'top-right',
        autoClose: 5000,
    });

    if (error) {
        console.error(`${message}\n`, error);
    }
};


const isTMDBError = (data: unknown): data is TMDBErrorData => {
    return (
        typeof data === 'object' &&
        data !== null &&
        'status_message' in data
    );
};


export const handleErrors = (error: FetchBaseQueryError) => {
    if (error) {
        switch (error.status) {
            case 'FETCH_ERROR':
                errorToast('Network error. Please check your internet connection.');
                break;

            case 'PARSING_ERROR':
                errorToast('Data parsing error. Please try again.');
                break;

            case 'CUSTOM_ERROR':
                errorToast(trimToMaxLength(error.error));
                break;

            case 'TIMEOUT_ERROR':
                errorToast('Request timeout. Please try again.');
                break;

            case 400:
                if (isErrorWithDetailArray(error.data)) {
                    const errorMessage = error.data.errors[0].detail;
                    errorToast(trimToMaxLength(errorMessage));
                } else if (isTMDBError(error.data)) {
                    errorToast(trimToMaxLength(error.data.status_message || 'Bad request'));
                } else if (isErrorWithProperty(error.data, 'error')) {
                    errorToast(trimToMaxLength(error.data.error));
                } else {
                    errorToast('Bad request');
                }
                break;

            case 401:
                if (isTMDBError(error.data)) {
                    errorToast('Invalid API token. Please check your authentication.');
                } else if (isErrorWithProperty(error.data, 'message')) {
                    errorToast(error.data.message);
                } else {
                    errorToast('Authentication failed');
                }
                break;

            case 403:
                if (isErrorWithDetailArray(error.data)) {
                    errorToast(trimToMaxLength(error.data.errors[0].detail));
                } else if (isTMDBError(error.data)) {
                    errorToast(trimToMaxLength(error.data.status_message || 'Access forbidden'));
                } else if (isErrorWithProperty(error.data, 'error')) {
                    errorToast(trimToMaxLength(error.data.error));
                } else {
                    errorToast('Access forbidden');
                }
                break;

            case 404:
                if (isTMDBError(error.data)) {
                    errorToast(trimToMaxLength(error.data.status_message || 'Resource not found'));
                } else if (isErrorWithProperty(error.data, 'error')) {
                    errorToast(error.data.error);
                } else {
                    errorToast('Resource not found');
                }
                break;

            case 429:
                if (isErrorWithProperty(error.data, 'message')) {
                    errorToast(error.data.message);
                } else {
                    errorToast('Too many requests. Please try again later.');
                }
                break;

            default:
                if (error.status && error.status >= 500 && error.status < 600) {
                    if (isTMDBError(error.data)) {
                        errorToast(trimToMaxLength(error.data.status_message || 'Server error occurred'));
                    } else {
                        errorToast('Server error occurred. Please try again later.');
                    }
                } else if (error.status) {
                    // Для других HTTP ошибок
                    if (isTMDBError(error.data)) {
                        errorToast(trimToMaxLength(error.data.status_message || `Error ${error.status}`));
                    } else if (isErrorWithProperty(error.data, 'error')) {
                        errorToast(trimToMaxLength(error.data.error));
                    } else {
                        errorToast(`Error ${error.status}: Something went wrong`);
                    }
                } else {
                    errorToast('Unknown error occurred');
                }
        }
    }
};