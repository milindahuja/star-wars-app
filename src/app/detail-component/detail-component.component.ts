import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '../services/cache.service';
import { CharacterDetailResponse, Detail, Planet, PlanetResponse } from '../interface/interface';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.scss'],
})
export class DetailComponent {
  @Input() detail: string = ''; // Input property to receive the detail data
  @Output() goBack = new EventEmitter<void>(); // Output event to notify the parent component to navigate back
  character!: Detail;
  planet!: Planet;

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
    const cachedDetail = this.cacheService.getData(`${this.detail}-${uid}`);

    if (cachedDetail) {
      if (this.detail === 'character') {
        this.character = cachedDetail;
      } else {
        this.planet = cachedDetail;
      }
    } else {
      // Fetch character data from API
      this.loadDetailData(uid);
    }
  }

  loadDetailData(id: string) {
    // Implement loading logic based on the ID (character or planet) using DataService
    // Example:
    // this.dataService.getCharacterById(id).subscribe(response => {
    //   this.detail = response;
    // });
    if(this.detail === 'character') {
      this.dataService.getCharacterById(id).subscribe((response: CharacterDetailResponse) => {
        this.character = response.result;
  
        // Store character data in the cache
        this.cacheService.storeData(`character-${id}`, this.character);
      });
    } else {
      this.dataService.getPlanetById(id).subscribe((response: PlanetResponse) => {
        this.planet = response.result;
         // Store planet data in the cache
         this.cacheService.storeData(`planet-${id}`, this.planet);
      });
    }    
  }

  goBackToParent() {
    // Emit the goBack event to notify the parent component to navigate back
    this.goBack.emit();
  }

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
