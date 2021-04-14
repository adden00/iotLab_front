import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TerminalButtonComponent } from './terminal-button/terminal-button.component';
import { PopUpMenuComponent } from './pop-up-menu/pop-up-menu.component';
import { ElectronicComponentComponent } from './electronic-component/electronic-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TerminalButtonComponent,
    TerminalButtonComponent,
    PopUpMenuComponent,
    ElectronicComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
