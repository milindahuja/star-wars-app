import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterDetailComponent } from './character-detail.component';
import { HttpClientModule } from '@angular/common/http';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [
        Router,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: (param: string) => {
                  return null;
                },
              },
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to character list with default pagination data when queryParams are not provided', () => {
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();

    // Mock queryParams not being provided
    const queryParams: any = {}; // Cast queryParams to 'any'
    jest.spyOn(route.snapshot.queryParamMap, 'get').mockReturnValue(null);

    // Call the method
    component.goBackToCharacterList();

    // Check if router.navigate was called with the expected arguments (default pagination)
    expect(navigateSpy).toHaveBeenCalledWith(['/characters'], {
      queryParams: { page: 1, limit: 10 },
    });
  });

  it('should navigate back to character list with preserved pagination data', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockImplementation(() => {
      return Promise.resolve(true); 
    });

    // Mock queryParams
    const queryParams: any = { page: '2', limit: '20' };

    // Call the method that triggers navigation
    component.goBackToCharacterList();

    // Assert that the navigate method was called with the expected arguments
    expect(navigateSpy).toHaveBeenCalledWith(['/characters'], {
      queryParams,
    });

    // Restore the spy
    navigateSpy.mockRestore();
  });
});
