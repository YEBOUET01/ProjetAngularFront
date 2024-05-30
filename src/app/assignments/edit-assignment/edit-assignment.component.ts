import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


import { CommonModule } from '@angular/common'
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
 selector: 'app-edit-assignment',
 standalone: true,
 providers: [provideNativeDateAdapter()],
 imports: [
   FormsModule,
   MatInputModule,
   MatFormFieldModule,
   MatDatepickerModule,
   MatButtonModule,
   CommonModule,
   MatSnackBarModule
 ],
 templateUrl: './edit-assignment.component.html',
 styleUrl: './edit-assignment.component.css',
})

export class EditAssignmentComponent {
  assignment: Assignment | undefined;
  // Pour les champs de formulaire
  nomAssignment = '';
  dateDeRendu?: Date = undefined;
  Note = 0;
  Devoir = "";
  Matiere = "";
  Remarque = '';


   // Mapping des matières vers leurs images
   matieresImages: { [key: string]: { matiereImg: string; profImg: string; } } = {
    'Mathematiques': {
      matiereImg: 'assets/images/maths.png',
      profImg: 'assets/images/prof_maths.jpeg'
    },
    'Physique': {
      matiereImg: 'assets/images/physique.png',
      profImg: 'assets/images/prof_physique.jpg'
    },
    'SVT': {
      matiereImg: 'assets/images/svt.jpg',
      profImg: 'assets/images/prof_svt.jpg'
    },
    'Histoire': {
      matiereImg: 'assets/images/histoire.png',
      profImg: 'assets/images/prof_histoire.jpg'
    },
    'Espagnol': {
      matiereImg: 'assets/images/espagnol.jpeg',
      profImg: 'assets/images/prof_espagnol.jpg'
    },
    'Francais': {
      matiereImg: 'assets/images/francais.jpeg',
      profImg: 'assets/images/prof_francais.jpg'
    },
    'Informatique': {
      matiereImg: 'assets/images/informatique.png',
      profImg: 'assets/images/prof_informatique.jpg'
    },
    'Arts': {
      matiereImg: 'assets/images/arts.jpg',
      profImg: 'assets/images/prof_arts.jpg'
    },
    'Musique': {
      matiereImg: 'assets/images/musique.jpg',
      profImg: 'assets/images/prof_musique.jpg'
    }

  };

  get matiereImage() {
    return this.matieresImages[this.Matiere]?.matiereImg || '';
  }

  get profImage() {
    return this.matieresImages[this.Matiere]?.profImg || '';
  }

 
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // on récupère l'id dans l'URL
    const id = this.route.snapshot.params['id'];

    // on utilise le service pour récupérer l'assignment par id
    this.assignmentsService.getAssignment(id)
    .subscribe((assignment) => {
      this.assignment = assignment;
      if (!this.assignment) return;

      this.nomAssignment = this.assignment.nom;
      this.Matiere = this.assignment.matiere;
      this.Devoir = this.assignment.devoir;
      this.dateDeRendu = this.assignment.dateDeRendu;
      this.Note = this.assignment.note;
      this.Remarque = this.assignment.remarque; 
      
    });
  }
 
  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;
 
    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.note = this.Note;
    this.assignment.devoir = this.Devoir;
    this.assignment.matiere = this.Matiere;
    this.assignment.remarque = this.Remarque;

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        // navigation vers la home page, important que ce soit
        // dans le subscribe pour être sûr que la mise à jour
        // de l'assignment est terminée
       this.router.navigate(['/home']);
       console.log("ON NAVIGUE VERS HOME !")
      });
      this.snackBar.open('Le devoir a bien été modifié', 'Fermer', {
        duration: 4000
      });
      
       
  }
 }
 