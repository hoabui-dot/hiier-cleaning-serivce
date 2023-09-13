// import { BaseResponse, Task } from '../../utils/types';
import { IRegistrationAccount } from '../../types/ui';
import http from '../http';
import { API_URL } from './urls';

export interface IVerifyOTP {
  idHash: string;
  otp: string;
}

export const TaskApi = {
  create: async function (data: any): Promise<any> {
    return await http.post(API_URL.taskCreate, data);
  },
  getAll: async function (): Promise<any> {
    return await http.get(API_URL.taskGetAll);
  },
  setActive: async function (location: any): Promise<any> {
    return await http.put(API_URL.setActive, location);
  },
  setInActive: async function (): Promise<any> {
    return await http.put(API_URL.setInActive);
  },
  login: async function (account: any): Promise<any> {
    return await http.post(API_URL.login, account);
  },
  requestOTP: async function (phone: { phone: string }): Promise<any> {
    return await http.post(API_URL.otpRequest, phone);
  },
  registration: async function name(value: IRegistrationAccount) {
    return await http.post(API_URL.registration, value);
  },
  verifyOTP: async function (value: IVerifyOTP): Promise<any> {
    return await http.post(API_URL.verifyOTP, value);
  },
  verifyForgotPassword: async function (value: IVerifyOTP): Promise<any> {
    return await http.post(API_URL.verifyForgotPassword, value);
  },
  forgotPassword: async function (value: any): Promise<any> {
    return await http.post(API_URL.requestForgotPassword, value);
  },
  getEmployeeInfo: async function (): Promise<any> {
    return await http.get(API_URL.employeeInfo);
  },
  doneBooking: async function (id: number | undefined): Promise<any> {
    return await http.put(`${API_URL.doneBooking}${id}`);
  },
  cancelBooking: async function (id: number | undefined): Promise<any> {
    return await http.put(`${API_URL.cancelBooking}${id}`);
  },
  listForEmployee: async function ({
    status,
    page,
    size,
  }: {
    status: string;
    page: number;
    size: number;
  }) {
    return await http.get(API_URL.JobHistory, {
      params: {
        status,
        page,
        size,
      },
    });
  },
  JobHistory: async function (value: {
    status: string;
    page: number;
    size: number;
  }): Promise<any> {
    return await http.get(
      `${API_URL.JobHistory}?status=${value.status}&page=${value.page}&size=${value.size}`
    );
  },
  getWalletInfo: async function (): Promise<any> {
    return await http.get(API_URL.getWalletInfo);
  },
  getTransactionHistory: async function (): Promise<any> {
    return await http.get(`${API_URL.getTransactionHistory}?page=1&size=10`);
  },
  onWithDraw: async function (value: any): Promise<any> {
    return await http.put(API_URL.onWithDraw, value);
  },
  resetPassword: async function (value: {
    idHash: string;
    newPassword: string;
  }): Promise<any> {
    return await http.post(API_URL.resetPassword, value);
  },
  acceptTask: async function (id: number) {
    return await http.put(`${API_URL.acceptTask}${id}`);
  },
  getQuizzesList: async function () {
    return await http.get(`${API_URL.getQuizzesList}`);
  },
  onSubmitAnswer: async function (
    value: { questionId: number; answerId: number }[]
  ) {
    return await http.post(API_URL.submitAnswer, value);
  },
  getProductTools: async function () {
    return await http.get(API_URL.getProductTool);
  },
  getChemicalTools: async function () {
    return await http.get(API_URL.getChemicalTool);
  },
  getAlreadyTaskDate: async function () {
    return http.get(API_URL.getAlreadyTaskDate);
  },
  getTaskList: async function (date: number) {
    return http.get(`${API_URL.getTaskList}${date}`);
  },
  getNotification: async function () {
    return http.get(API_URL.getNotification)
  }
};
