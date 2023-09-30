import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetDetailComponent } from './planet-detail.component';

describe('PlanetDetailComponent', () => {
  let component: PlanetDetailComponent;
  let fixture: ComponentFixture<PlanetDetailComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;

  beforeEach(() => {
    // Create mock objects for ActivatedRoute and Router
    mockActivatedRoute = {
      snapshot: {
        queryParams: { characterUid: '123' }, // Example character UID
      },
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(PlanetDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to character detail with characterUid', () => {
    const expectedCharacterUid = mockActivatedRoute.snapshot.queryParams['characterUid'] || '';

    component.goBackToCharacterDetail();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/details/character', expectedCharacterUid], {
      queryParams: {
        characterUid: expectedCharacterUid,
      },
    });
  });
});
