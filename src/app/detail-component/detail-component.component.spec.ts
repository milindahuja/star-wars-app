import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DetailComponent } from './detail-component.component';
import { DataService } from '../services/data.service';
import { CacheService } from '../services/cache.service';
import { Detail, DetailResponse } from '../interface/interface';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let mockDataService: Partial<DataService>;
  let mockCacheService: Partial<CacheService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: Partial<Router>;

  const mockDetailResponse: DetailResponse = {
    message: 'Success',
    result: {
      properties: undefined,
      description: '',
      _id: '',
      uid: '',
      __v: 0,
      url: ''
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Router,
        DataService,
        CacheService,
        { provide: DataService, useValue: mockDataService },
        { provide: CacheService, useValue: mockCacheService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
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

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    mockActivatedRoute = TestBed.inject(ActivatedRoute);

    mockDataService = {
      getDetailById: jest.fn().mockReturnValue(of(mockDetailResponse)),
    };

    mockCacheService = {
      getData: jest.fn(),
      storeData: jest.fn(),
    };

    mockActivatedRoute = {};

    mockRouter = {
      navigate: jest.fn(),
    };
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load detail data from DataService', () => {
    component.detailType = 'people'; // Set the detail type to 'people' for this test

    fixture.detectChanges(); // Trigger ngOnInit

    expect(mockDataService.getDetailById).toHaveBeenCalledWith('1', 'people');
    expect(component.detail).toEqual(mockDetailResponse.result);
    expect(mockCacheService.storeData).toHaveBeenCalledWith('people-1', mockDetailResponse.result);
  });

  it('should go back to parent component', () => {
    const goBackSpy = jest.spyOn(component.goBack, 'emit');

    component.goBackToParent();

    expect(goBackSpy).toHaveBeenCalled();
  });
});
