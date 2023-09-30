import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CharacterListComponent } from './character-list.component';
import { DataService } from '../services/data.service';
import { CacheService } from '../services/cache.service';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let dataService: DataService;
  let cacheService: CacheService;

  const mockCharacterResponse = {
    results: [
      { uid: '1', name: 'Luke Skywalker' },
      { uid: '2', name: 'Leia Organa' },
    ],
    total_pages: 2,
    next: 'next-url',
    previous: 'previous-url',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [DataService, CacheService],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;

    // Mock DataService and CacheService
    dataService = TestBed.inject(DataService);
    cacheService = TestBed.inject(CacheService);

    // Mock DataService's getCharacters method
    spyOn(dataService, 'getCharacters').and.returnValue(of(mockCharacterResponse));

    // Spy on CacheService's getData and storeData methods
    spyOn(cacheService, 'getData').and.returnValue(null);
    spyOn(cacheService, 'storeData');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.characters).toEqual([]);
    expect(component.currentPage).toEqual(1);
    expect(component.totalPages).toEqual(0);
    expect(component.hasNextPage).toEqual(false);
    expect(component.hasPreviousPage).toEqual(false);
    expect(component.nextUrl).toEqual(null);
    expect(component.previousUrl).toEqual(null);
    expect(component.isLoading).toEqual(false);
  });

  it('should navigate to next page', () => {
    component.hasNextPage = true;
    component.nextUrl = 'next-url';
    component.goToNextPage();
    expect(dataService.getCharacters).toHaveBeenCalledWith(2); // Ensure getCharacters was called with page 2
  });

  it('should navigate to previous page', () => {
    component.hasPreviousPage = true;
    component.previousUrl = 'previous-url';
    component.goToPreviousPage();
    expect(dataService.getCharacters).toHaveBeenCalledWith(1); // Ensure getCharacters was called with page 1
  });

  it('should navigate to character detail', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goToCharacterDetail('1');
    expect(routerSpy).toHaveBeenCalledWith(['/details/character', '1'], {
      queryParams: {
        page: 1, // Ensure page is included in queryParams
        limit: 10, // Ensure limit is included in queryParams
      },
    });
  });

  it('should navigate to character detail', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goToCharacterDetail('1');
    expect(routerSpy).toHaveBeenCalledWith(['/details/character', '1'], {
      queryParams: {
        page: 1, // Ensure page is included in queryParams
        limit: 10, // Ensure limit is included in queryParams
      },
    });
  });

});
