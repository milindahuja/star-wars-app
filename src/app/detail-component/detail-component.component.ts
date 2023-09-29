import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '../services/cache.service';
import { Detail, DetailResponse } from '../interface/interface';
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
  @Output() goBack = new EventEmitter<void>(); // Output event to notify the parent component to navigate back
  detail!: Detail;

  detailFields: { [key: string]: { label: string; property: string }[] } = {
    people: [
      { label: 'Height', property: 'height' },
      { label: 'Mass', property: 'mass' },
      { label: 'Hair Color', property: 'hair_color' },
      { label: 'Skin Color', property: 'skin_color' },
      { label: 'Eye Color', property: 'eye_color' },
      { label: 'Birth Year', property: 'birth_year' },
      { label: 'Gender', property: 'gender' },
    ],
    planets: [
      { label: 'Diameter', property: 'diameter' },
      { label: 'Rotation Period', property: 'rotation_period' },
      { label: 'Orbital Period', property: 'orbital_period' },
      { label: 'Gravity', property: 'gravity' },
      { label: 'Population', property: 'population' },
      { label: 'Climate', property: 'climate' },
      { label: 'Terrain', property: 'terrain' },
      { label: 'Surface Water', property: 'surface_water' },
    ],
  };

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
      this.detail = cachedDetail;
    } else {
      // Fetch character data from API
      this.loadDetailData(uid);
    }
  }

  // Load details based on detail type (planet or character)
  loadDetailData(id: string) {
    this.dataService.getDetailById(id, this.detailType).subscribe((response: DetailResponse) => {
      this.detail = response.result;
       // Store planet data in the cache
       this.cacheService.storeData(`${this.detailType}-${id}`, this.detail);
    });
  }

  goBackToParent() {
    // Emit the goBack event to notify the parent component to navigate back
    this.goBack.emit();
  }

  goToPlanetDetail(planetUrl: string) {
    const characterUid = this.detail?.uid || '';
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
