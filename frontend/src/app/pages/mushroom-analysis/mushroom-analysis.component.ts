import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, BehaviorSubject, delay } from "rxjs";
import { Mushroom } from "src/app/models/mushroom";
import { UserFeedback } from "src/app/models/userFeedback";
import { MushroomService } from "src/app/services/mushroom.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-mushroom-analysis",
  templateUrl: "./mushroom-analysis.component.html",
  styleUrls: ["./mushroom-analysis.component.scss"],
})
export class MushroomAnalysisComponent implements OnInit {
  capShapes = [
    { value: "b", label: "Bell" },
    { value: "c", label: "Conical" },
    { value: "x", label: "Convex" },
    { value: "f", label: "Flat" },
    { value: "k", label: "Knobbed" },
    { value: "s", label: "Sunken" },
  ];

  capSurfaces = [
    { value: "f", label: "Fibrous" },
    { value: "g", label: "Grooves" },
    { value: "y", label: "Scaly" },
    { value: "s", label: "Smooth" },
  ];

  capColors = [
    { value: "n", label: "Brown" },
    { value: "b", label: "Buff" },
    { value: "c", label: "Cinnamon" },
    { value: "g", label: "Gray" },
    { value: "r", label: "Green" },
    { value: "p", label: "Pink" },
    { value: "u", label: "Purple" },
    { value: "e", label: "Red" },
    { value: "w", label: "White" },
    { value: "y", label: "Yellow" },
  ];

  bruises = [
    { value: "t", label: "Bruises" },
    { value: "f", label: "No" },
  ];

  odors = [
    { value: "a", label: "Almond" },
    { value: "l", label: "Anise" },
    { value: "c", label: "Creosote" },
    { value: "y", label: "Fishy" },
    { value: "f", label: "Foul" },
    { value: "m", label: "Musty" },
    { value: "n", label: "None" },
    { value: "p", label: "Pungent" },
    { value: "s", label: "Spicy" },
  ];

  gillAttachments = [
    { value: "a", label: "Attached" },
    { value: "d", label: "Descending" },
    { value: "f", label: "Free" },
    { value: "n", label: "Notched" },
  ];

  gillSpacings = [
    { value: "c", label: "Close" },
    { value: "w", label: "Crowded" },
    { value: "d", label: "Distant" },
  ];

  gillSizes = [
    { value: "b", label: "Broad" },
    { value: "n", label: "Narrow" },
  ];

  gillColors = [
    { value: "k", label: "Black" },
    { value: "n", label: "Brown" },
    { value: "b", label: "Buff" },
    { value: "h", label: "Chocolate" },
    { value: "g", label: "Gray" },
    { value: "r", label: "Green" },
    { value: "o", label: "Orange" },
    { value: "p", label: "Pink" },
    { value: "u", label: "Purple" },
    { value: "e", label: "Red" },
    { value: "w", label: "White" },
    { value: "y", label: "Yellow" },
  ];

  stalkShapes = [
    { value: "e", label: "Enlarging" },
    { value: "t", label: "Tapering" },
  ];

  stalkRoots = [
    { value: "b", label: "Bulbous" },
    { value: "c", label: "Club" },
    { value: "u", label: "Cup" },
    { value: "e", label: "Equal" },
    { value: "z", label: "Rhizomorphs" },
    { value: "r", label: "Rooted" },
    { value: "?", label: "Missing" },
  ];

  stalkSurfacesAbove = [
    { value: "f", label: "Fibrous" },
    { value: "y", label: "Scaly" },
    { value: "k", label: "Silky" },
    { value: "s", label: "Smooth" },
  ];

  stalkSurfacesBelow = [...this.stalkSurfacesAbove];

