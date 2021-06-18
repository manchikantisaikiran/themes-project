import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesOfferedComponent } from './services-offered/services-offered.component';
import { ImageCompressionComponent } from './image-compression/image-compression.component';
import { HttpClientModule } from '@angular/common/http';
// import { CompressImageService } from './services/compress-image.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoComponent } from './logo/logo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    FooterComponent,
    ContactComponent,
    ServicesOfferedComponent,
    ImageCompressionComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HomeComponent,
    DashboardComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BootstrapIconsModule.pick(allIcons),
    BrowserAnimationsModule
  ],
  providers: [
    // CompressImageService,
    NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
