import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Character, CharacterResponse } from '../interface/interface';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit{
  characters: Character[] = [];
  currentPage = 1;
  totalPages = 0;
  pageSize: number = 10;
  hasNextPage = false;
  hasPreviousPage = false;
  nextUrl: string | null = null;
  previousUrl: string | null = null;
  isLoading = false;

  private loadPage(url: string) {
    this.isLoading = true;
    this.dataService.getPageByUrl(url).subscribe((response: CharacterResponse) => {
      this.handleCharacterResponse(response);
      this.isLoading = false;
    });
  }

  private handleCharacterResponse = (response: CharacterResponse) => {
    this.characters = response.results;
    this.currentPage = this.currentPage;
    this.totalPages = response.total_pages;
    this.hasNextPage = !!response.next;
    this.hasPreviousPage = !!response.previous;
    this.nextUrl = response.next;
    this.previousUrl = response.previous;
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Retrieve pagination data from route parameters
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
      this.loadCharacters(this.currentPage);
    });
  }

  loadCharacters(page: number) {
    this.dataService.getCharacters(page).subscribe(this.handleCharacterResponse);
  }

  goToNextPage() {
    if (this.hasNextPage && this.nextUrl) {
      this.currentPage++;
      this.loadPage(this.nextUrl);
    }
  }

  goToPreviousPage() {
    if (this.hasPreviousPage && this.previousUrl) {
      this.currentPage--;
      this.loadPage(this.previousUrl);
    }
  }

  goToCharacterDetail(characterUid: string) {
    // Include pagination data in the URL when navigating to character detail
    this.router.navigate(['/characters/details', characterUid], {
      queryParams: {
        page: this.currentPage,
        limit: this.pageSize
      }
    });
  }
}
