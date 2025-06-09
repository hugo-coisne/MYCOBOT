import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MushroomAnalysisComponent } from './mushroom-analysis.component';



describe('MushroomAnalysisComponent', () => {
  let component: MushroomAnalysisComponent;
  let fixture: ComponentFixture<MushroomAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MushroomAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MushroomAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
