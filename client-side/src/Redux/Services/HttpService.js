export default class HttpService{

  SendRequest = async(url, RequestOptions) => {
    // const token = await localStorage.getItem(tokenId);
    // const requestOptions = this.RequestOptions(token, credentials);
    return fetch(url, RequestOptions)
      .then(response=>{return response});
  }
}

