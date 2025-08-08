import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetail } from './video-detail';

describe('VideoDetail', () => {
  let component: VideoDetail;
  let fixture: ComponentFixture<VideoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
