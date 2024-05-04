import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenredetailComponent } from './genredetail.component';

describe('GenredetailComponent', () => {
  let component: GenredetailComponent;
  let fixture: ComponentFixture<GenredetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenredetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenredetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
