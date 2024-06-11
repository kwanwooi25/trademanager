import { headers } from 'next/headers';

export function getUrl() {
  return new URL(headers().get('x-url')!);
}

export function getCurrentUrl() {
  const { pathname, search } = getUrl();
  return `${pathname}${search}`;
}

export function getCallbackUrl(url: string) {
  const { pathname, searchParams } = new URL(url);
  searchParams.set('timestamp', new Date().toTimeString());
  return `${pathname}?${searchParams.toString()}`;
}
