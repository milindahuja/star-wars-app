import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '../services/cache.service';
import { CharacterDetail, CharacterDetailResponse, Detail, DetailResponse, Planet, PlanetResponse } from '../interface/interface';
import { CharacterDetailComponent } from './character/character-detail.component';
import { PlanetDetailComponent } from './planet/planet-detail.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, CharacterDetailComponent, PlanetDetailComponent],
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.scss'],
})
export class DetailComponent {
  @Input() detailType: string = ''; // Input property to receive the detail data
  //@Output() goBack = new EventEmitter<void>(); // Output event to notify the parent component to navigate back
  character!: CharacterDetail;
  planet!: Planet;
  detail!: Detail;

  constructor(
    private dataService: DataService,
    private cacheService: CacheService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load the detail data based on the route parameter (e.g., characterId or planetId)
    const uid = this.route.snapshot.params['id'];
    // Check if character data is in the cache
    const cachedDetail = this.cacheService.getData(`${this.detailType}-${uid}`);

    if (cachedDetail) {
      if (this.detailType === 'people') {
        this.character = cachedDetail;
      } else {
        this.planet = cachedDetail;
      }
      this.detail = cachedDetail;
    } else {
      // Fetch character data from API
      this.loadDetailData(uid);
    }
  }

  // Load details based on detail type (planet or character)
  loadDetailData(id: string) {
    this.dataService.getDetailById(id, this.detailType).subscribe((response: any) => {
      if (this.detailType === 'people') {
        this.character = response.result;
      } else {
        this.planet = response.result;
      }
      this.detail = response.result;
       // Store planet data in the cache
       this.cacheService.storeData(`${this.detailType}-${id}`, this.detail);
    });
  }

  /* goBackToParent() {
    // Emit the goBack event to notify the parent component to navigate back
    this.goBack.emit();
  } */

  goBackToCharacterList() {
    const queryParams = this.route.snapshot.queryParams;
    const page = queryParams['page'] || 1; // Default to page 1 if not provided
    const limit = queryParams['limit'] || 10; // Default limit value

    // Navigate back to character list with preserved pagination data
    this.router.navigate(['/characters'], {
      queryParams: {
        page,
        limit
      }
    });
  }

  goBackToCharacterDetail() {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      characterUid: this.route.snapshot.queryParams['characterUid'] || '', // Get the character UID from query params
    };
  
    this.router.navigate(['/details/character', queryParams.characterUid], { queryParams });
  }

  goToPlanetDetail(planetUrl: string) {
    const characterUid = this.character?.uid || '';
    const planetId = planetUrl.split('/').pop();
    // Preserve the existing query parameters while adding characterUid
    const queryParams = {
      ...this.route.snapshot.queryParams, // Get the existing query parameters
      characterUid, // Add the characterUid
    };

    this.router.navigate(['/details/planet', planetId], {
      queryParams,
      queryParamsHandling: 'merge', // Merge the new parameters with existing ones
    });
  }
}
