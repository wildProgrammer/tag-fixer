import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FileListPreviewComponent } from './components/file-list-preview/file-list-preview.component';
import { TagEditComponent } from './components/tag-edit/tag-edit.component';
import { RouterModule, Router } from '@angular/router';
import { FilesListService } from "./files-list.service";
import { DisplayMenuComponent } from './components/display-menu/display-menu.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { SavingModalComponent } from './components/saving-modal/saving-modal.component'
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    FileListPreviewComponent,
    TagEditComponent,
    DisplayMenuComponent,
    SuggestionsComponent,
    SavingModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    // BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, FilesListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