  stalkColorsAbove = [
    { value: "n", label: "Brown" },
    { value: "b", label: "Buff" },
    { value: "c", label: "Cinnamon" },
    { value: "g", label: "Gray" },
    { value: "o", label: "Orange" },
    { value: "p", label: "Pink" },
    { value: "e", label: "Red" },
    { value: "w", label: "White" },
    { value: "y", label: "Yellow" },
  ];

  stalkColorsBelow = [...this.stalkColorsAbove];

  veilColors = [
    { value: "n", label: "Brown" },
    { value: "o", label: "Orange" },
    { value: "w", label: "White" },
    { value: "y", label: "Yellow" },
  ];

  ringNumbers = [
    { value: "n", label: "None" },
    { value: "o", label: "One" },
    { value: "t", label: "Two" },
  ];

  ringTypes = [
    { value: "c", label: "Cobwebby" },
    { value: "e", label: "Evanescent" },
    { value: "f", label: "Flaring" },
    { value: "l", label: "Large" },
    { value: "n", label: "None" },
    { value: "p", label: "Pendant" },
    { value: "s", label: "Sheathing" },
    { value: "z", label: "Zone" },
  ];

  sporePrintColors = [
    { value: "k", label: "Black" },
    { value: "n", label: "Brown" },
    { value: "b", label: "Buff" },
    { value: "h", label: "Chocolate" },
    { value: "r", label: "Green" },
    { value: "o", label: "Orange" },
    { value: "u", label: "Purple" },
    { value: "w", label: "White" },
    { value: "y", label: "Yellow" },
  ];

  populations = [
    { value: "a", label: "Abundant" },
    { value: "c", label: "Clustered" },
    { value: "n", label: "Numerous" },
    { value: "s", label: "Scattered" },
    { value: "v", label: "Several" },
    { value: "y", label: "Solitary" },
  ];

  habitats = [
    { value: "g", label: "Grasses" },
    { value: "l", label: "Leaves" },
    { value: "m", label: "Meadows" },
    { value: "p", label: "Paths" },
    { value: "u", label: "Urban" },
    { value: "w", label: "Waste" },
    { value: "d", label: "Woods" },
  ];

  tooltipTexts = {
    capShape: "Shape of the mushroom cap",
    capSurface: "Surface texture of the mushroom cap",
    capColor: "Color of the mushroom cap",
    bruises: "Does the mushroom bruise when handled?",
    odor: "Odor of the mushroom",
    gillAttachment: "How the gills attach to the stalk",
    gillSpacing: "Spacing between gills",
    gillSize: "Size of the gills",
    gillColor: "Color of the gills",
    stalkShape: "Shape of the stalk",
    stalkRoot: "Type of root at the base of the stalk",
    stalkSurfaceAbove: "Surface texture of stalk above the ring",
    stalkSurfaceBelow: "Surface texture of stalk below the ring",
    stalkColorAbove: "Color of stalk above the ring",
    stalkColorBelow: "Color of stalk below the ring",
    veilColor: "Color of the veil",
    ringNumber: "Number of rings on the stalk",
    ringType: "Type of ring on the stalk",
    sporePrintColor: "Color of the spore print",
    population: "Population pattern of the mushrooms",
    habitat: "Typical habitat where the mushroom grows",
  };

  mushroomForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  showResult = false;
  predictionResult: string = "";
  userFeedback: string = "";

  constructor(
    private fb: FormBuilder,
    private mushroomService: MushroomService,
    private toastr: ToastrService
  ) {
    // Observable to track loading state for spinner
    this.isLoading$ = this.loadingSubject.asObservable();
  }

