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
        outlet: 'main',
        
    },
    {
        path: 'display',
        component: DisplayMenuComponent,
        outlet: 'main',
        children: [
            {
                path: 'edit/:id',
                component: TagEditComponent,
                outlet: 'display'
            },
            {
                path: 'suggest/:id',
                component: SuggestionsComponent,
                outlet: 'display'
            }

        ]
    }
    
    
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
