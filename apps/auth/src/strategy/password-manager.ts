import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordManager {
  encode(value: string) {
    var signedPayload = hash(value, 10);
    return signedPayload;
  }

  verify(value: string, hash: string) {
    return compare(value, hash);
  }
}
