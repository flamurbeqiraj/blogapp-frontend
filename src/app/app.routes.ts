import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { BlogsComponent } from './component/blog-components/blogs/blogs.component';
import { BlogComponent } from './component/blog-components/blog/blog.component';
import { PhotoAlbumComponent } from './component/photo-album/photo-album.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { BlogEditComponent } from './component/blog-components/blog-edit/blog-edit.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'blogs', component: BlogsComponent},
    {path: 'blogs/:id', component: BlogComponent},
    {path: 'photo-album', component: PhotoAlbumComponent, canActivate: [authGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'dashboard/:id', component: BlogEditComponent, canActivate: [authGuard]},
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '/not-found'}
];
