import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Mushroom } from "../models/mushroom";
import { ENVIRONMENT } from "src/environments/environment";
import { UserFeedback } from "../models/userFeedback";

@Injectable({
  providedIn: "root",
})
export class MushroomService {
  constructor(private http: HttpClient) {}

  submitMushroom(mushroom: Mushroom): Observable<any> {
    const FORM_DATA = new FormData();

    FORM_DATA.append("cap_shape", mushroom.cap_shape);
    FORM_DATA.append("cap_surface", mushroom.cap_surface);
    FORM_DATA.append("cap_color", mushroom.cap_color);
    FORM_DATA.append("bruises", mushroom.bruises);
    FORM_DATA.append("odor", mushroom.odor);
    FORM_DATA.append("gill_attachment", mushroom.gill_attachment);
    FORM_DATA.append("gill_spacing", mushroom.gill_spacing);
    FORM_DATA.append("gill_size", mushroom.gill_size);
    FORM_DATA.append("gill_color", mushroom.gill_color);
    FORM_DATA.append("stalk_shape", mushroom.stalk_shape);
    FORM_DATA.append("stalk_root", mushroom.stalk_root);
    FORM_DATA.append(
      "stalk_surface_above_ring",
      mushroom.stalk_surface_above_ring
    );
    FORM_DATA.append(
      "stalk_surface_below_ring",
      mushroom.stalk_surface_below_ring
    );
    FORM_DATA.append("stalk_color_above_ring", mushroom.stalk_color_above_ring);
    FORM_DATA.append("stalk_color_below_ring", mushroom.stalk_color_below_ring);
    FORM_DATA.append("veil_color", mushroom.veil_color);
    FORM_DATA.append("ring_number", mushroom.ring_number);
    FORM_DATA.append("ring_type", mushroom.ring_type);
    FORM_DATA.append("spore_print_color", mushroom.spore_print_color);
    FORM_DATA.append("population", mushroom.population);
    FORM_DATA.append("habitat", mushroom.habitat);

    return this.http.post<any>(
      `${ENVIRONMENT.BACKEND_SERVER_BASE_URL}mushroom/analyze`,
      FORM_DATA
    );
  }

  saveUserFeedback(uf: UserFeedback): Observable<any> {
    const PAYLOAD = {
      mushroom: uf.mushroom.toJSON(),
      predicted_class: uf.predicted_class,
      user_feedback: uf.user_feedback,
    };

    return this.http.post<any>(
      `${ENVIRONMENT.BACKEND_SERVER_BASE_URL}mushroom/user-feedback`,
      PAYLOAD
    );
  }
}
