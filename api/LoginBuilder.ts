// api/LoginBuilder.ts
import { LoginPOJO } from './LoginPOJO';
import { ConfigsGlobal } from '../api/ConfigsGlobal';

export class LoginBuilder {
  static getDataLogin(): LoginPOJO {
    return {
      email: ConfigsGlobal.USERNAME,
      password: ConfigsGlobal.PASSWORD,
    };
  }
}
console.log('ConfigsGlobal.USERNAME:', ConfigsGlobal.USERNAME);
console.log('ConfigsGlobal.PASSWORD:', ConfigsGlobal.PASSWORD);
