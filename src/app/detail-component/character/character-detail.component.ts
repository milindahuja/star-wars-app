import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DetailComponent } from '../detail-component.component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DetailComponent],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent {

  constructor(
    private route: ActivatedRoute, 
    private router: Router
    ) {}

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

}
