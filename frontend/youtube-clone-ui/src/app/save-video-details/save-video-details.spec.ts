import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveVideoDetails } from './save-video-details';

describe('SaveVideoDetails', () => {
  let component: SaveVideoDetails;
  let fixture: ComponentFixture<SaveVideoDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveVideoDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveVideoDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
