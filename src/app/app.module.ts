import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgbModalModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { CKEditorModule } from "ckeditor4-angular";
// import {CKEditorModule} from 'ng2-ckeditor';
import { ToastrModule } from "ngx-toastr";
import { SidebarModule } from "primeng/sidebar";
import { ContextMenuModule } from "primeng/contextmenu";
import { TreeTableModule } from "primeng/treetable";
import { AccordionModule } from "primeng/accordion";
import { DropdownModule } from "primeng/dropdown";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { TagInputModule } from "ngx-chips";
import { TreeviewModule } from "ngx-treeview";
import { DragAndDropModule } from "angular-draggable-droppable";
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

import {
  appComponents,
  appEntryComponents,
  appServices
} from "./app-component-declaration";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: appComponents,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragAndDropModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbTooltipModule.forRoot(),
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
      exclude: [
        "api/project/autocomplete",
        "api/task/autocomplete",
        "api/timesheet/GetAllProjectRolesByProject"
      ]
    }),
    AutocompleteLibModule,
    ToastrModule.forRoot(),
    // NgxEditorModule,
    CKEditorModule,
    SidebarModule,
    ContextMenuModule,
    TreeTableModule,
    AccordionModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    CalendarModule,
    TreeviewModule.forRoot(),
    TagInputModule
    // MenuItem,
  ],
  providers: appServices,
  bootstrap: [AppComponent],
  entryComponents: appEntryComponents
})
export class AppModule {}
