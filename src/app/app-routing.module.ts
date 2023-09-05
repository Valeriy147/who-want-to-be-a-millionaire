import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/greetings', pathMatch: 'full' },
  {
    path: 'greetings',
    loadComponent: () =>
    import('./greetings/greetings.component').then(
      (module) => module.GreetingsComponent,
    ),
  },
  {
    path: 'creation',
    loadComponent: () =>
    import('./creation/creation.component').then(
      (module) => module.CreationComponent,
    ),
  },
  {
    path: 'play',
    loadComponent: () =>
    import('./play/play.component').then(
      (module) => module.PlayComponent,
    ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
