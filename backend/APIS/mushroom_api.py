import json
from flask_restx import Namespace, Resource, fields
from flask import Response, request
from controllers.mushroom_controller import analyze_mushroom, save_userFeedback
from config import initialize_firebase


mushroom_namespace = Namespace(
    "mushroom", description="Opérations sur les champignons", mask=False
)

parserMushroom = mushroom_namespace.parser()

parserMushroom.add_argument(
    "cap_shape",
    type=str,
    required=True,
    choices=["b", "c", "x", "f", "k", "s"],
    help="Forme du chapeau",
    location="form",
)
parserMushroom.add_argument(
    "cap_surface",
    type=str,
    required=True,
    choices=["f", "g", "y", "s"],
    help="Surface du chapeau",
    location="form",
)
parserMushroom.add_argument(
    "cap_color",
    type=str,
    required=True,
    choices=["n", "b", "c", "g", "r", "p", "u", "e", "w", "y"],
    help="Couleur du chapeau",
    location="form",
)
parserMushroom.add_argument(
    "bruises",
    type=str,
    required=True,
    choices=["t", "f"],
    help="Présence de meurtrissures",
    location="form",
)
parserMushroom.add_argument(
    "odor",
    type=str,
    required=True,
    choices=["a", "l", "c", "y", "f", "m", "n", "p", "s"],
    help="Odeur",
    location="form",
)
parserMushroom.add_argument(
    "gill_attachment",
    type=str,
    required=True,
    choices=["a", "d", "f", "n"],
    help="Attache des lames",
    location="form",
)
parserMushroom.add_argument(
    "gill_spacing",
    type=str,
    required=True,
    choices=["c", "w", "d"],
    help="Espacement des lames",
    location="form",
)
parserMushroom.add_argument(
    "gill_size",
    type=str,
    required=True,
    choices=["b", "n"],
    help="Taille des lames",
    location="form",
)
parserMushroom.add_argument(
    "gill_color",
    type=str,
    required=True,
    choices=["k", "n", "b", "h", "g", "r", "o", "p", "u", "e", "w", "y"],
    help="Couleur des lames",
    location="form",
)
parserMushroom.add_argument(
    "stalk_shape",
    type=str,
    required=True,
    choices=["e", "t"],
    help="Forme du pied",
    location="form",
)
parserMushroom.add_argument(
    "stalk_root",
    type=str,
    required=True,
    choices=["b", "c", "u", "e", "z", "r", "?"],
    help="Type de racine",
    location="form",
)
parserMushroom.add_argument(
    "stalk_surface_above_ring",
    type=str,
    required=True,
    choices=["f", "y", "k", "s"],
    help="Surface du pied au-dessus de l'anneau",
    location="form",
)
parserMushroom.add_argument(
    "stalk_surface_below_ring",
    type=str,
    required=True,
    choices=["f", "y", "k", "s"],
    help="Surface du pied sous l'anneau",
    location="form",
)
parserMushroom.add_argument(
    "stalk_color_above_ring",
    type=str,
    required=True,
    choices=["n", "b", "c", "g", "o", "p", "e", "w", "y"],
    help="Couleur du pied au-dessus de l'anneau",
    location="form",
)
parserMushroom.add_argument(
    "stalk_color_below_ring",
    type=str,
    required=True,
    choices=["n", "b", "c", "g", "o", "p", "e", "w", "y"],
    help="Couleur du pied sous l'anneau",
    location="form",
)

parserMushroom.add_argument(
    "veil_color",
    type=str,
    required=True,
    choices=["n", "o", "w", "y"],
    help="Couleur du voile",
    location="form",
)
parserMushroom.add_argument(
    "ring_number",
    type=str,
    required=True,
    choices=["n", "o", "t"],
    help="Nombre d’anneaux",
    location="form",
)
parserMushroom.add_argument(
    "ring_type",
    type=str,
    required=True,
    choices=["c", "e", "f", "l", "n", "p", "s", "z"],
    help="Type d’anneau",
    location="form",
)
parserMushroom.add_argument(
    "spore_print_color",
    type=str,
    required=True,
    choices=["k", "n", "b", "h", "r", "o", "u", "w", "y"],
    help="Couleur de l’impression de spores",
    location="form",
)
parserMushroom.add_argument(
    "population",
    type=str,
    required=True,
    choices=["a", "c", "n", "s", "v", "y"],
    help="Population",
    location="form",
)
parserMushroom.add_argument(
    "habitat",
    type=str,
    required=True,
    choices=["g", "l", "m", "p", "u", "w", "d"],
    help="Habitat",
    location="form",
)

