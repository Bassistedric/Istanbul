# Carnet de voyage — Istanbul, 30 avril → 3 mai 2026

App web légère (148 Ko, fonctionne hors-ligne) pour consulter le programme du séjour à Istanbul depuis le téléphone.

## ✨ Ce qu'elle fait

- 📱 **Navigation par onglets** : accueil, jour 1/2/3, carte globale, infos pratiques
- ⏱️ **Compte à rebours** dynamique avant le départ, puis « jour X · Aujourd'hui à Istanbul » pendant le séjour
- 🗺️ **Cartes statiques** par jour, avec bouton « Ouvrir dans Google Maps » pour chaque site
- ✅ **Cases à cocher** sur les étapes (sauvegardées localement)
- 📞 **Numéros cliquables** (lance l'appel directement) et **liens carte** intégrés
- 📚 **Stories à lire à voix haute** avec encadrés « À chercher absolument », « Pour Madame »
- 🌙 **Mode sombre automatique** la nuit
- 🇫🇷 **Vocabulaire turc** avec phonétique
- 🏛️ **Mode hors-ligne** : tout est mis en cache à la première visite, fonctionne sans réseau (utile au fond de la Citerne ou si la eSIM Holafly faiblit)
- 📲 **Installable** sur l'écran d'accueil (PWA) → ouverture comme une vraie app

## 🚀 Déploiement sur GitHub Pages (10 minutes)

Une fois en ligne, l'app sera accessible à `https://VOTRE-USER.github.io/istanbul-mai-2026/` depuis n'importe où.

### Étape 1 — Créer un compte GitHub (si pas déjà fait)

Aller sur [github.com](https://github.com) et créer un compte gratuit.

### Étape 2 — Créer un nouveau repository

1. Cliquer sur le **+** en haut à droite → **New repository**
2. **Repository name** : `istanbul-mai-2026`
3. **Public** (obligatoire pour la version gratuite de GitHub Pages)
4. ⚠️ Ne PAS cocher « Add a README file » (vous l'avez déjà)
5. Cliquer **Create repository**

### Étape 3 — Uploader les fichiers

Sur la page du repo fraîchement créé :

1. Cliquer **uploading an existing file** (lien bleu au milieu)
2. Glisser-déposer **tout le contenu** du dossier `istanbul-mai-2026/` :
   - `index.html`
   - `manifest.webmanifest`
   - `sw.js`
   - `README.md`
   - le dossier `maps/` (3 fichiers SVG)
   - le dossier `icons/` (4 PNG)
3. En bas, **Commit changes**

### Étape 4 — Activer GitHub Pages

1. Dans le repo, aller dans **Settings** (en haut à droite)
2. Dans le menu de gauche, cliquer **Pages**
3. Sous « Source » : sélectionner **Deploy from a branch**
4. **Branch** : `main` / `(root)` → **Save**
5. Attendre 1-2 minutes. La page indique l'URL : `https://VOTRE-USER.github.io/istanbul-mai-2026/`

### Étape 5 — Installer l'app sur le téléphone

**Sur iPhone (Safari) :**
1. Ouvrir l'URL dans Safari
2. Bouton **Partager** (carré avec flèche en haut)
3. Faire défiler → **Sur l'écran d'accueil**
4. **Ajouter**

**Sur Android (Chrome) :**
1. Ouvrir l'URL dans Chrome
2. Menu **⋮** en haut à droite
3. **Ajouter à l'écran d'accueil** (ou **Installer l'application**)

À la première ouverture (avec connexion), l'app met **toutes les ressources en cache**. Ensuite, elle marche sans réseau.

## 🛠️ Faire des modifications

Pour mettre à jour l'app après le départ :
1. Modifier les fichiers en local
2. Sur GitHub, dans le repo : **Add file** → **Upload files** → glisser les nouveaux fichiers
3. **Commit changes**
4. L'app se met à jour en 1-2 minutes

⚠️ Si vous changez quelque chose et que ça ne s'affiche pas : pensez à incrémenter `CACHE_VERSION` dans `sw.js` (ex: `'istanbul-v1'` → `'istanbul-v2'`) pour forcer le rafraîchissement du cache.

## 📁 Structure des fichiers

```
istanbul-mai-2026/
├── index.html              # L'app entière (HTML + CSS + JS)
├── manifest.webmanifest    # Métadonnées PWA
├── sw.js                   # Service worker (cache hors-ligne)
├── README.md               # Ce fichier
├── maps/
│   ├── day1.svg            # Carte jeudi
│   ├── day2.svg            # Carte vendredi
│   └── day3.svg            # Carte samedi
└── icons/
    ├── icon-180.png        # iOS
    ├── icon-192.png        # Android
    ├── icon-512.png        # Android haute résolution
    └── icon-512-maskable.png  # Android adaptive
```

Aucune dépendance, aucun build, aucun framework. Du HTML/CSS/JS pur servi en statique.

## 🌍 Crédits

- Polices : Cormorant Garamond, Crimson Pro, Geist Mono (Google Fonts)
- Cartes : tracé schématique fait main basé sur la géographie d'Istanbul
- İyi yolculuklar — Bon voyage
