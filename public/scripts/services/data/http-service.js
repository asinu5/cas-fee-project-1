class HttpService {
  ajax(method, url, data = '', headers) {
    const fetchHeaders = new Headers({ 'content-type': 'application/json', ...(headers || {}) });
    console.log(method);
    return fetch(url, {
      method,
      headers: fetchHeaders,
      body: JSON.stringify(data),
    }).then((x) => x.json());
  }
}

export default new HttpService();
