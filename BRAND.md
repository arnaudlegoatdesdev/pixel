# Pix'el — Guide de marque & contexte produit

Document de référence pour tout projet Pix'el (site, app mobile, supports print, contenus). À copier dans le repo de l'app iOS et tenir à jour.

---

## 1. Produit

**Pix'el** est une **surface thermique intelligente et modulaire** qui maintient au chaud ou au froid, zone par zone, en consommant uniquement aux endroits utiles.

- Chaque **pixel** est un module à semi-conducteurs indépendant, piloté par microprocesseur.
- La surface **détecte la présence d'un objet** (peu importe sa matière) et active automatiquement la zone concernée.
- Plusieurs pixels peuvent être combinés pour former une surface plus grande, tout en restant indépendants.
- Plusieurs modes de fonctionnement, commandables via **application mobile en Wi-Fi**.

### Composants techniques

1. Plaque de diffusion en matériau conducteur thermique
2. Module à semi-conducteurs (effet Peltier) fixé sous la plaque
3. Détecteur de présence intégré au module thermostat
4. Connectivité Wi-Fi pour pilotage à distance

### Tagline

> **La surface efficace.**

### Promesse

Une surface réactive, chauffante ou rafraîchissante à volonté, qui ne dépense de l'énergie que là où c'est utile.

---

## 2. Positionnement & usages cibles

### Marchés professionnels (priorité)
- Restauration, hôtellerie, traiteurs
- Buffets, comptoirs, événements
- Cuisines professionnelles
- Espaces de présentation / vitrines
- GSK et autres acteurs avec besoins thermiques spécifiques

### Grand public (secondaire)
- Comptoir intelligent à la maison
- Plan de travail réactif

### Argument central
Là où les solutions actuelles chauffent ou refroidissent toute une surface, Pix'el n'active que les zones utiles. **Éco-contrôle, modularité, précision.**

---

## 3. Crédibilité

- **Prix Léonard de Vinci** — Concours Lépine International Paris 2024
- **Médaille d'or** — Concours Lépine International Paris 2024
- Inventeur : David Flion
- Société porteuse de l'IP : Thermosystem (transfert vers Pix'el SRL en cours)

À mentionner dans les écrans de présentation (onboarding app, à propos, splash).

---

## 4. Ton & voix

- **Sobre, technique, précis.** Pas marketing-criard.
- **Phrases courtes**, vocabulaire concret (chaud, froid, zone, pixel, module).
- Le mot **"pixel"** désigne un module ; le mot **"surface"** désigne l'ensemble.
- Toujours écrit avec l'apostrophe : **Pix'el** (jamais "Pixel" seul, ni "Pix-El", ni "PIXEL" sauf en majuscules contextuelles).
- En français de Belgique/France ; éviter les anglicismes inutiles ("smart" → "intelligent", "tracker" → "suivi").

---

## 5. Logo

### Fichiers
- `assets/pixel-logo.png` — logo principal (lockup texte)
- `assets/pixel-logo-anim.mp4` — version animée pour vidéos / hero
- `favicon.svg` — icône courte

### Règles
- Laisser une zone de respiration autour du logo équivalente à la hauteur du "P".
- Ne jamais étirer ni recolorier le logo. Si fond clair → logo encre ; si fond sombre → logo blanc/cyan-soft.
- Pour l'app iOS : adapter une icône carrée (App Icon) qui reprend le **glyphe "Px"** ou un motif de pixels rouge + bleu.

---

## 6. Palette de couleurs

### Tokens (web — `styles.css`)

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--ink` | `#02070a` | 2, 7, 10 | Fond principal sombre, texte sur clair |
| `--ink-2` | `#061018` | 6, 16, 24 | Fond secondaire, panneaux |
| `--cyan` | `#7db6de` | 125, 182, 222 | Accent principal, lignes |
| `--cyan-bright` | `#37c4ee` | 55, 196, 238 | Glow, états actifs |
| `--cyan-soft` | `#b7e3e8` | 183, 227, 232 | Bordures, accents discrets |
| `--steel` | `#98afc4` | 152, 175, 196 | Texte secondaire sur sombre |
| `--paper` | `#f5f7f8` | 245, 247, 248 | Fond clair |
| `--muted` | `#9fb1bd` | 159, 177, 189 | Texte muted |
| `--gold` | `#d9b75d` | 217, 183, 93 | **Réservé aux récompenses** (Lépine, prix) |
| `--white` | `#ffffff` | 255, 255, 255 | Texte fort sur sombre |

### Couleurs fonctionnelles (thermique)

| Sens | Hex | Usage |
|---|---|---|
| **Chaud** | `#ff281e` | Zone active chaude — rouge incandescent |
| **Chaud — halo** | `rgba(255, 60, 30, 0.85)` | Glow autour d'une cellule chaude |
| **Froid** | `#0084ff` | Zone active froide — bleu électrique |
| **Froid — halo** | `rgba(0, 132, 255, 0.85)` | Glow autour d'une cellule froide |
| **Inactif** | `rgba(255, 255, 255, 0.04)` | Pixel éteint, fond très neutre |
| **Bordure pixel** | `rgba(183, 227, 232, 0.28)` | Contour des cellules |

### Équivalents Swift (SwiftUI)

