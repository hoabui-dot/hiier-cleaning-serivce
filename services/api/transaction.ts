import { BaseResponse } from '../../types/ui';
import http from '../http';
import { API_URL } from './urls';

export const TransactionApi = {
  getAll: async function (): Promise<BaseResponse> {
    return await http.get(`${API_URL.getTransactionHistory}?page=0&size=10`);
  },
};
