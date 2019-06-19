import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgbModalModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {CKEditorModule} from 'ckeditor4-angular';
// import {CKEditorModule} from 'ng2-ckeditor';
import {ToastrModule} from 'ngx-toastr';
import {SidebarModule} from 'primeng/sidebar';
import {ContextMenuModule} from 'primeng/contextmenu';
import {TreeTableModule} from 'primeng/treetable';


import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {NgxUiLoaderHttpModule, NgxUiLoaderModule} from 'ngx-ui-loader';

import {appComponents, appEntryComponents, appServices} from './app-component-declaration';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


@NgModule({
  declarations: appComponents,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DragAndDropModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbTooltipModule.forRoot(),
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true, exclude: [
        'api/project/autocomplete',
        'api/task/autocomplete',
        'api/timesheet/GetAllProjectRolesByProject'
      ]
    }),
    AutocompleteLibModule,
    ToastrModule.forRoot(),
    // NgxEditorModule,
    CKEditorModule,
    SidebarModule,
    ContextMenuModule,
    TreeTableModule,
    // MenuItem,
  ],
  providers: appServices,
  bootstrap: [AppComponent],
  entryComponents: appEntryComponents
})
export class AppModule {
}
