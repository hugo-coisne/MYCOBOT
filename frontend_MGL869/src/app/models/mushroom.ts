export class Mushroom {
  private _cap_shape: string;
  private _cap_surface: string;
  private _cap_color: string;
  private _bruises: string;
  private _odor: string;
  private _gill_attachment: string;
  private _gill_spacing: string;
  private _gill_size: string;
  private _gill_color: string;
  private _stalk_shape: string;
  private _stalk_root: string;
  private _stalk_surface_above_ring: string;
  private _stalk_surface_below_ring: string;
  private _stalk_color_above_ring: string;
  private _stalk_color_below_ring: string;
  private _veil_color: string;
  private _ring_number: string;
  private _ring_type: string;
  private _spore_print_color: string;
  private _population: string;
  private _habitat: string;

  constructor(
    cap_shape: string,
    cap_surface: string,
    cap_color: string,
    bruises: string,
    odor: string,
    gill_attachment: string,
    gill_spacing: string,
    gill_size: string,
    gill_color: string,
    stalk_shape: string,
    stalk_root: string,
    stalk_surface_above_ring: string,
    stalk_surface_below_ring: string,
    stalk_color_above_ring: string,
    stalk_color_below_ring: string,
    veil_color: string,
    ring_number: string,
    ring_type: string,
    spore_print_color: string,
    population: string,
    habitat: string
  ) {
    this._cap_shape = cap_shape;
    this._cap_surface = cap_surface;
    this._cap_color = cap_color;
    this._bruises = bruises;
    this._odor = odor;
    this._gill_attachment = gill_attachment;
    this._gill_spacing = gill_spacing;
    this._gill_size = gill_size;
    this._gill_color = gill_color;
    this._stalk_shape = stalk_shape;
    this._stalk_root = stalk_root;
    this._stalk_surface_above_ring = stalk_surface_above_ring;
    this._stalk_surface_below_ring = stalk_surface_below_ring;
    this._stalk_color_above_ring = stalk_color_above_ring;
    this._stalk_color_below_ring = stalk_color_below_ring;
    this._veil_color = veil_color;
    this._ring_number = ring_number;
    this._ring_type = ring_type;
    this._spore_print_color = spore_print_color;
    this._population = population;
    this._habitat = habitat;
  }

  get cap_shape(): string {
    return this._cap_shape;
  }
  set cap_shape(value: string) {
    this._cap_shape = value;
  }

  get cap_surface(): string {
    return this._cap_surface;
  }
  set cap_surface(value: string) {
    this._cap_surface = value;
  }

  get cap_color(): string {
    return this._cap_color;
  }
  set cap_color(value: string) {
    this._cap_color = value;
  }

  get bruises(): string {
    return this._bruises;
  }
  set bruises(value: string) {
    this._bruises = value;
  }

  get odor(): string {
    return this._odor;
  }
  set odor(value: string) {
    this._odor = value;
  }

  get gill_attachment(): string {
    return this._gill_attachment;
  }
  set gill_attachment(value: string) {
    this._gill_attachment = value;
  }

  get gill_spacing(): string {
    return this._gill_spacing;
  }
  set gill_spacing(value: string) {
    this._gill_spacing = value;
  }

  get gill_size(): string {
    return this._gill_size;
  }
  set gill_size(value: string) {
    this._gill_size = value;
  }

  get gill_color(): string {
    return this._gill_color;
  }
  set gill_color(value: string) {
    this._gill_color = value;
  }

  get stalk_shape(): string {
    return this._stalk_shape;
  }
  set stalk_shape(value: string) {
    this._stalk_shape = value;
  }

  get stalk_root(): string {
    return this._stalk_root;
  }
  set stalk_root(value: string) {
    this._stalk_root = value;
  }

  get stalk_surface_above_ring(): string {
    return this._stalk_surface_above_ring;
  }
  set stalk_surface_above_ring(value: string) {
    this._stalk_surface_above_ring = value;
  }

  get stalk_surface_below_ring(): string {
    return this._stalk_surface_below_ring;
  }
  set stalk_surface_below_ring(value: string) {
    this._stalk_surface_below_ring = value;
  }

  get stalk_color_above_ring(): string {
    return this._stalk_color_above_ring;
  }
  set stalk_color_above_ring(value: string) {
    this._stalk_color_above_ring = value;
  }

  get stalk_color_below_ring(): string {
    return this._stalk_color_below_ring;
  }
  set stalk_color_below_ring(value: string) {
    this._stalk_color_below_ring = value;
  }

  get veil_color(): string {
    return this._veil_color;
  }
  set veil_color(value: string) {
    this._veil_color = value;
  }

  get ring_number(): string {
    return this._ring_number;
  }
  set ring_number(value: string) {
    this._ring_number = value;
  }

  get ring_type(): string {
    return this._ring_type;
  }
  set ring_type(value: string) {
    this._ring_type = value;
  }

  get spore_print_color(): string {
    return this._spore_print_color;
  }
  set spore_print_color(value: string) {
    this._spore_print_color = value;
  }

  get population(): string {
    return this._population;
  }
  set population(value: string) {
    this._population = value;
  }

  get habitat(): string {
    return this._habitat;
  }
  set habitat(value: string) {
    this._habitat = value;
  }
  toJSON() {
    return {
      cap_shape: this._cap_shape,
      cap_surface: this._cap_surface,
      cap_color: this._cap_color,
      bruises: this._bruises,
      odor: this._odor,
      gill_attachment: this._gill_attachment,
      gill_spacing: this._gill_spacing,
      gill_size: this._gill_size,
      gill_color: this._gill_color,
      stalk_shape: this._stalk_shape,
      stalk_root: this._stalk_root,
      stalk_surface_above_ring: this._stalk_surface_above_ring,
      stalk_surface_below_ring: this._stalk_surface_below_ring,
      stalk_color_above_ring: this._stalk_color_above_ring,
      stalk_color_below_ring: this._stalk_color_below_ring,
      veil_color: this._veil_color,
      ring_number: this._ring_number,
      ring_type: this._ring_type,
      spore_print_color: this._spore_print_color,
      population: this._population,
      habitat: this._habitat,
    };
  }
}
