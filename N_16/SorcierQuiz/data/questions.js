// data/questions.js

export const initialScores = {
  LUM: 0, 
  TEN: 0, 
  TEL: 0, 
  AER: 0, 
};

export const sorcierTypes = {
  LUM: { name: "Luminomancien", description: "Votre magie est une source de sagesse et de protection. Vous illuminez le chemin des autres." },
  TEN: { name: "Ténébromancien", description: "Maître des ombres et des illusions, vous excellez dans les arts subtils et la ruse." },
  TEL: { name: "Tellurien", description: "Vous tirez votre force de la terre et de la nature. Votre persévérance est votre plus grande arme." },
  AER: { name: "Aéromancien", description: "Aussi libre que le vent, votre magie est rapide et imprévisible. Vous êtes un aventurier dans l'âme." },
};

export const questions = [
  // --- THÈME : RÉACTION & PRIORITÉS ---

  {
    question: "1. Face à un problème inconnu, quelle est votre première réaction ?",
    options: [
      { text: "Chercher des indices et analyser la situation en secret.", score_type: 'TEN', points: 3 },
      { text: "Demander conseil et chercher une solution collaborative.", score_type: 'LUM', points: 3 },
      { text: "Tenter une approche audacieuse et improvisée.", score_type: 'AER', points: 2 },
      { text: "Tester différentes solutions par la force et la patience.", score_type: 'TEL', points: 2 },
    ],
  },
  {
    question: "2. Quelle est votre plus grande qualité ?",
    options: [
      { text: "La Loyauté et l'honnêteté.", score_type: 'LUM', points: 3 },
      { text: "La Détermination et la résistance.", score_type: 'TEL', points: 3 },
      { text: "L'Adaptabilité et l'ingéniosité.", score_type: 'AER', points: 2 },
      { text: "La Discrétion et la perspicacité.", score_type: 'TEN', points: 2 },
    ],
  },
  {
    question: "3. Si un ami est en difficulté, que faites-vous ?",
    options: [
      { text: "J'offre un refuge sûr et un soutien inconditionnel.", score_type: 'TEL', points: 3 },
      { text: "Je trouve rapidement une diversion pour lui donner du temps.", score_type: 'AER', points: 2 },
      { text: "J'analyse la cause du problème et propose une stratégie.", score_type: 'TEN', points: 2 },
      { text: "Je le réconforte et l'aide à retrouver sa force intérieure.", score_type: 'LUM', points: 3 },
    ],
  },
  {
    question: "4. Quelle ambition vous anime le plus ?",
    options: [
      { text: "Atteindre la vérité et la connaissance absolue.", score_type: 'LUM', points: 3 },
      { text: "Avoir la liberté de voyager et d'explorer sans limites.", score_type: 'AER', points: 3 },
      { text: "Construire un héritage durable et puissant.", score_type: 'TEL', points: 2 },
      { text: "Maîtriser les secrets et les arcanes les plus cachés.", score_type: 'TEN', points: 2 },
    ],
  },
  
  // --- THÈME : ENVIRONNEMENT & NATURE ---
  
  {
    question: "5. Quel environnement vous attire le plus ?",
    options: [
      { text: "Une forêt dense et ancienne.", score_type: 'TEL', points: 3 },
      { text: "Un observatoire au sommet d'une montagne.", score_type: 'AER', points: 3 },
      { text: "Une vieille bibliothèque secrète.", score_type: 'TEN', points: 2 },
      { text: "Un lieu de culte ou de méditation paisible.", score_type: 'LUM', points: 2 },
    ],
  },
  {
    question: "6. Quel élément magique trouvez-vous le plus fascinant ?",
    options: [
      { text: "La brume et les mirages.", score_type: 'TEN', points: 3 },
      { text: "Le vent et l'orage.", score_type: 'AER', points: 3 },
      { text: "La roche et la végétation.", score_type: 'TEL', points: 2 },
      { text: "La lumière pure et l'énergie solaire.", score_type: 'LUM', points: 2 },
    ],
  },
  {
    question: "7. Quel animal magique choisiriez-vous comme compagnon ?",
    options: [
      { text: "Un Phénix rayonnant.", score_type: 'LUM', points: 3 },
      { text: "Un Loup solitaire et furtif.", score_type: 'TEN', points: 3 },
      { text: "Un Griffon majestueux.", score_type: 'AER', points: 2 },
      { text: "Un Dragon de terre endormi.", score_type: 'TEL', points: 2 },
    ],
  },
  {
    question: "8. Votre heure préférée pour pratiquer la magie ?",
    options: [
      { text: "L'aube, pour la clarté et l'espoir.", score_type: 'LUM', points: 3 },
      { text: "Le crépuscule, pour le mystère et le secret.", score_type: 'TEN', points: 3 },
      { text: "La pleine nuit, quand tout est calme.", score_type: 'TEL', points: 2 },
      { text: "N'importe quand, quand l'inspiration me prend !", score_type: 'AER', points: 2 },
    ],
  },

  // --- THÈME : STYLE DE COMBAT & APPRENTISSAGE ---

  {
    question: "9. Quelle est votre stratégie de combat idéale ?",
    options: [
      { text: "Déborder l'ennemi par la vitesse et le mouvement.", score_type: 'AER', points: 3 },
      { text: "Paralyser et manipuler l'adversaire mentalement.", score_type: 'TEN', points: 3 },
      { text: "Ériger des défenses infranchissables et attendre.", score_type: 'TEL', points: 2 },
      { text: "Épuiser l'ennemi en soignant mes alliés et moi-même.", score_type: 'LUM', points: 2 },
    ],
  },
  {
    question: "10. Quel type de sort vous fascine le plus ?",
    options: [
      { text: "Sorts de transformation matérielle (alchimie).", score_type: 'TEL', points: 3 },
      { text: "Sorts d'enchantement et d'illusion.", score_type: 'TEN', points: 3 },
      { text: "Sorts de téléportation et de vol.", score_type: 'AER', points: 2 },
      { text: "Sorts de purification et de guérison.", score_type: 'LUM', points: 2 },
    ],
  },
  {
    question: "11. Comment jugez-vous le succès d'une mission ?",
    options: [
      { text: "Si j'ai appris quelque chose de nouveau.", score_type: 'LUM', points: 3 },
      { text: "Si j'ai atteint l'objectif, quel qu'en soit le coût.", score_type: 'TEN', points: 3 },
      { text: "Si les efforts fournis ont porté leurs fruits (long terme).", score_type: 'TEL', points: 2 },
      { text: "Si l'expérience était excitante et pleine de surprises.", score_type: 'AER', points: 2 },
    ],
  },
  {
    question: "12. Que représente un échec pour vous ?",
    options: [
      { text: "Une blessure dont il faut se remettre avec le temps.", score_type: 'TEL', points: 3 },
      { text: "Une occasion d'innover et de changer d'approche.", score_type: 'AER', points: 3 },
      { text: "Une faiblesse à cacher et à corriger secrètement.", score_type: 'TEN', points: 2 },
      { text: "Une leçon essentielle pour la croissance personnelle.", score_type: 'LUM', points: 2 },
    ],
  },
  
  // --- THÈME : VALEURS ÉTHIQUES & PHILOSOPHIE ---
  
  {
    question: "13. Quelle est la vraie nature du pouvoir ?",
    options: [
      { text: "La responsabilité que l'on exerce sur les autres.", score_type: 'LUM', points: 3 },
      { text: "L'influence que l'on exerce dans l'ombre.", score_type: 'TEN', points: 3 },
      { text: "La capacité à survivre et à s'adapter.", score_type: 'TEL', points: 2 },
      { text: "La liberté de s'affranchir de toutes contraintes.", score_type: 'AER', points: 2 },
    ],
  },
  {
    question: "14. Quelle est la qualité que vous méprisez le plus ?",
    options: [
      { text: "L'hypocrisie et le mensonge.", score_type: 'LUM', points: 3 },
      { text: "La paresse et l'abandon.", score_type: 'TEL', points: 3 },
      { text: "La rigidité et le manque d'ouverture.", score_type: 'AER', points: 2 },
      { text: "La naïveté et l'exposition inutile.", score_type: 'TEN', points: 2 },
    ],
  },
  {
    question: "15. Le monde est-il foncièrement bon ou mauvais ?",
    options: [
      { text: "Il est juste, il faut l'accepter tel qu'il est.", score_type: 'TEL', points: 3 },
      { text: "Il est neutre, c'est l'intention qui le définit.", score_type: 'TEN', points: 3 },
      { text: "Il est bon, mais doit être protégé.", score_type: 'LUM', points: 2 },
      { text: "Il est changeant et imprévisible.", score_type: 'AER', points: 2 },
    ],
  },
  {
    question: "16. Quel est votre plus grand désir secret ?",
    options: [
      { text: "Que mon nom soit gravé dans la légende pour toujours.", score_type: 'TEL', points: 3 },
      { text: "Devenir le maître d'un art méconnu.", score_type: 'TEN', points: 3 },
      { text: "Devenir une source d'inspiration pour tous.", score_type: 'LUM', points: 2 },
      { text: "Découvrir un continent jamais visité.", score_type: 'AER', points: 2 },
    ],
  },

  // --- THÈME : STYLE DE VIE & INSPIRATION ---

  {
    question: "17. Quel type de relique magique cherchez-vous ?",
    options: [
      { text: "Un bâton qui augmente ma résistance aux sorts.", score_type: 'TEL', points: 3 },
      { text: "Un miroir qui révèle la vérité cachée.", score_type: 'LUM', points: 3 },
      { text: "Des bottes qui permettent de marcher sur l'eau.", score_type: 'AER', points: 2 },
      { text: "Une amulette qui cache ma présence.", score_type: 'TEN', points: 2 },
    ],
  },
  {
    question: "18. Quelle odeur vous rappelle la magie ?",
    options: [
      { text: "L'encens et les herbes séchées.", score_type: 'LUM', points: 3 },
      { text: "La terre humide et les champignons.", score_type: 'TEL', points: 3 },
      { text: "Le soufre et le vent froid.", score_type: 'AER', points: 2 },
      { text: "La poussière de vieux parchemins.", score_type: 'TEN', points: 2 },
    ],
  },
  {
    question: "19. Préférez-vous travailler seul ou en équipe ?",
    options: [
      { text: "Seul, car ma méthode est unique.", score_type: 'TEN', points: 3 },
      { text: "Seul, car je ne veux pas être ralenti.", score_type: 'AER', points: 3 },
      { text: "En équipe, en tant que chef ou guide.", score_type: 'LUM', points: 2 },
      { text: "En équipe, pour partager la charge et le succès.", score_type: 'TEL', points: 2 },
    ],
  },
  {
    question: "20. Quelle est la réaction la plus courante des gens face à vous ?",
    options: [
      { text: "Ils me font confiance facilement.", score_type: 'LUM', points: 3 },
      { text: "Ils me trouvent parfois distant ou étrange.", score_type: 'TEN', points: 3 },
      { text: "Ils pensent que je suis fiable et solide.", score_type: 'TEL', points: 2 },
      { text: "Ils trouvent que j'ai une énergie contagieuse.", score_type: 'AER', points: 2 },
    ],
  },
];