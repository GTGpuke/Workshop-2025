import speech_recognition as sr
import time

# --- LE MODÈLE D'IA (la liste des sorts) ---
# Dictionnaire des sorts avec le nombre de mots attendus
SORTS_CONNUS = {
    "expelliarmus": 1,
    "lumos": 1,
    "nox": 1,
    "alohomora": 1,
    "wingardium leviosa": 2,
    "petrificus totalus": 2,
    "stupefix": 2,
    "expecto patronum": 3,

}

# Liste des sorts nécessitant une correspondance exacte pour éviter les fausses détections.
SORTS_MOTS_STRICTS = ["lumos", "nox", "alohomora", "stupefy", "accio"]

# Liste des variations phonétiques tolérées (pour les sorts fictifs mal transcrits par Google)
VARIATIONS_TOLEREES = {
    "accio": ["axio", "akio"], 
    "nox": ["nocks", "knox"],
    "stupefy": ["stupify"],
    "alohomora": ["allohomora", "aloha mora"],
}

def ecouter_et_reconnaitre_sort():
    """
    Écoute l'audio du microphone, le convertit en texte et vérifie si c'est un sort connu.
    """
    r = sr.Recognizer()
    
    r.pause_threshold = 0.8  # Temps d'attente après la fin de la parole
    r.non_speaking_duration = 0.5 # Durée minimale de silence à ignorer

    with sr.Microphone() as source:
        print("🪄 Préparation... Ajustement du microphone pour le bruit ambiant.")
        
        # --- Fonction clé pour filtrer le bruit ambiant ---
        r.adjust_for_ambient_noise(source, duration=1) 
        
        print("🔊 Dites un sort ! (Prononciation Anglaise/Latine recommandée)")
        
        try:
            audio = r.listen(source)
        except sr.WaitTimeoutError:
            print("🚫 Pas de parole détectée.")
            return

    # --- Étape 1 : Collecte des mots reconnus (Priorité EN, puis FR) ---
    tentatives_reconnues = set()
    
    # Priorité au modèle ANGLAIS (en-US) pour les mots fictifs (plus fiable pour la phonétique).
    for lang in ["en-US", "fr-FR"]: 
        try:
            # show_all=True nous donne toutes les hypothèses de Google
            resultat = r.recognize_google(audio, language=lang, show_all=True)
            if resultat and 'alternative' in resultat:
                for alternative in resultat['alternative']:
                    texte_alternative = alternative['transcript'].lower()
                    
                    # On ajoute tous les mots de l'alternative à notre ensemble de tentatives
                    tentatives_reconnues.update(set(texte_alternative.split()))
                    
        except sr.UnknownValueError:
            continue # L'audio n'a pas été compris dans cette langue
        except sr.RequestError as e:
            print(f"🌐 ERREUR ({lang}): Impossible de se connecter au service Google Speech Recognition; {e}")
            
    if not tentatives_reconnues:
        print("🤷 La reconnaissance vocale n'a rien compris.")
        return

    print(f"👂 Mots uniques détectés : {tentatives_reconnues}")

    # --- Étape 2 : Vérification des sorts (avec tolérance phonétique) ---
    
    for sort_canonique, nb_mots_attendus in SORTS_CONNUS.items():
        
        # 2.1. Vérification par correspondance EXACTE et Variantes (pour les sorts courts)
        # On vérifie si le mot exact OU ses variations phonétiques sont présentes.
        mots_a_verifier = {sort_canonique}
        if sort_canonique in VARIATIONS_TOLEREES:
            mots_a_verifier.update(VARIATIONS_TOLEREES[sort_canonique])
            
        if any(mot in tentatives_reconnues for mot in mots_a_verifier):
             # Cette condition couvre "accio", "nox", etc., et leurs variantes phonétiques.
             print("✅ **Sortilège reconnu !**")
             print(f"✨ Le sort est : **{sort_canonique.upper()}**")
             return
        
        # 2.2. Vérification des SORTS MULTI-MOTS (plus tolérants pour les longs sorts)
        mots_du_sort = sort_canonique.split()
        if nb_mots_attendus > 1:
            # Vérifie si tous les mots du sort sont présents (Ex: Wingardium ET Leviosa)
            if all(mot in tentatives_reconnues for mot in mots_du_sort):
                print("✅ **Sortilège reconnu (Tous les mots trouvés) !**")
                print(f"✨ Le sort est : **{sort_canonique.upper()}**")
                return

    # Conclusion si aucun sort n'a été trouvé
    print("❌ Sortilège non reconnu. Réessayez !")


# --- Boucle principale ---
if __name__ == "__main__":
    while True:
        ecouter_et_reconnaitre_sort()
        time.sleep(1) 
        print("-" * 30)