export function getParams (data:array) {
  let query:array = [];
    if (typeof (data) === 'object') {
        data = Object.entries(data).map(([key, value]) => `${key}=${value}`);
    }
    if (data.length > 1) query = data.join("&");
    return query;
}