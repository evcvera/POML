import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationModelService} from "./authentication-model.service";
import {UserDataModelService} from "./user-data-model.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGoogleService {

  oAuthConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: window.location.origin,
    clientId: '505960415454-ov0v0c2rh6hchkedgkrq6rqgjm3n3nad.apps.googleusercontent.com',
    scope: 'openid profile email',
    showDebugInformation: true,
  }

  constructor(public http: HttpClient,
              public  oAuthService: OAuthService,
              public  authenticationService: AuthenticationModelService,
              public  userDataModelService: UserDataModelService,
              public  router: Router) {
  }

  loadProfile(): void {
    if (!this.authenticationService.currentUserSubject$.value) {
      this.oAuthService.configure(this.oAuthConfig)
      this.oAuthService.loadDiscoveryDocument().then((x) => {
        this.oAuthService.tryLoginImplicitFlow().then((x) => {
          if (this.oAuthService.hasValidIdToken()) {
            this.authenticationService.gLogin(this.oAuthService.getAccessToken()).subscribe(result => {
              this.oAuthService.logOut()
            })
          }
        })
      })
    }
  }


  googleLogin(): void {
    this.oAuthService.configure(this.oAuthConfig)
    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (!this.oAuthService.hasValidIdToken()) {
          this.oAuthService.initLoginFlow()
        }
      })
    })
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  signOut() {
    localStorage.removeItem('currentUser');
    this.oAuthService.logOut()
    this.authenticationService.currentUserSubject$.next({});
    this.userDataModelService.userData$.next({});
    this.router.navigate(['/']).then()

  }

  getToken(): void {
    this.oAuthService.tryLoginImplicitFlow().then(() => {
      console.log(this.oAuthService.getAccessToken())
      //console.log(this.oAuthService.getIdentityClaims())
      //console.log(this.oAuthService.getGrantedScopes())
    })
  }

  test(): void {
    this.oAuthService.loadUserProfile().then((userProfile) => {
      console.log(JSON.stringify(userProfile))
    })
  }
}
