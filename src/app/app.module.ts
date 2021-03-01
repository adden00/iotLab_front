import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { FormsModule } from '@angular/forms';
import { TerminalButtonComponent } from './terminal-button/terminal-button.component';
import { PopUpMenuComponent } from './pop-up-menu/pop-up-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    TerminalButtonComponent,
    PopUpMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
