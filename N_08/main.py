import bpy
import math

# --- PARAMÈTRES DU BÂTIMENT ---
NIVEAUX = 4
HAUTEUR_ETAGE = 4.0
LARGEUR_BASE = 40.0
PROFONDEUR_BASE = 20.0
MUR_EPAISSEUR = 0.5 
MYDIL_ETAGE_INDEX = 2 # Le MyDil est au 3ème niveau (index 2: 0, 1, 2, 3)

# --- COULEURS ET MATÉRIAUX ---
COLOR_FACADE = (0.9, 0.9, 0.9) # Blanc
COLOR_MYDIL_SOL = (0.4, 0.25, 0.75) # Violet pour le sol/plafond du MyDil
COLOR_ETAGE_SOL = (0.3, 0.3, 0.3) # Gris foncé pour les autres sols/plafonds
COLOR_VIDE = (0.05, 0.05, 0.05) # Couleur du fond des trous (pour un effet d'ombre)

# --- FONCTIONS UTILITAIRES ---

def clean_scene():
    """Supprime tous les objets de la scène par défaut."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

def create_material(name, color_rgb):
    """Crée un matériau PBR de base."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs['Base Color'].default_value = color_rgb + (1,)
    return mat

def create_cube(name, scale, location, material=None):
    """Crée un cube avec nom, échelle, position et matériau."""
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    obj.location = location
    if material:
        if obj.data.materials: obj.data.materials[0] = material
        else: obj.data.materials.append(material)
    return obj

# --- 1. NETTOYAGE ET MATÉRIAUX ---
clean_scene()
MAT_FACADE = create_material("Facade_Blanche", COLOR_FACADE)
MAT_MYDIL_SOL = create_material("MyDil_Sol_Violet", COLOR_MYDIL_SOL)
MAT_ETAGE_SOL = create_material("Etage_Sol_Gris", COLOR_ETAGE_SOL)
MAT_VIDE = create_material("Vide_Interieur", COLOR_VIDE)

# --- 2. CRÉATION DE LA COQUE EXTÉRIEURE (Les murs pleins) ---

HAUTEUR_TOTALE = NIVEAUX * HAUTEUR_ETAGE
COQUE_SCALE = (LARGEUR_BASE, PROFONDEUR_BASE, HAUTEUR_TOTALE)
COQUE_LOC = (0, 0, HAUTEUR_TOTALE / 2)

# Structure principale du bâtiment
batiment_base = create_cube("EPSI_Batiment_Coque", COQUE_SCALE, COQUE_LOC, MAT_FACADE)

# --- 3. DÉFINITION DES OUVERTURES (volumes à soustraire) ---

trou_objects = [] # Liste pour stocker tous les volumes de découpe

# --- TROU PORTE PRINCIPALE (Rez-de-chaussée) ---
PORTE_H = 3.0
PORTE_L = 4.0
PORTE_Z_LOC = PORTE_H / 2 
FACE_Y = -PROFONDEUR_BASE / 2 

porte_trou = create_cube(
    "Decoupe_Porte",
    (PORTE_L, MUR_EPAISSEUR * 2, PORTE_H), # Plus épais que le mur pour garantir la découpe
    (0, FACE_Y, PORTE_Z_LOC)
)
trou_objects.append(porte_trou)

# --- TROUS FENÊTRES ---
FENETRE_H = 1.5
FENETRE_L = 3.0
FENETRE_Z_OFFSET = 1.0 # Distance du sol de l'étage

pos_x_fenetres = [LARGEUR_BASE / 4, -LARGEUR_BASE / 4, LARGEUR_BASE / 8, -LARGEUR_BASE / 8] 

# Création des trous de fenêtres pour chaque étage (sauf le rez-de-chaussée)
for i in range(NIVEAUX):
    if i == 0: # Pas de fenêtres au rez-de-chaussée (juste la porte)
        continue
    
    Z_ETAGE_BASE = i * HAUTEUR_ETAGE
    Z_FENETRE_LOC = Z_ETAGE_BASE + FENETRE_Z_OFFSET + (FENETRE_H / 2)

    for j, x in enumerate(pos_x_fenetres):
        fenetre_trou = create_cube(
            f"Decoupe_Fenetre_{i}_{j}",
            (FENETRE_L, MUR_EPAISSEUR * 2, FENETRE_H),
            (x, FACE_Y, Z_FENETRE_LOC)
        )
        trou_objects.append(fenetre_trou)

# --- 4. APPLICATION DES OPÉRATIONS BOOLÉENNES (CRÉATION DES TROUS) ---

# Appliquer les découpes une par une sur le bâtiment principal
for trou_obj in trou_objects:
    bool_mod = batiment_base.modifiers.new(name=f"Boolean_{trou_obj.name}", type='BOOLEAN')
    bool_mod.operation = 'DIFFERENCE'
    bool_mod.object = trou_obj
    
    # Appliquer le modificateur et supprimer l'objet de découpe
    bpy.context.view_layer.objects.active = batiment_base
    bpy.ops.object.modifier_apply(modifier=bool_mod.name)
    bpy.data.objects.remove(trou_obj)


# --- 5. CRÉATION DES PIÈCES (SOLS ET PLAFONDS DES ÉTAGES) ---

for i in range(NIVEAUX):
    Z_SOL_ETAGE = i * HAUTEUR_ETAGE + MUR_EPAISSEUR / 2 # Le sol est au-dessus de la base du mur

    # Définir le matériau en fonction de l'étage
    current_mat = MAT_ETAGE_SOL
    if i == MYDIL_ETAGE_INDEX:
        current_mat = MAT_MYDIL_SOL

    sol_etage = create_cube(
        f"Sol_Etage_{i}",
        (LARGEUR_BASE - MUR_EPAISSEUR * 2, PROFONDEUR_BASE - MUR_EPAISSEUR * 2, MUR_EPAISSEUR),
        (0, 0, Z_SOL_ETAGE),
        current_mat
    )
    # Rendre les sols légèrement visibles si les murs sont cachés
    sol_etage.display_type = 'SOLID' 


# --- 6. ÉCLAIRAGE ET CAMÉRA ---

# Lumière principale (Soleil) pour l'éclairage extérieur
bpy.ops.object.light_add(type='SUN', location=(LARGEUR_BASE * 2, -PROFONDEUR_BASE * 3, HAUTEUR_TOTALE * 2))
light_sun = bpy.context.object
light_sun.data.energy = 4.0

# Lumière ambiante (Point) pour éclairer les intérieurs sombres (visibles à travers les trous)
bpy.ops.object.light_add(type='POINT', location=(0, 0, HAUTEUR_TOTALE / 2))
light_fill = bpy.context.object
light_fill.data.energy = 2000.0 # Forte pour éclairer l'intérieur
light_fill.data.color = (0.8, 0.9, 1.0) # Lumière froide pour un look moderne

# Caméra pour vue extérieure
bpy.ops.object.camera_add(location=(LARGEUR_BASE * 1.5, -PROFONDEUR_BASE * 2.5, HAUTEUR_TOTALE * 0.8))
cam = bpy.context.object
cam_constraint = cam.constraints.new(type='TRACK_TO')
cam_constraint.target = batiment_base
cam_constraint.track_axis = 'TRACK_NEGATIVE_Z'
cam_constraint.up_axis = 'UP_Y'

bpy.context.scene.camera = cam

print("Modèle 3D du bâtiment EPSI (avec VRAIS trous et Pièces) généré avec succès!")