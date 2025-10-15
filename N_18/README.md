# 🤖 Projet utilisant le modèle Gemma 3 (270M)

Ce projet utilise le modèle **[Gemma 3 (270M)](https://ollama.com/library/gemma3:270m)** via [**Ollama**](https://ollama.com/).  
Ce modèle est une petite version de la famille **Gemma 3**, optimisée pour tourner localement sur des machines modestes tout en offrant d’excellentes performances pour le traitement de texte.

---

## 🚀 Installation

### 1. Installer Ollama
Télécharge et installe **Ollama** depuis le site officiel :  
👉 [https://ollama.com/download](https://ollama.com/download)

### 2. Télécharger le modèle Gemma 3 (270M)
Une fois Ollama installé, exécute cette commande dans ton terminal :

```bash
ollama pull gemma3:270m
🧠 Utilisation
Lance le modèle avec la commande suivante :

bash
Copier le code
ollama run gemma3:270m
Tu peux ensuite discuter directement avec le modèle dans ton terminal ou l’intégrer à ton application (par exemple via une API ou un script Python).

🧩 Exemple d’utilisation dans un script Python
python
Copier le code
import subprocess

prompt = "Explique le concept de l'apprentissage supervisé en IA."
result = subprocess.run(["ollama", "run", "gemma3:270m"], input=prompt.encode(), capture_output=True)
print(result.stdout.decode())
📚 Ressources utiles
📘 Documentation d’Ollama : https://github.com/ollama/ollama

🧩 Bibliothèque Gemma 3 (270M) : https://ollama.com/library/gemma3:270m

