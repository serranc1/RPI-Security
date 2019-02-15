import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchdogsComponent } from './watchdogs.component';

describe('WatchdogsComponent', () => {
  let component: WatchdogsComponent;
  let fixture: ComponentFixture<WatchdogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchdogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchdogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
