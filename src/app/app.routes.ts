import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', // Ruta vacía para la redirección
        redirectTo: '',
        pathMatch: 'prefix', // Opcional: para que coincida con cualquier ruta vacía
      },
      {
        path: 'forms', // Ruta principal
        loadComponent: () => import('./form-validators/form-validators.component'),
      },
];
