import os
from PIL import Image

def compress_webp_images(directory, quality=75):
    """
    Parcourt le répertoire spécifié (et ses sous-dossiers) pour trouver des images .webp
    et les compresse à nouveau avec le niveau de qualité spécifié.

    :param directory: Chemin vers le répertoire contenant les images.
    :param quality: Niveau de qualité pour la compression (1 à 100).
    """
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.webp'):

                file_path = os.path.join(root, file)
                
                # Ouvrir l'image .webp, compresser et sauvegarder sur place
                with Image.open(file_path) as img:
                    img.save(file_path, format="webp", quality=quality)
                
                print(f"Compressé: {file_path} avec qualité = {quality}")

# Remplacer 'chemin_vers_votre_dossier' par le chemin du dossier contenant vos images .webp
compress_webp_images('../Front-End-Fisheye/assets/images/photographers', quality=70)
