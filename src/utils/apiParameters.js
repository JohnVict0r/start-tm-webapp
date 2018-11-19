import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import { getAuthToken } from '@/utils/authentication';

export function normalizeReponse(reponseJson, schema) {
  let result;

  /*
   * converte os campos de, por exemplo,
   * 'last_name' para 'lastName'
   */
  const json = camelizeKeys(reponseJson);

  if (schema && (isObject(json.data) || isArray(json.data))) {
    result = normalize(json.data, schema);
  } else {
    result = json.data;
  }

  if (json.meta && json.meta.pagination) {
    result = { ...result, pagination: json.meta.pagination };
  }

  return result;
}

export function returnParams(endpoint) {
  // API_URL defined in .env
  const url = API_URL + endpoint;

  const token = getAuthToken();

  return {
    action: url,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
}
