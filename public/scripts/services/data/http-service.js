class HttpService {
  static async ajax(method, url, data = '') {
    const init = {
      method,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    };
    if (method === 'GET' || method === 'HEAD') {
      delete init.body;
    }
    return fetch(url, init).then((res) => res.json());
  }
}

export default HttpService;
