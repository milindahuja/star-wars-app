import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { CharacterDetail } from '../interface/interface';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent {
  character!: CharacterDetail; 

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const characterId = params['id']; // Retrieve character ID from route parameters
      this.dataService.getCharacterById(characterId).subscribe(data => {
        this.character = data.result; // Fetch and assign character details
      });
    });
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

  goToPlanetDetail(planetUrl: string) {
    const characterUid = this.character?.uid || '';
    const planetId = planetUrl.split('/').pop();
    // Preserve the existing query parameters while adding characterUid
    const queryParams = {
      ...this.route.snapshot.queryParams, // Get the existing query parameters
      characterUid, // Add the characterUid
    };

    this.router.navigate(['/planets/details', planetId], {
      queryParams,
      queryParamsHandling: 'merge', // Merge the new parameters with existing ones
    });
  }
}
