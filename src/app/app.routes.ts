import { Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HistoryComponent } from './pages/history/history.component';
import { DetailComponent } from './pages/history/detail/detail.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'connexion',
        data:{
            id: null,
            pseudo: null,
            telephone: null,
        },
        component: ConnexionComponent
    },
    {
        path: 'inscription',
        component: InscriptionComponent
    },
    {
        path: 'history',
        children: [
            {
                path: '',
                component: HistoryComponent,
            },
            {
                path: 'detail/:id',
                component: DetailComponent
            }
        ]
    }
];
