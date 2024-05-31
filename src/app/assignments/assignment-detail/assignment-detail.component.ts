import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
 
@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatCheckboxModule,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'] 
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis: Assignment | undefined;
  isAdmin = false;

  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe(a => {
      this.assignmentTransmis = a;
    });

    this.checkAdminStatus();
  }

  checkAdminStatus(): void {
    this.authService.isAdmin().then(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/detail']);
        this.snackBar.open('Le devoir a bien été rendu', 'Fermer', {
        duration: 4000
        });
      });
  }

  onDelete() {
    if (!this.assignmentTransmis) return;

    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
        this.assignmentTransmis = undefined;
        this.snackBar.open('Le devoir a bien été supprimé', 'Fermer', {
          duration: 4000
        });
      });
  }

  onClickEdit() {
    this.router.navigate(['/assignments', this.assignmentTransmis?._id, 'edit'], {
      queryParams: { nom: 'toto', debug: true },
      fragment: 'edition'
    });
  }
}
