import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importation des directives custom
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';
import { FormsModule } from '@angular/forms';

// angular material
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from  '@angular/material/card' ;
import { MatIconModule } from '@angular/material/icon';


import { RouterLink } from '@angular/router';

import { Assignment } from './assignment.model'; 

import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';

// Composant qui gère l'affichage d'une liste de devoirs (assignments)
@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, RenduDirective, NonRenduDirective,
    MatListModule, MatButtonModule, RouterLink, MatInputModule,
    MatFormFieldModule, MatSliderModule, FormsModule, MatTableModule,
    AssignmentDetailComponent, AddAssignmentComponent, MatPaginatorModule, MatCardModule, MatIconModule
  ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  titre = "Liste des devoirs à faire :";
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu'];
  pageSizeOptions = [5, 10, 25, 50, 100];

  assignments: Assignment[] = [];
  totalDocs =0;
  limit = 10;
  page = 1;
  totalPages = 0;
  pagingCounter = 0;
  hasPrevPage= false
  hasNextPage = false;
  prevPage = 0;
  nextPage = 0;
   


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
  Matiere: any;
  
    getmatiereImage(matiere: string){
      return this.matieresImages[matiere]?.matiereImg || '';
    }
  
    getprofImage(matiere: string) {
      return this.matieresImages[matiere]?.profImg || '';
    }

  
    trackByFn(index: number, item: Assignment) {
      return item._id; 
    }
    

  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit() {
    console.log("AVANT AFFICHAGE, on demande au service les données !");

    this.getAssignments();
  }

  getAssignments() {
    // on va initialiser le tableau avec des données
    this.assignmentsService.getAssignments(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
        // on initialise les propriétés en fonction des résultats reçus
        this.totalDocs = data.totalDocs;
        this.limit = data.limit;
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.pagingCounter = data.pagingCounter;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.prevPage = data.prevPage;
        this.nextPage = data.nextPage;

        console.log("Dans le subscribe, données reçues !")
      });
    console.log("APRES APPEL DU SERVICE !");
  }

  getColor(a: any) {
    if (a.rendu) {
      return 'green';
    } else {
      return 'red';
    }
  }




  

  // Pour le paginator
  handlePageEvent(e: PageEvent) {
    //this.pageEvent = e;
    //this.totalPages = e.length;
    this.limit = e.pageSize;
    this.page = e.pageIndex+1;

    console.log("Dans handlePageEvent, page=" + this.page + " limit=" + this.limit)
    this.getAssignments();
  }
}
