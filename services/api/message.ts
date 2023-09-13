import http from '../http';
import { API_URL } from './urls';
import { BaseResponse } from '../../types/ui';

export const MessageApi = {
  getAll: async function (value: any): Promise<any> {
    return await http.get(`${API_URL.messageGetAll}${value?.id}`, {
      params: {
        id: value?.id,
        page: value?.page,
        size: value?.size
      }
    });
  },
  create: async function (
    groupId: number,
    content: string
  ): Promise<BaseResponse> {
    return await http.post(API_URL.messageCreate, {
      group_chat_id: groupId,
      content: content,
    });
  },
  getChatGroupList: async function (): Promise<any> {
      return await http.get(API_URL.getChatList)
  }
};
