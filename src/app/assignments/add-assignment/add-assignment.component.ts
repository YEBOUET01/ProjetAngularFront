import { Component } from '@angular/core';
// formulaires et champs de saisie...
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, 
    MatButtonModule, CommonModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
//nomEleve: any;
  constructor(private assignmentsService:AssignmentsService,
              private router:Router,
       
  ) { }

  // pour le formulaire
  nomDevoir = '';
  dateDeRendu = null;
  nomEleve = '';
  Matiere = '';
  Note = 0 ;
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

    // Ajoutez d'autres matières ici si nécessaire
  };

  get matiereImage() {
    return this.matieresImages[this.Matiere]?.matiereImg || '';
  }

  get profImage() {
    return this.matieresImages[this.Matiere]?.profImg || '';
  }




  onSubmit() {
    if(this.nomDevoir === '' || this.nomEleve == '' || this.Matiere == '' || this.dateDeRendu === null) return;

   console.log("Bouton cliqué, on ajoute le devoir : " + this.nomDevoir + 
   " à rendre pour le " + this.dateDeRendu);

   // On crée un nouvel assignment avec les valeurs du formulaire
   let a = new Assignment();
   a.devoir = this.nomDevoir;
   a.matiere = this.Matiere;
   a.nom = this.nomEleve;
   a.note = this.Note;
   a.dateDeRendu = this.dateDeRendu;
   a.rendu = false;
   a.remarque = this.Remarque;




   // On ajoute cet assignment au tableau des assignments
   // via le service
    this.assignmentsService.addAssignment(a)
    .subscribe(message => {
      console.log(message);
      // il faudrait cacher maintenant le formulaire et 
      // afficher la liste des assignments à jour
      this.router.navigate(['/home']);
    });
 }

}
