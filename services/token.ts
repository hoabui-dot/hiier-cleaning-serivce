import http from './http';

export const addAuthorizationHeader = (token: string) => {
  if (token) {
    http.defaults.headers.common['Authorization'] = '';
    delete http.defaults.headers.common['Authorization'];
    http.defaults.headers.common['Authorization'] = token;
  }
};

export const removeAuthorizationHeader = () => {
  http.defaults.headers.common['Authorization'] = '';
  delete http.defaults.headers.common['Authorization'];
};
