import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WavesModule, InputsModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';


import { 
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatRadioModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './reusable_component/login_dialog/login/login.component';
import { RegisterComponent } from './reusable_component/login_dialog/register/register.component';
import { NavigationComponent } from './reusable_component/navigation/navigation.component';
import { MainPageComponent } from './page_component/main_page/main_page.component';
import { ExplorePageComponent } from './page_component/explore_page/explore_page.component';
import { SearchComponent } from './reusable_component/search/search.component';
import { InstructionComponent } from './reusable_component/instruction/instruction.component';
import { RequestFormComponent } from './reusable_component/request_form/request_form.component';
import { OrganizePageComponent } from './page_component/organize_page/organize_page.component';
import { RestaurantPageComponent } from './page_component/restaurant_page/restaurant_page.component';
import { ReviewDialogComponent } from './reusable_component/review_dialog/review_dialog.component';
import { LoginDialogComponent } from './reusable_component/login_dialog/login_dialog.component';
import { NotificationPageComponent } from './page_component/notification_page/notification_page.component';
import { RequestInfoCardComponent } from './reusable_component/request_info_card/request_info_card.component';
import { RestaurantInfoCardComponent } from './reusable_component/restaurant_info_card/restaurant_info_card.component';
import { FilterDialogComponent } from './reusable_component/filter_dialog/filter_dialog.component';
import { InvitationPageComponent } from './reusable_component/invitation_request/invitation_request.component';
import { InvitationInfoComponent } from './reusable_component/invitation_request/invitation_info/invitation_info.component'
import { MergePageComponent } from './reusable_component/merge_request/merge_request.component';
import { MergeInfoComponent } from './reusable_component/merge_request/merge_info/merge_info.component';
import { InviteDialogComponent } from './reusable_component/request_info_card/invite_dialog/invite_dialog.component';

import { RestaurantManipulationService } from '../service/restaurant_manipulation.service';
import { MealRequestManipulationService } from '../service/meal_request_manipulation.service';
import { CommunicationService } from '../service/communication.service';
import { UserService } from '../service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    MainPageComponent,
    NavigationComponent,
    InstructionComponent,
    ExplorePageComponent,
    RequestFormComponent,
    OrganizePageComponent,
    LoginDialogComponent,
    FilterDialogComponent,
    ReviewDialogComponent,
    RestaurantPageComponent,
    RequestInfoCardComponent,
    NotificationPageComponent,
    RestaurantInfoCardComponent,
    InvitationInfoComponent,
    InvitationPageComponent,
    MergePageComponent,
    MergeInfoComponent,
    InviteDialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    WavesModule, 
    InputsModule, 
    ButtonsModule, 
    IconsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule
  ],
  providers: [
    RestaurantManipulationService,
    MealRequestManipulationService,
    CommunicationService,
    UserService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ReviewDialogComponent, LoginDialogComponent, FilterDialogComponent, InviteDialogComponent]
})
export class AppModule { }
