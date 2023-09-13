import { Linking } from 'react-native';

export const BASEURL =
  'https://hii-cleaning.online'
const API_BASE = `${BASEURL}/api`;

export const onDirectionOfGoogleMap = ({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}) => {
  return Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`);
};

export const API_URL = {
  webSocket:
    'https://hii-cleaning.online/cleaning-service',
  otpRequest: `${API_BASE}/account/request-otp/`,
  customerRegister: `${API_BASE}/account/customer-registration/`,
  login: `${API_BASE}/account/login/`,
  logout: `${API_BASE}/account/logout/`,
  checkToken: `${API_BASE}/account/check-token`,
  requestForgotPassword: `${API_BASE}/account/request-forget-password/`,
  resetPassword: `${API_BASE}/account/reset-password/`,
  verifyOTP: `${API_BASE}/account/verify-otp-employee-registration/`,
  verifyForgotPassword: `${API_BASE}/account/verify-otp-forget-password`,
  profileView: `${API_BASE}/profile/view/`,
  profileUpdate: `${API_BASE}/profile/update/`,
  serviceGetAll: `${API_BASE}/service/get-all/`,
  voucherGetAll: `${API_BASE}/voucher/get-all/`,
  addressCreate: `${API_BASE}/address/create/`,
  addressList: `${API_BASE}/address/list`,
  taskCreate: `${API_BASE}/task/create`,
  taskGetAll: `${API_BASE}/task/get-all/`,
  setActive: `${API_BASE}/account/set-active`,
  setInActive: `${API_BASE}/account/set-offline`,
  employeeInfo: `${API_BASE}/employee-profile/get/`,
  doneBooking: `${API_BASE}/task/done/`,
  cancelBooking: `${API_BASE}/task/cancel/`,
  JobHistory: `${API_BASE}/task/list-for-employee`,
  acceptTask: `${API_BASE}/task/accept/`,

  // Wallet
  getWalletInfo: `${API_BASE}/wallet/get-info`,
  getTransactionHistory: `${API_BASE}/transaction-history/get-all`,
  onWithDraw: `${API_BASE}/wallet/with-draw`,

  notificationGetNew: `${API_BASE}/advertise/get-all/`,
  messageGetAll: `${API_BASE}/message/get-history-message/`,
  messageCreate: `${API_BASE}/message/create/`,
  getChatList: `${API_BASE}/group-chat/get-group-chat-by-user-login`,
  registration: `${API_BASE}/account/employee-registration`,

  //Quizzes
  getQuizzesList: `${API_BASE}/start-quiz/get-question/`,
  submitAnswer: `${API_BASE}/start-quiz/submit-answer/`,
  getProductTool: `${API_BASE}/tool/get-product`,
  getChemicalTool: `${API_BASE}/tool/get-chemical`,

  // Task schedule
  getAlreadyTaskDate: `${API_BASE}/task/getListOfDayHasTaskInMonth/`,
  getTaskList: `${API_BASE}/task/getListOfTaskInDay/`,

  // Notification
  getNotification: `${API_BASE}/notification/get-new-notification/`
};
