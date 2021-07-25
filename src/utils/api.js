import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const apiVersion = 'v1';

// const apiRoot = `https://rapidboxing.com/api/${apiVersion}`;
const apiRoot = `http://localhost:3000/api/${apiVersion}`;

const instance = axios.create({
  baseURL: apiRoot,
  timeout: 60000,
});

const request = (method, url, data) => {
  return new Promise((resolve, reject) => {
    (() => {
      if (method === 'get') {
        return instance.request({
          url,
          method,
          params: data,
          headers: {},
        });
      } else {
        return instance.request({
          url,
          method,
          data,
          headers: {},
        });
      }
    })()
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err.response);
      });
  });
};

const setAuthToken = async key => {
  const tokenString = await AsyncStorage.getItem(key);
  if (tokenString) {
    const token = JSON.parse(tokenString);

    instance.defaults.headers.common['access-token'] = token.auth_token;
    instance.defaults.headers.common['client'] = token.client;
    instance.defaults.headers.common['uid'] = token.uid;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default {
  get: (endpoint, data) => {
    return request('get', endpoint, data);
  },
  post: (endpoint, data) => {
    return request('post', endpoint, data);
  },
  put: (endpoint, data) => {
    return request('put', endpoint, data);
  },
  del: (endpoint, data) => {
    return request('delete', endpoint, data);
  },
  setAuthToken: setAuthToken,
};
