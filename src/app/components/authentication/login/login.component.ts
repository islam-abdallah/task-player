import { Router } from "@angular/router";
import { AuthService } from "./../../../core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  serverError: any;
  loading = false;
  returnUrl: any;
  constructor(
    public formBuilder: FormBuilder,
    private authservice: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
   const data = JSON.parse(localStorage.getItem('user_player'))
    console.log(data.organizations[data.organizationId].packages)
    this.loginForm = this.formBuilder.group({
      username: [
        "",
        Validators.compose([Validators.required])
      ],
      password: [
        "",
        Validators.compose([Validators.required])
      ]
    });
  }
  loginSubmit() {
    this.serverError = "";
    console.log(this.loginForm.value)
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authservice.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.authservice.setToken(response.Data.token);
          this.authservice.setUser(response.Data);
          this.router.navigate(['/players']);
          this.loading = false;
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          console.log('complete')
        }
      });
    }
}
