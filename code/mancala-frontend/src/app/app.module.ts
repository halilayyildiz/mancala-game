import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// prime-ng modules
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { GMapModule } from 'primeng/gmap';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

// components
import { MessagesComponent } from './components/messages/messages.component';
import { MenubarComponent } from './pages/menubar/menubar.component';
import { MapviewComponent } from './pages/mapview/mapview.component';

// services
import { MessageService } from './service/message.service';
import { GameService } from './service/game.service';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MenubarComponent,
    MapviewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    TableModule,
    CardModule,
    ChartModule,
    MenubarModule,
    SidebarModule,
    GMapModule,
    ToolbarModule,
    SplitButtonModule,
    ToggleButtonModule,
    TooltipModule,
    DialogModule,
    ButtonModule
  ],
  providers: [
    MessageService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
