gemma3 :270m
20,9 millions Téléchargements Mis à jour il y a 2 mois
Le modèle actuel le plus performant qui fonctionne sur un seul GPU.
vision 270 m 1b 4b 12b 27b
Mis à jour il y a 2 mois e7d36fb2c3b3 · 292 Mo ·
modèle cambre gemma3 · paramètres 268M · quantification Q8_0 292 Mo
modèle {{- $systemPromptAdded := false }} {{- plage $i, $_ := .M… 476B
paramètres { "stop": [ "<fin_de_tour>" ], "top_k": 64, "top_p": 0.95… 61B
licence Conditions d'utilisation de Gemma Dernière modification :… 8,4 Ko
Lisez-moi
Ce modèle nécessite Ollama 0.6 ou version ultérieure. Téléchargez Ollama.
Gemma est une famille de modèles légers de Google, basée sur la technologie Gemini. Les
modèles Gemma 3 sont multimodaux (traitement de texte et d'images) et disposent d'une
ollama run gemma3:270m
15/10/2025 12:32 gemma3:270m
https://ollama.com/library/gemma3:270m 1/6
fenêtre contextuelle de 128 Ko prenant en charge plus de 140 langues. Disponibles en tailles
de paramètres de 270 M, 1 B, 4 B, 12 B et 27 B, ils excellent dans des tâches telles que la
réponse aux questions, la synthèse et le raisonnement. Leur conception compacte permet un
déploiement sur des appareils aux ressources limitées.
Modèles
Texte
Modèle de paramètres 270M (fenêtre de contexte 32k)
ollama run gemma3:270m
Modèle de paramètres 1B (fenêtre de contexte de 32 k)
ollama run gemma3:1b
Multimodal (Vision)
Modèle de paramètres 4B (fenêtre de contexte de 128 k)
ollama run gemma3:4b
Modèle de paramètres 12B (fenêtre de contexte 128k)
ollama run gemma3:12b
Modèle de paramètres 27B (fenêtre de contexte 128k)
ollama run gemma3:27b
Modèles entraînés prenant en charge la quantification (QAT)
Les modèles Gemma 3 entraînés à la quantification préservent une qualité similaire à celle des
modèles demi-précision (BF16) tout en conservant une empreinte mémoire inférieure (3 fois
inférieure par rapport aux modèles non quantifiés).
Modèle de paramètres 1B
15/10/2025 12:32 gemma3:270m
https://ollama.com/library/gemma3:270m 2/6
ollama run gemma3:1b-it-qat
Modèle de paramètres 4B
ollama run gemma3:4b-it-qat
Modèle à 12 paramètres B
ollama run gemma3:12b-it-qat
Modèle de paramètres 27B
ollama run gemma3:27b-it-qat
Évaluation
Résultats de référence
Gemma 3 270M
15/10/2025 12:32 gemma3:270m
https://ollama.com/library/gemma3:270m 3/6
Référence n-shot Gemma 3 270m instruction réglée
HellaSwag 0 coup 37,7
PIQA 0 coup 66,2
ARC-c 0 coup 28.2
WinoGrande 0 coup 52,3
BIG-Bench Dur quelques coups 26,7
SI Évaluer 0 coup 51,2
Ces modèles ont été évalués par rapport à une vaste collection de différents ensembles de
données et de mesures pour couvrir différents aspects de la génération de texte :
Capacités de raisonnement, de logique et de codage
Référence Métrique
Gemma 3 PT
1B
Gemma 3 PT
4B
Gemma 3 PT
12B
Gemma 3 PT
27B
HellaSwag 10 coups 62,3 77,2 84,2 85,6
BoolQ 0 coup 63,2 72,3 78,8 82,4
PIQA 0 coup 73,8 79,6 81,8 83,3
SocialIQA 0 coup 48,9 51,9 53,4 54,9
TriviaQA 5 coups 39,8 65,8 78,2 85,5
Questions
naturelles
5 coups 9,48 20.0 31,4 36.1
ARC-c 25 coups 38,4 56,2 68,9 70,6
ARC-e 0 coup 73,0 82,4 88,3 89,0
WinoGrande 5 coups 58,2 64,7 74,3 78,8
BIG-Bench Dur 28,4 50,9 72,6 77,7
BAISSE 3 coups, F1 42,4 60.1 72,2 77,2
AGIEval 3-5 coups 22.2 42.1 57,4 66,2
15/10/2025 12:32 gemma3:270m
https://ollama.com/library/gemma3:270m 4/6
Référence Métrique
Gemma 3 PT
1B
Gemma 3 PT
4B
Gemma 3 PT
12B
Gemma 3 PT
27B
MMLU 5 coups, top
1
26,5 59,6 74,5 78,6
MATHÉMATIQUES 4 coups – 24.2 43,3 50,0
GSM8K 5 coups,
maj@1
1,36 38,4 71,0 82,6
GPQA 9,38 15.0 25,4 24.3
MMLU (Pro) 5 coups 11.2 23,7 40,8 43,9
MBPP 3 coups 9,80 46,0 60,4 65,6
HumanEval passe@1 6.10 36,0 45,7 48,8
MMLU (Pro COT) 5 coups 9,7 NaN NaN NaN
Capacités multilingues
Référence Gemma 3 PT 1B Gemma 3 PT 4B Gemma 3 PT 12B Gemma 3 PT 27B
MGSM 2.04 34,7 64,3 74,3
Global-MMLU-Lite 24,9 57,0 69,4 75,7
Belebele 26,6 59,4 78,0 –
WMT24++ (ChrF) 36,7 48,4 53,9 55,7
FloRes 29,5 39,2 46,0 48,8
XL-Somme 4,82 8,55 12.2 14,9
XQuAD (tous) 43,9 68,0 74,5 76,8
Capacités multimodales
Référence Gemma 3 PT 4B Gemma 3 PT 12B Gemma 3 PT 27B
COCOcap 102 111 116
DocVQA (valeur) 72,8 82,3 85,6
InfoVQA (valeur) 44.1 54,8 59,4
15/10/2025 12:32 gemma3:270m
https://ollama.com/library/gemma3:270m 5/6
Référence Gemma 3 PT 4B Gemma 3 PT 12B Gemma 3 PT 27B
MMMU (pt) 39,2 50,3 56.1
TexteVQA (val) 58,9 66,5 68,6
RealWorldQA 45,5 52,2 53,9
ReMI 27,3 38,5 44,8
IA2D 63,2 75,2 79,0
ChartQA 45,4 60,9 63,8
ChartQA (augmenté) 81,8 88,5 88,7
VQAv2 – – –
CLIGNOTER 38,0 35,9 39,6
OKVQA 51,0 58,7 60,2
TallyQA 42,5 51,8 54,3
SpatialSense VQA 50,9 60,0 59,4
CountBenchQA 26.1 17,8 68,0
Référence
Conditions d'utilisation de Gemma
Blog Télécharger Documents
GitHub Discorde X (Twitter) Rencontres
© 2025 Ollama Inc.
15/10/2025 12:32 gemma3:270m
https://ollama.com/library/gemma3:270m 6/6