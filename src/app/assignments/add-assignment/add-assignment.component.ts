import { Component } from '@angular/core';
// formulaires et champs de saisie...
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, 
    MatButtonModule],
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
  //selectedFile: File | undefined;


  onSubmit() {
    if(this.nomDevoir === '' || this.nomEleve == '' || this.Matiere == '' || this.dateDeRendu === null) return;

   console.log("Bouton cliqué, on ajoute le devoir : " + this.nomDevoir + 
   " à rendre pour le " + this.dateDeRendu);

   // On crée un nouvel assignment avec les valeurs du formulaire
   let a = new Assignment();
   a.devoir = this.nomDevoir;
   a.matiere = this.Matiere;
   a.nom = this.nomDevoir;
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
