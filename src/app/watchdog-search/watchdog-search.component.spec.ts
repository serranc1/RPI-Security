import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchdogSearchComponent } from './watchdog-search.component';

describe('WatchdogSearchComponent', () => {
  let component: WatchdogSearchComponent;
  let fixture: ComponentFixture<WatchdogSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchdogSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchdogSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
