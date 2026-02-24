import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarEntries } from './entries';

describe('Entries', () => {
  let component: SideBarEntries;
  let fixture: ComponentFixture<SideBarEntries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarEntries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarEntries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
