import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { adminGuard } from './shared/admin.guard'; 
import { AssignmentsScrollingComponent } from './assignments/assignments-scrolling/assignments-scrolling.component';
import { LoginComponent } from './assignments/login/login.component'; 

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: AssignmentsComponent },
    { path: 'scrolling', component: AssignmentsScrollingComponent },
    { path: 'add', component: AddAssignmentComponent}, 
    { path: 'assignments/:id', component: AssignmentDetailComponent },
    { path: 'assignments/:id/edit', component: EditAssignmentComponent, canActivate: [authGuard, adminGuard] }, // Seulement les admins peuvent éditer des assignments
    // redirection pour les routes incorrectes
    { path: '**', redirectTo: 'home' }
];
