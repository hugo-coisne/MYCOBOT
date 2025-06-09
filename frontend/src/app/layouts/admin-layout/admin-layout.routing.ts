import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { MushroomAnalysisComponent } from 'src/app/pages/mushroom-analysis/mushroom-analysis.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'mushroom-analysis',   component: MushroomAnalysisComponent },
    { path: 'tables',         component: TablesComponent }
];
