import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { RegisterComponent } from './register/register.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { PlaylistsOverviewComponent } from './playlists-overview/playlists-overview.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddPlaylistDialogComponent } from './add-playlist-dialog/add-playlist-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { EditAccountDialogComponent } from './edit-account-dialog/edit-account-dialog.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { DeleteAccountAlertComponent } from './delete-account-alert/delete-account-alert.component';
import { BrowseOverviewComponent } from './browse-overview/browse-overview.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import {MatTableModule} from '@angular/material/table';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { DeletePlaylistAlertComponent } from './delete-playlist-alert/delete-playlist-alert.component';
import { SongDetailDialogComponent } from './song-detail-dialog/song-detail-dialog.component';
import { EditPlaylistDialogComponent } from './edit-playlist-dialog/edit-playlist-dialog.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddSongDialogComponent } from './add-song-dialog/add-song-dialog.component';
import { GetSongDialogComponent } from './get-song-dialog/get-song-dialog.component';
import { DeleteSongDialogComponent } from './delete-song-dialog/delete-song-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { ChangeUserRoleDialogComponent } from './change-user-role-dialog/change-user-role-dialog.component';
import { AnalyticsOverviewComponent } from './analytics-overview/analytics-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    AccountOverviewComponent,
    PlaylistsOverviewComponent,
    AddPlaylistDialogComponent,
    EditAccountDialogComponent,
    ChangePasswordDialogComponent,
    DeleteAccountAlertComponent,
    BrowseOverviewComponent,
    PlaylistDetailComponent,
    SongDetailComponent,
    DeletePlaylistAlertComponent,
    SongDetailDialogComponent,
    EditPlaylistDialogComponent,
    AdminDashboardComponent,
    AddSongDialogComponent,
    GetSongDialogComponent,
    DeleteSongDialogComponent,
    DeleteUserDialogComponent,
    ChangeUserRoleDialogComponent,
    AnalyticsOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatExpansionModule
  ],
  entryComponents: [AddPlaylistDialogComponent, EditAccountDialogComponent, ChangePasswordDialogComponent,
    DeleteAccountAlertComponent, DeletePlaylistAlertComponent, SongDetailDialogComponent, EditPlaylistDialogComponent,
    AddSongDialogComponent, GetSongDialogComponent, DeleteSongDialogComponent, DeleteUserDialogComponent,
    ChangeUserRoleDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
