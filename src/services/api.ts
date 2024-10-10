import axios from 'axios';
import { API_URL } from '../configs/constants.ts';
import { getParams } from '../utils/functions.ts';

export async function getData (resource:string, data:array) {
  let url = `${API_URL}/${resource}.php`;
  if (data !== undefined) {
    url += getParams(data);
  }
  try {
    const RESPONSE = await axios.get(url).then((res) => { return res.json(); });
    if (RESPONSE !== undefined) {
      return RESPONSE.data ?? [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}

export async function sendData (resource:string, data:array) {
  let url = `${API_URL}/${resource}.php`;
  try {
    const RESPONSE = await axios.post(url,{
      method:'post',
      data: JSON.stringify(data)
    }).then((res) => { return res.json(); });
    if (RESPONSE !== undefined) {
      return RESPONSE.data ?? [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}


export async function updateData (resource:string, data:array) {
  let url = `${API_URL}/${resource}.php`;
  try {
    const RESPONSE = await axios.put(url,{
      method:'put',
      data: JSON.stringify(data)
    }).then((res) => { return res.json(); });
    if (RESPONSE !== undefined) {
      return RESPONSE.data ?? [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}