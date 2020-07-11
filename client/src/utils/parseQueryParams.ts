import queryString from 'query-string';

export function parseQueryParams(location: string) {
  const parsedURL = queryString.parse(location);
  return parsedURL as { [key in keyof typeof parsedURL]: string };
}
