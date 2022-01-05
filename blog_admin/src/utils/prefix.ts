const { protocol, hostname } = window.location;

export const prefix = `${protocol}//${hostname}${serverPort}`;
