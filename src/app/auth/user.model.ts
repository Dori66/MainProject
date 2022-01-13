export class User {
  constructor(public email: string, public id:string, private _token: string, private _TokenExpiration: Date) {
  }
  get token() {
    if (!this._TokenExpiration || new Date() > this._TokenExpiration){
      return null;
    }
    return this._token;
  }
}
