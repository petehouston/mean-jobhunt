import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment as env} from "../../environments/environment";

const LOGIN_API = `${env.api.basepath}/auth/${env.api.routes['auth'].login}`;
const REGISTER_API = `${env.api.basepath}/auth/${env.api.routes['auth'].register}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post(LOGIN_API, {email, password})
      .pipe(
        map(response => {
          const user = {email, access_token: response['payload']['access_token'] };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(REGISTER_API, {name, email, password})
      .pipe(
        map(response => {
          return response['status'] === 'success';
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
