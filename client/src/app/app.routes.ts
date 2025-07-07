import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    {
        path: 'map',
        loadComponent: () =>
            import('./world-map/world-map').then(c => c.WorldMap)
    }
];