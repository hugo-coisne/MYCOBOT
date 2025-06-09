import { Mushroom } from "./mushroom";

export class UserFeedback {
  private _mushroom: Mushroom;
  private _predicted_class: string;
  private _user_feedback: string;

  constructor(
    mushroom: Mushroom,
    predicted_class: string,
    user_feedback: string
  ) {
    this._mushroom = mushroom;
    this._predicted_class = predicted_class;
    this._user_feedback = user_feedback;
  }

  get mushroom(): Mushroom {
    return this._mushroom;
  }
  set mushroom(value: Mushroom) {
    this._mushroom = value;
  }

  get predicted_class(): string {
    return this._predicted_class;
  }
  set predicted_class(value: string) {
    this._predicted_class = value;
  }

  get user_feedback(): string {
    return this._user_feedback;
  }
  set user_feedback(value: string) {
    this._user_feedback = value;
  }
}
