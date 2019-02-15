import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchdogDetailComponent } from './watchdog-detail.component';

describe('WatchdogDetailComponent', () => {
  let component: WatchdogDetailComponent;
  let fixture: ComponentFixture<WatchdogDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchdogDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchdogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
