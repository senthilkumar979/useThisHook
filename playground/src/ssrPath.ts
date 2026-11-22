let pathname = '/';

export function setSsrPathname(next: string) {
  pathname = next;
}

export function getSsrPathname() {
  return pathname;
}