```swift
extension Color {
    // Base
    static let pxInk = Color(red: 2/255, green: 7/255, blue: 10/255)
    static let pxInk2 = Color(red: 6/255, green: 16/255, blue: 24/255)
    static let pxCyan = Color(red: 125/255, green: 182/255, blue: 222/255)
    static let pxCyanBright = Color(red: 55/255, green: 196/255, blue: 238/255)
    static let pxCyanSoft = Color(red: 183/255, green: 227/255, blue: 232/255)
    static let pxSteel = Color(red: 152/255, green: 175/255, blue: 196/255)
    static let pxMuted = Color(red: 159/255, green: 177/255, blue: 189/255)
    static let pxGold = Color(red: 217/255, green: 183/255, blue: 93/255)

    // Fonctionnel
    static let pxHot = Color(red: 255/255, green: 40/255, blue: 30/255)
    static let pxCold = Color(red: 0/255, green: 132/255, blue: 255/255)
}
```

---

## 7. Typographie

### Web
- **Inter** (sans-serif) pour tout corps de texte et titres
- Fallback : `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

### iOS
- Utiliser **SF Pro** (système) — équivalent natif d'Inter en termes de neutralité et lisibilité
- Tailles guides :
  - Title large : 28-34pt, weight `.bold`
  - Title : 20-22pt, weight `.semibold`
  - Body : 16-17pt, weight `.regular`
  - Caption : 12-13pt, weight `.medium`
  - "Eyebrow" (sous-titres en majuscules) : 11pt, tracking +0.08em, `.semibold`

### Hiérarchie visuelle
- Toujours un **"eyebrow"** court en majuscules avant le titre principal (ex : "EN BREF", "APPLICATIONS")
- Les titres sont en phrase normale (pas all caps).

---

## 8. Langage visuel

### Principes
- **Sombre par défaut.** L'interface vit sur fond ink. Les modes clair sont l'exception.
- **Pixels lumineux.** L'élément visuel central est la cellule carrée qui s'allume rouge (chaud) ou bleu (froid) avec un halo doux.
- **Géométrie.** Lignes fines, angles à 90° ou 45° (cf. grille rotated du concept).
- **Pas d'illustrations photoréalistes.** Tout est schématique, pixel-grid, halos.
- **Animations douces.** Transitions 300-1100ms en ease-in-out. Jamais de flash brusque.

### États d'un pixel (à reproduire dans l'app)
- **Inactif** : carré sombre, bordure cyan-soft à faible opacité
- **Chaud** : fond rouge incandescent + halo (`box-shadow` 0 0 24-38px rgba(255,60,30,0.7))
- **Froid** : fond bleu électrique + halo (`box-shadow` 0 0 24-38px rgba(0,132,255,0.7))
- **Sélectionné / hover** : bordure cyan-soft renforcée + léger scale (sur desktop)

### Coins
- Pixels / cellules : **rayon 4-6pt** (suit la taille)
- Boutons : **rayon 8pt** standard, **9999pt** (pill) pour CTA secondaires
- Cards / panneaux : **rayon 12pt**

---

## 9. Iconographie

### Fichiers existants
- `assets/icon-thermometer.png` — plaque thermo-conductrice
- `assets/icon-module.png` — module semi-conducteur
- `assets/icon-presence.png` — détection de présence
- `assets/icon-wifi.png` — connectivité Wi-Fi

### Pour l'app iOS
- Privilégier **SF Symbols** pour la navigation et les actions courantes
- Pour les concepts spécifiques Pix'el (chaud, froid, pixel, surface), créer des icônes vectorielles cohérentes avec le style des PNG existants : lignes fines, monochromes, fond transparent.

---

## 10. Contexte app mobile

### Objectif
Application iOS de **pilotage à distance** d'une surface Pix'el (ou de plusieurs), via Wi-Fi.

### Fonctionnalités cibles (à prioriser)
1. **Découverte & appairage** d'une surface Pix'el sur le réseau local
2. **Vue de la surface** en temps réel — état de chaque pixel (off / chaud / froid / objet détecté)
3. **Pilotage manuel** : sélectionner des zones et leur assigner chaud / froid / éteint, comme dans la section Simulation du site
4. **Modes préréglés** : "Buffet chaud", "Buffet mixte", "Vitrine froide", "Auto-détection" (active uniquement si objet posé)
5. **Programmation horaire** : pré-chauffer / pré-refroidir avant un service
6. **Suivi consommation** : énergie économisée par rapport à une plaque pleine
7. **Multi-surfaces** : si plusieurs unités installées, les regrouper et piloter ensemble

### Public utilisateur
- **Pro restauration** en premier (chef, manager, équipe service) — interface rapide, claire, peu de friction
- **Particulier** plus tard — plus de personnalisation, scénarios, intégrations domotiques (HomeKit ?)

### Principes UX
- **Tactile first.** Sélection par glisser-peindre (cf. simulation web).
- **Feedback immédiat.** Quand l'utilisateur active une zone, la pixel s'allume instantanément.
- **Pas de réglages cachés.** Toutes les actions principales accessibles en 1-2 taps.
- **Mode sombre par défaut.** Cohérent avec la DA.

---

## 11. Légendes & vocabulaire

| Terme | Signification | À éviter |
|---|---|---|
| **Pixel** (ou Pix'el) | Un module indépendant | "cellule", "case" |
| **Surface** | L'ensemble des pixels reliés | "plaque", "appareil" |
| **Zone** | Plusieurs pixels groupés par l'utilisateur | "section" |
| **Mode** | Préréglage d'usage (Chaud, Froid, Auto) | "preset" |
| **Présence** | Détection d'objet posé | "détection automatique" |
| **Surface efficace** | Slogan, pas un terme produit | — |

---

## 12. Liens & ressources

- Site officiel : <https://pixeloff.net/>
- Contact : marketing@pixeloff.net
- Repo site : ce repo
- Palmarès Lépine 2024 : <https://www.concours-lepine.com/palmares-edition-2024>

---

*Document maintenu par David Flion et son équipe. Toute modification de marque (logo, palette, ton) doit être validée avant mise à jour de ce fichier.*
