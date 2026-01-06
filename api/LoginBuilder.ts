// api/LoginBuilder.ts
import { LoginPOJO } from './LoginPOJO';
import { ConfigsGlobal } from '../api/ConfigsGlobal';

export class LoginBuilder {
  static getDataLogin(): LoginPOJO {
    return {
      username: ConfigsGlobal.USERNAME,
      password: ConfigsGlobal.PASSWORD,
    };
  }
}
