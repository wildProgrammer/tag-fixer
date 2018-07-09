import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagEditComponent } from './components/tag-edit/tag-edit.component'
import { DisplayMenuComponent } from './components/display-menu/display-menu.component'
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        
    },
    {
        path: 'display',
        component: DisplayMenuComponent,
    }
    
    
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
