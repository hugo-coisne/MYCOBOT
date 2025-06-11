import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MushroomAnalysisComponent } from "./mushroom-analysis.component";
import { MushroomService } from "src/app/services/mushroom.service";
import { ToastrService } from "ngx-toastr";
import { ReactiveFormsModule } from "@angular/forms";
import { of, throwError } from "rxjs";

describe("MushroomAnalysisComponent", () => {
  let component: MushroomAnalysisComponent;
  let fixture: ComponentFixture<MushroomAnalysisComponent>;
  let mushroomServiceSpy: jasmine.SpyObj<MushroomService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {
    const mushroomSpy = jasmine.createSpyObj("MushroomService", [
      "submitMushroom",
      "saveUserFeedback",
    ]);
    const toastSpy = jasmine.createSpyObj("ToastrService", [
      "success",
      "error",
    ]);

    TestBed.configureTestingModule({
      declarations: [MushroomAnalysisComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MushroomService, useValue: mushroomSpy },
        { provide: ToastrService, useValue: toastSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MushroomAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mushroomServiceSpy = TestBed.inject(
      MushroomService
    ) as jasmine.SpyObj<MushroomService>;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  }));

  //Tester onSubmit avec formulaire invalide
  it("should not call mushroomService if the form is invalid", () => {
    component.onSubmit();
    expect(mushroomServiceSpy.submitMushroom).not.toHaveBeenCalled();
  });

  //Tester onSubmit avec formulaire valide
  it('should call submitMushroom and set predictionResult to "edible"', () => {
    component.mushroomForm.patchValue({
      capShape: "x",
      capSurface: "s",
      capColor: "n",
      bruises: "t",
      odor: "n",
      gillAttachment: "f",
      gillSpacing: "c",
      gillSize: "b",
      gillColor: "k",
      stalkShape: "e",
      stalkRoot: "b",
      stalkSurfaceAbove: "s",
      stalkSurfaceBelow: "s",
      stalkColorAbove: "n",
      stalkColorBelow: "n",
      veilColor: "w",
      ringNumber: "o",
      ringType: "p",
      sporePrintColor: "k",
      population: "a",
      habitat: "g",
    });

    const mockResponse = { prediction: "e" };
    mushroomServiceSpy.submitMushroom.and.returnValue(of(mockResponse));

    component.onSubmit();

    expect(mushroomServiceSpy.submitMushroom).toHaveBeenCalled();
    expect(component.predictionResult).toBe("edible");
    expect(component.showResult).toBeTrue();
  });

  //Tester un submitMushroom() avec une erreur
  it("should handle submitMushroom error", () => {
    component.mushroomForm.patchValue({
      capShape: "x",
      capSurface: "s",
      capColor: "n",
      bruises: "t",
      odor: "n",
      gillAttachment: "f",
      gillSpacing: "c",
      gillSize: "b",
      gillColor: "k",
      stalkShape: "e",
      stalkRoot: "b",
      stalkSurfaceAbove: "s",
      stalkSurfaceBelow: "s",
      stalkColorAbove: "n",
      stalkColorBelow: "n",
      veilColor: "w",
      ringNumber: "o",
      ringType: "p",
      sporePrintColor: "k",
      population: "a",
      habitat: "g",
    });

    mushroomServiceSpy.submitMushroom.and.returnValue(
      throwError(() => new Error("API Error"))
    );

    component.onSubmit();

    expect(mushroomServiceSpy.submitMushroom).toHaveBeenCalled();
    expect(component.showResult).toBeFalse();
  });

  it("should handle error from saveUserFeedback and show error toast", () => {
    component.mushroomForm.patchValue({
      capShape: "x",
      capSurface: "s",
      capColor: "n",
      bruises: "t",
      odor: "n",
      gillAttachment: "f",
      gillSpacing: "c",
      gillSize: "b",
      gillColor: "k",
      stalkShape: "e",
      stalkRoot: "b",
      stalkSurfaceAbove: "s",
      stalkSurfaceBelow: "s",
      stalkColorAbove: "n",
      stalkColorBelow: "n",
      veilColor: "w",
      ringNumber: "o",
      ringType: "p",
      sporePrintColor: "k",
      population: "a",
      habitat: "g",
    });

    component.predictionResult = "edible";
    component.userFeedback = "Wrong";

    mushroomServiceSpy.saveUserFeedback.and.returnValue(
      throwError(() => new Error("API error"))
    );

    component.sendFeedback();

    expect(mushroomServiceSpy.saveUserFeedback).toHaveBeenCalled();
    expect(toastrSpy.error).toHaveBeenCalledWith(
      "An error occurred while submitting your feedback.",
      "Oops!"
    );
  });

  it("should clear form and feedback on reset", () => {
    component.userFeedback = "some feedback";
    component.showResult = true;
    component.mushroomForm.patchValue({
      capShape: "x",
      capSurface: "s",
      capColor: "n",
      bruises: "t",
      odor: "n",
      gillAttachment: "f",
      gillSpacing: "c",
      gillSize: "b",
      gillColor: "k",
      stalkShape: "e",
      stalkRoot: "b",
      stalkSurfaceAbove: "s",
      stalkSurfaceBelow: "s",
      stalkColorAbove: "n",
      stalkColorBelow: "n",
      veilColor: "w",
      ringNumber: "o",
      ringType: "p",
      sporePrintColor: "k",
      population: "a",
      habitat: "g",
    });

    component.reset();

    expect(component.userFeedback).toBe("");
    expect(component.showResult).toBeFalse();
    expect(component.mushroomForm.valid).toBeFalse(); // car vide
  });

  //Test de création du composant
  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
});
