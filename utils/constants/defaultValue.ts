export const DEFAULT_LAT_LONG = {
  latitude: 10.783087,
  longitude: 106.746822,
};

export const DEFAULT_LOCATION = {
  location: DEFAULT_LAT_LONG,
};

export const initAddress = {
  id: -1,
  customerName: '',
  note: '',
  phone: '',
  detail: '',
  ...DEFAULT_LOCATION,
};

export const DEFAULT_LOGIN_NAVIGATION_VALUE = {
  secretHash: '',
  token: '',
  address: {
    id: 0,
    customerName: '',
    note: '',
    phone: '',
    detail: '',
    location: {
      latitude: 0,
      longitude: 0,
    },
  },
}

export const DEFAULT_HIIER_INFORMATION = {
  avatar: '',
  avgRating: 0,
  identityNumber: '',
  name: '',
  phone: '',
  level: 0,
  virtualMoney: 0,
  isPremium: 0,
};

export const DEFAULT_JOB_INFORMATION = {
  id: 0,
  customerName: '',
  customerPhone: '',
  equipment: '',
  address: {
    detail: '',
    customerName: '',
    phone: '',
  },
  paymentMethod: '',
  taskName: '', //công việc
  totalPrice: 0, //tổng tiền
  tipMoney: 0, 
  overtimePrice: 0, //phí làm việc ngoài giờ
  duration: 0,
};

export const initRegion = {
  ...DEFAULT_LAT_LONG,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};
