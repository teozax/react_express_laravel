import HttpService from './HttpService';

export const HandleRequest = (url, RequestOptions) => {
  const http = new HttpService();
  
  return http.SendRequest(url, RequestOptions).then((data) => {
    console.log(data);
    return data;
  }).catch((error) => {
    alert(error);
    return error;
  })
}
