import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailComponent } from '../detail-component.component';

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [CommonModule, DetailComponent],
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent {
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  goBackToCharacterDetail() {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      characterUid: this.route.snapshot.queryParams['characterUid'] || '', // Get the character UID from query params
    };
    this.router.navigate(['/details/character', queryParams.characterUid], { queryParams });
  }
  
}
