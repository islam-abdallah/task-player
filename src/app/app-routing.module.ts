import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLoginGuard } from './core/guards/auth-login.guard';


const routes: Routes = [

    {
      path: "",
      redirectTo: "players",
      pathMatch: "full"
    },

  {
    path: "auth",
    loadChildren: () =>
      import("./components/authentication/authentication.module").then(
        mod => mod.AuthenticationModule
      ), canActivate: [AuthGuard]
  },
  {
    path: "players",
    loadChildren: () =>
      import("./components/players/players.module").then(
        mod => mod.PlayersModule
      ), canActivate: [AuthLoginGuard]
  } ,
  {
    path: "**",
    redirectTo: "players",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
