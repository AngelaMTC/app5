import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

// Importar Router Module de @angular/router:
import { RouterModule } from '@angular/router';

// Importar la clase creada en el archivo app.routes.ts:
import { routes } from './../app/app.routes';

// Para trabajar con formularios:
import { FormsModule } from '@angular/forms';

// Para trabajar con formularios reactivos:
import { ReactiveFormsModule } from '@angular/forms';
// Para peticiones HTTP es necesaior importar:
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
