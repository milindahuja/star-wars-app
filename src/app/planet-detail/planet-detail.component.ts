import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Planet, PlanetResponse } from '../interface/interface';

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit{
  
  planet: PlanetResponse | null = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const planetUid = params['id'];
      if (planetUid) {
        this.loadPlanetDetails(planetUid);
      }
    });
  }

  loadPlanetDetails(planetUid: string) {
    this.dataService.getPlanetById(planetUid).subscribe((response: PlanetResponse) => {
      this.planet = response;
    });
  }

  goBackToCharacterDetail() {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      characterUid: this.route.snapshot.queryParams['characterUid'] || '', // Get the character UID from query params
    };
  
    this.router.navigate(['/characters/details', queryParams.characterUid], { queryParams });
  }
}