  ngOnInit() {
    this.mushroomForm = this.fb.group({
      capShape: ["", Validators.required],
      capSurface: ["", Validators.required],
      capColor: ["", Validators.required],
      bruises: ["", Validators.required],
      odor: ["", Validators.required],
      gillAttachment: ["", Validators.required],
      gillSpacing: ["", Validators.required],
      gillSize: ["", Validators.required],
      gillColor: ["", Validators.required],
      stalkShape: ["", Validators.required],
      stalkRoot: ["", Validators.required],
      stalkSurfaceAbove: ["", Validators.required],
      stalkSurfaceBelow: ["", Validators.required],
      stalkColorAbove: ["", Validators.required],
      stalkColorBelow: ["", Validators.required],
      veilColor: ["", Validators.required],
      ringNumber: ["", Validators.required],
      ringType: ["", Validators.required],
      sporePrintColor: ["", Validators.required],
      population: ["", Validators.required],
      habitat: ["", Validators.required],
    });
  }

  onSubmit(): void {
    if (this.mushroomForm.invalid) {
      this.mushroomForm.markAllAsTouched();
      return;
    }
    this.loadingSubject.next(true);
    let mushroom = new Mushroom(
      this.mushroomForm.value.capShape,
      this.mushroomForm.value.capSurface,
      this.mushroomForm.value.capColor,
      this.mushroomForm.value.bruises,
      this.mushroomForm.value.odor,
      this.mushroomForm.value.gillAttachment,
      this.mushroomForm.value.gillSpacing,
      this.mushroomForm.value.gillSize,
      this.mushroomForm.value.gillColor,
      this.mushroomForm.value.stalkShape,
      this.mushroomForm.value.stalkRoot,
      this.mushroomForm.value.stalkSurfaceAbove,
      this.mushroomForm.value.stalkSurfaceBelow,
      this.mushroomForm.value.stalkColorAbove,
      this.mushroomForm.value.stalkColorBelow,
      this.mushroomForm.value.veilColor,
      this.mushroomForm.value.ringNumber,
      this.mushroomForm.value.ringType,
      this.mushroomForm.value.sporePrintColor,
      this.mushroomForm.value.population,
      this.mushroomForm.value.habitat
    );
    this.mushroomService.submitMushroom(mushroom).subscribe({
      next: (response) => {
        if (response.prediction == "e") this.predictionResult = "edible";
        else this.predictionResult = "poisonous";
        this.showResult = true;
        this.loadingSubject.next(false);
      },
      error: (err) => {
        console.error("Error while submitting mushroom:", err);
      },
    });
  }

  sendFeedback() {
    let mushroom = new Mushroom(
      this.mushroomForm.value.capShape,
      this.mushroomForm.value.capSurface,
      this.mushroomForm.value.capColor,
      this.mushroomForm.value.bruises,
      this.mushroomForm.value.odor,
      this.mushroomForm.value.gillAttachment,
      this.mushroomForm.value.gillSpacing,
      this.mushroomForm.value.gillSize,
      this.mushroomForm.value.gillColor,
      this.mushroomForm.value.stalkShape,
      this.mushroomForm.value.stalkRoot,
      this.mushroomForm.value.stalkSurfaceAbove,
      this.mushroomForm.value.stalkSurfaceBelow,
      this.mushroomForm.value.stalkColorAbove,
      this.mushroomForm.value.stalkColorBelow,
      this.mushroomForm.value.veilColor,
      this.mushroomForm.value.ringNumber,
      this.mushroomForm.value.ringType,
      this.mushroomForm.value.sporePrintColor,
      this.mushroomForm.value.population,
      this.mushroomForm.value.habitat
    );
    let res = new UserFeedback(
      mushroom,
      this.predictionResult,
      this.userFeedback
    );
    this.mushroomService.saveUserFeedback(res).subscribe({
      next: (response) => {
        this.toastr
          .success("Feedback sent!")
          .onHidden.pipe(delay(50))
          .subscribe(() => {
            this.reset();
          });
      },
      error: (err) => {
        console.error("Error while submitting user feedback:", err);
        this.toastr.error(
          "An error occurred while submitting your feedback.",
          "Oops!"
        );
      },
    });
  }

  reset() {
    this.mushroomForm.reset();
    this.showResult = false;
    this.userFeedback = "";
  }
}
