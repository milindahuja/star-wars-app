import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Planet, PlanetResponse } from '../interface/interface';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit{
  
  planet: Planet | null = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private cacheService: CacheService
  ) {}


  ngOnInit(): void {
    /* this.route.params.subscribe(params => {
      const planetUid = params['id'];
      if (planetUid) {
        this.loadPlanetDetails(planetUid);
      }
    }); */
    const planetUid = this.route.snapshot.params['id'];

    // Check if planet data is in the cache
    const cachedPlanet = this.cacheService.getData(`planet-${planetUid}`);

    if (cachedPlanet) {
      this.planet = cachedPlanet;
    } else {
      // Fetch planet data from API
      this.loadPlanetDetails(planetUid);
     /*  this.dataService.getPlanetById(planetUid).subscribe((response: PlanetResponse) => {
        this.planet = response.result;

        // Store planet data in the cache
        this.cacheService.storeData(`planet-${planetUid}`, this.planet);
      }); */
    }
  }

  loadPlanetDetails(planetUid: string) {
    this.dataService.getPlanetById(planetUid).subscribe((response: PlanetResponse) => {
      this.planet = response.result;
       // Store planet data in the cache
       this.cacheService.storeData(`planet-${planetUid}`, this.planet);
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
