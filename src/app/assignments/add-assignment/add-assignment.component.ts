import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, 
    MatButtonModule, CommonModule, MatSnackBarModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {

  constructor(private assignmentsService:AssignmentsService,
              private router:Router,
              private snackBar: MatSnackBar
       
  ) { }

  // pour le formulaire
  nomDevoir = '';
  // dateDeRendu = null;
  nomEleve = '';
  Matiere = '';
  // Note = 0 ;
  // Remarque = '';
  

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




  onSubmit() {
    if(this.nomDevoir === '' || this.nomEleve == '' || this.Matiere == '' ) return;

   console.log("Bouton cliqué, on ajoute le devoir : " + this.nomDevoir + 
   " à rendre pour le " );

   // On crée un nouvel assignment avec les valeurs du formulaire
   let a = new Assignment();
   a.devoir = this.nomDevoir;
   a.matiere = this.Matiere;
   a.nom = this.nomEleve;
  //  a.note = this.Note;
  //  a.dateDeRendu = null;
   a.rendu = false;
  //  a.remarque = "";




   // On ajoute cet assignment au tableau des assignments
   // via le service
    this.assignmentsService.addAssignment(a)
    .subscribe(message => {
      console.log(message);
      // il faudrait cacher maintenant le formulaire et 
      // afficher la liste des assignments à jour
      this.router.navigate(['/home']);
    });
    this.snackBar.open('Le devoir a bien été ajouté', 'Fermer', {
      duration: 4000
      });
 }

}
