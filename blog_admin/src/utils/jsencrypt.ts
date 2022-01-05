import { JSEncrypt } from 'jsencrypt';

import { public_key } from './public_key';

const encryptor = new JSEncrypt({
  default_key_size: '2048',
  default_public_exponent: '65537',
});
encryptor.setPublicKey(public_key);

export const encrypt = (str: string): string | false => encryptor.encrypt(str);
