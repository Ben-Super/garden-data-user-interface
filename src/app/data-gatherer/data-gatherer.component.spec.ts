import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGathererComponent } from './data-gatherer.component';

describe('DataGathererComponent', () => {
  let component: DataGathererComponent;
  let fixture: ComponentFixture<DataGathererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataGathererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGathererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
