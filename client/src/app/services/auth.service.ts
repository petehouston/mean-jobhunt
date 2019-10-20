import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

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
    return this.http.post('http://localhost:4000/api/login', {email, password})
      .pipe(
        map(payload => {
          const user = {email, access_token: payload['access_token'] };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post('http://localhost:4000/api/register', {name, email, password})
      .pipe(
        map(payload => {
          return payload['status'] === 'success';
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