input_model = mushroom_namespace.model(
    "Mushroom",
    {
        "cap_shape": fields.String(
            required=True,
            description="Forme du chapeau",
            enum=[
                "b",
                "c",
                "x",
                "f",
                "k",
                "s",
            ],  # bell, conical, convex, flat, knobbed, sunken
        ),
        "cap_surface": fields.String(
            required=True,
            description="Surface du chapeau",
            enum=["f", "g", "y", "s"],  # fibrous, grooves, scaly, smooth
        ),
        "cap_color": fields.String(
            required=True,
            description="Couleur du chapeau",
            enum=["n", "b", "c", "g", "r", "p", "u", "e", "w", "y"],
        ),
        "bruises": fields.String(
            required=True, description="Présence de meurtrissures", enum=["t", "f"]
        ),
        "odor": fields.String(
            required=True,
            description="Odeur",
            enum=["a", "l", "c", "y", "f", "m", "n", "p", "s"],
        ),
        "gill_attachment": fields.String(
            required=True, description="Attache des lames", enum=["a", "d", "f", "n"]
        ),
        "gill_spacing": fields.String(
            required=True, description="Espacement des lames", enum=["c", "w", "d"]
        ),
        "gill_size": fields.String(
            required=True, description="Taille des lames", enum=["b", "n"]
        ),
        "gill_color": fields.String(
            required=True,
            description="Couleur des lames",
            enum=["k", "n", "b", "h", "g", "r", "o", "p", "u", "e", "w", "y"],
        ),
        "stalk_shape": fields.String(
            required=True, description="Forme du pied", enum=["e", "t"]
        ),
        "stalk_root": fields.String(
            required=True,
            description="Type de racine",
            enum=["b", "c", "u", "e", "z", "r", "?"],
        ),
        "stalk_surface_above_ring": fields.String(
            required=True,
            description="Surface du pied au-dessus de l'anneau",
            enum=["f", "y", "k", "s"],
        ),
        "stalk_surface_below_ring": fields.String(
            required=True,
            description="Surface du pied sous l'anneau",
            enum=["f", "y", "k", "s"],
        ),
        "stalk_color_above_ring": fields.String(
            required=True,
            description="Couleur du pied au-dessus de l'anneau",
            enum=["n", "b", "c", "g", "o", "p", "e", "w", "y"],
        ),
        "stalk_color_below_ring": fields.String(
            required=True,
            description="Couleur du pied sous l'anneau",
            enum=["n", "b", "c", "g", "o", "p", "e", "w", "y"],
        ),
        "veil_color": fields.String(
            required=True, description="Couleur du voile", enum=["n", "o", "w", "y"]
        ),
        "ring_number": fields.String(
            required=True, description="Nombre d’anneaux", enum=["n", "o", "t"]
        ),
        "ring_type": fields.String(
            required=True,
            description="Type d’anneau",
            enum=["c", "e", "f", "l", "n", "p", "s", "z"],
        ),
        "spore_print_color": fields.String(
            required=True,
            description="Couleur de l’impression de spores",
            enum=["k", "n", "b", "h", "r", "o", "u", "w", "y"],
        ),
        "population": fields.String(
            required=True, description="Population", enum=["a", "c", "n", "s", "v", "y"]
        ),
        "habitat": fields.String(
            required=True,
            description="Habitat",
            enum=["g", "l", "m", "p", "u", "w", "d"],
        ),
    },
)


@mushroom_namespace.route("/analyze")
class MushroomAnalyzer(Resource):
    @mushroom_namespace.doc(
        responses={200: "Success", 400: "Bad Request", 500: "Internal Server Error"},
        parser=parserMushroom,
    )
    def post(self):
        try:
            # Récupérer les valeurs du formulaire
            data = {
                "cap-shape": request.form.get("cap_shape"),
                "cap-surface": request.form.get("cap_surface"),
                "cap-color": request.form.get("cap_color"),
                "bruises": request.form.get("bruises"),
                "odor": request.form.get("odor"),
                "gill-attachment": request.form.get("gill_attachment"),
                "gill-spacing": request.form.get("gill_spacing"),
                "gill-size": request.form.get("gill_size"),
                "gill-color": request.form.get("gill_color"),
                "stalk-shape": request.form.get("stalk_shape"),
                "stalk-root": request.form.get("stalk_root"),
                "stalk-surface-above-ring": request.form.get(
                    "stalk_surface_above_ring"
                ),
                "stalk-surface-below-ring": request.form.get(
                    "stalk_surface_below_ring"
                ),
                "stalk-color-above-ring": request.form.get("stalk_color_above_ring"),
                "stalk-color-below-ring": request.form.get("stalk_color_below_ring"),
                "veil-color": request.form.get("veil_color"),
                "ring-number": request.form.get("ring_number"),
                "ring-type": request.form.get("ring_type"),
                "spore-print-color": request.form.get("spore_print_color"),
                "population": request.form.get("population"),
                "habitat": request.form.get("habitat"),
            }

            prediction = analyze_mushroom(data)
            return {"prediction": prediction}, 200

        except Exception as e:
            return {"error": str(e)}, 500


feedback_model = mushroom_namespace.model(
    "UserFeedback",
    {
        "mushroom": fields.Raw(
            required=True, description="Caractéristiques du champignon (objet JSON)"
        ),
        "predicted_class": fields.String(
            required=True,
            description="Classe prédite",
            enum=["edible", "poisonous"]
        ),
        "user_feedback": fields.String(
            required=True,
            description="Commentaire de l'utilisateur"
        ),
    }
)


@mushroom_namespace.route("/user-feedback")
class MushroomFeedback(Resource):
    @mushroom_namespace.expect(feedback_model)
    @mushroom_namespace.doc(
        responses={200: "Feedback saved", 400: "Bad Request", 500: "Server Error"}
    )
    def post(self):
        try:
            data = request.get_json()
            mushroom_json = json.dumps(data.get("mushroom"))
            predicted_class = data.get("predicted_class")
            user_feedback = data.get("user_feedback")

            if not (mushroom_json and predicted_class and user_feedback):
                return {"error": "Missing required fields"}, 400

            firebase, firestoreDB = initialize_firebase()

            if not firestoreDB:
                return {"error": "Firebase initialization failed"}, 500
                
            doc_id = save_userFeedback(
                firestoreDB,
                mushroom_json=mushroom_json,
                predicted_class=predicted_class,
                user_feedback=user_feedback,
            )

            return {"message": "Feedback saved successfully !"}, 200

        except Exception as e:
            return {"error": str(e)}, 500
