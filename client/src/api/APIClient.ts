type METHODS = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const methodTypes: METHODS[] = ['GET', 'POST', 'PATCH', 'DELETE'];

const APIClient = {
  create(baseUrl) {
    return createHandlers(baseUrl, methodTypes);
  },
};

function createHandlers(baseUrl, methods) {
  const client = Object.create(null);
  for (const key of methods) {
    client[key.toLowerCase()] = buildHandlers(baseUrl, key);
  }
  return client;
}

function buildHandlers(baseUrl, type: METHODS) {
  const base = `${baseUrl}`;
  return async (
    path: string,
    inputs: { [key: string]: string },
    options?: { signal?: AbortSignal },
  ) => {
    let url = `${base}${path}`;

    const headers: { [key: string]: string } = {
      Accept: 'application/json, text/plain, */*',
    };
    const init: RequestInit = {
      method: type,
      mode: 'cors',
      headers,
    };

    if (inputs !== undefined) {
      if (type === 'GET') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        url += queryStringSerialize(inputs);
      } else {
        headers['Content-Type'] = 'application/json';
        init.body = JSON.stringify(inputs);
      }
    }

    if (options !== undefined && options.signal !== undefined) {
      init.signal = options.signal;
    }

    const response = await fetch(url, init);
    const results = await response.json();
    if (response.ok) {
      return results;
    } else {
      throw new Error(results.error);
    }
  };
}

function queryStringSerialize(input: unknown): string {
  const query: Array<string> = [];
  for (const [key, value] of Object.entries(input)) {
    const encodedKey = encodeURIComponent(key);
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const encodedValue = queryStringValueSerialize(value[i]);
        query.push(`${encodedKey}=${encodedValue}`);
      }
    } else {
      const encodedValue = queryStringValueSerialize(value);
      query.push(`${encodedKey}=${encodedValue}`);
    }
  }
  return query.length > 0 ? '?' + query.join('&') : '';
}

/**
 * JSON stringifies all values except for strings that start with a letter and
 * aren’t a JSON keyword.
 */
function queryStringValueSerialize(value: string): string {
  if (typeof value === 'string' && !isSyntaxJSON(value)) {
    return encodeURIComponent(value);
  } else {
    return encodeURIComponent(JSON.stringify(value));
  }
}

export function isSyntaxJSON(value: string): boolean {
  return (
    value === 'true' ||
    value === 'false' ||
    value === 'null' ||
    value[0] === '{' ||
    value[0] === '[' ||
    value[0] === '"' ||
    // adapted from https://stackoverflow.com/a/13340826/1568890
    /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?$/.test(value)
  );
}

export const API = APIClient.create('http://localhost:8080');
