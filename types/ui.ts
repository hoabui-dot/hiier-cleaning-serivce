export interface ILoginAccount {
  phone: string;
  password: string;
  role: string;
}

export type LatLng = {
  latitude: number;
  longitude: number;
};

export interface IProductTool {
  amount: number;
  id: number;
  image: string;
  ranges: string;
  store: string;
  type: string;
}

export interface IAnswerDTOItem {
  answerContent: string;
}

export interface IQuizzesItem {
  questionContent: string;
  questionId: number;
  answerDTOList: IAnswerDTOItem[]
}

export interface IQuizzes {
  name: string;
  numberAnswerPassed: string;
  qadtoList: IQuizzesItem[]
}


export type Address = {
  id: number;
  customerName: string;
  note: string;
  phone: string;
  detail: string;
  location: LatLng;
};

export type Transaction = {
  id: number;
  time: string;
  content: string;
  type: string;
  status: string;
  amount: number;
};

export type ITransactionHistoryType = 'TOP_UP' | 'WITH_DRAW';

export interface ITransactionHistory {
  amount: number;
  content: string;
  time: number;
  status: string;
  type: ITransactionHistoryType;
}

export interface IHiPay {
  balance: number;
  bankName: string;
  bankNumber: number;
  customerReceive: string;
}

export interface ITaskHistory {
  addressCustomerName: string;
  addressCustomerPhone: string;
  addressDetail: string;
  addressNote: null;
  id: number;
  serviceKey: string;
  serviceName: string;
  taskStatus: {
    stateTus: string;
    time: number;
  };
  totalPrice: number;
}

export interface IDetailHiierInformation {
  avatar: string;
  avgRating: number;
  identityNumber: string;
  name: string;
  phone: string;
  level: number;
  virtualMoney: number;
  isPremium: number;
}

export interface IRegistrationAccount {
  fullName: string;
  password: string;
  phone: string;
  identifyNumber: string;
  gender: string;
}

export interface IJobInformation {
  id: number;
  customerName: string;
  customerPhone: string;
  equipment: string;
  address: {
    detail: string;
    customerName: string;
    phone: string;
  };
  paymentMethod: string;
  taskName: string; //công việc
  totalPrice: number; //tổng tiền
  tipMoney: number;
  overtimePrice: number; //phí làm việc ngoài giờ
  duration: number;
}

export type BaseResponse = {
  data: any;
  resource: any;
  message: string;
  status: number;
};