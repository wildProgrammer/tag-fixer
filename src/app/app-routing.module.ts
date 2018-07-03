import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagEditComponent } from './components/tag-edit/tag-edit.component'
const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }, 
    {
        path: 'edit/:id',
        component: TagEditComponent
    }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
