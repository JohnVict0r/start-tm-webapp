import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import request from '@/utils/request';
import { getAuthToken } from '@/utils/authentication';

/**
 * Processa a resposta da requisição e tenta normalizá-la
 *
 * @param reponseJson
 * @param schema esquema para normalização
 * @returns {*}
 */
function normalizeJson(json, schema) {
  let result;

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

async function handleError(e) {
  // if validation error
  if (e.response && e.response.status === 422) {
    const response = await e.response.json();
    return camelizeKeys(response);
  }

  return e;
}

async function handleRequest(url, options, schema, skipNormilization) {
  if (!skipNormilization) {
    try {
      const response = await request(url, options);
      const reponseJson = camelizeKeys(response);
      return normalizeJson(reponseJson, schema);
    } catch (e) {
      return handleError(e);
    }
  } else {
    const reponse = await request(url, options);
    return camelizeKeys(reponse);
  }
}

/**
 * Cliente para consulta a API Rest.
 */
export function callApi(endpoint, schema, skipNormilization) {
  // API_URL defined in .env
  const url = API_URL + endpoint;

  const token = getAuthToken();
  const options = {
    // TODO quando o bug abaixo for resolvido e alterado, remover o atributo crendentials
    // https://github.com/spatie/laravel-cors/issues/28
    credentials: 'same-origin',
    headers: { Authorization: `Bearer ${token}` },
  };

  return {
    post: data =>
      handleRequest(url, { method: 'POST', data, ...options }, schema, skipNormilization),
    put: data => handleRequest(url, { method: 'PUT', data, ...options }, schema, skipNormilization),
    delete: () => handleRequest(url, { method: 'DELETE', ...options }, schema, skipNormilization),
    get: () => handleRequest(url, options, schema, skipNormilization),
  };
}

async function handleRequestFake(url, options, schema, skipNormilization) {
  if (!skipNormilization) {
    try {
      // const response = await request(url, options);
      const response = {
        data: {
          id: 1,
          name: 'Admin',
          cpf: '000.000.000-00',
          email: 'admin@example.org',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUC0LYGdxwCD9TEukVRqL3OWRqTyT95SoupznUTkGm49-uwyM33A',
          role: {
            id: 1,
            name: 'Administrador',
          },
        },
      };
      const reponseJson = camelizeKeys(response);
      return normalizeJson(reponseJson, schema);
    } catch (e) {
      return handleError(e);
    }
  } else {
    const reponse = await request(url, options);
    return camelizeKeys(reponse);
  }
}

/**
 * Cliente para consulta teste
 */
export function callApiFake(endpoint, schema, skipNormilization) {
  // API_URL defined in .env
  const url = API_URL + endpoint;

  const token = getAuthToken();
  const options = {
    // // TODO quando o bug abaixo for resolvido e alterado, remover o atributo crendentials
    // // https://github.com/spatie/laravel-cors/issues/28
    // credentials: 'same-origin',
    headers: { Authorization: `Bearer ${token}` },
  };

  return {
    post: data =>
      handleRequestFake(url, { method: 'POST', data, ...options }, schema, skipNormilization),
    put: data =>
      handleRequestFake(url, { method: 'PUT', data, ...options }, schema, skipNormilization),
    delete: () =>
      handleRequestFake(url, { method: 'DELETE', ...options }, schema, skipNormilization),
    get: () => handleRequestFake(url, options, schema, skipNormilization),
  };
}
