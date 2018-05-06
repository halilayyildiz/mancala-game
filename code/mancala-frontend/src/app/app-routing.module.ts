import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapviewComponent } from './pages/mapview/mapview.component';

const routes: Routes = [
    { path: '', redirectTo: 'mapview', pathMatch: 'full' },
    { path: 'mapview', component: MapviewComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
