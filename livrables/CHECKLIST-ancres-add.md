# Libellés d'ancres « Add » : plan de correction

Relevé du 31 août 2026 sur 25 pages du site en ligne, accueil comprise.
318 occurrences, pour environ 18 corrections réelles.

## Nature du défaut

Les 318 sont un seul et même composant : un bouton Wix (`wixui-button`,
`StylableButton…`) dont le libellé est resté sur sa valeur par défaut « Add ».
L'attribut `aria-label="Add"` en découle automatiquement.

Corriger le libellé traite donc les deux griefs à la fois : le signal
sémantique du lien interne, et le critère 6.1 du RGAA sur les libellés non
explicites hors contexte.

## Groupe 1 : MENU PRINCIPAL, 8 boutons, 224 occurrences

Correction du 31 août : ces boutons ne sont pas dans le pied de page mais dans
le menu de navigation du site, celui qui s'ouvre par le bouton ☰ en haut à
droite. Le code l'établit sans ambiguïté :

```
data-block-level-container="MenuContainer"
role="dialog"  aria-label="Site navigation"
class="wixui-mobile-menu"
role="list"    wixui-repeater__item
```

C'est un répéteur de 8 entrées. Dans chaque entrée, le nom de la rubrique est
du texte non cliquable, et le lien est porté par la flèche voisine, dont le
libellé est resté sur « Add ».

Ce sont donc les liens du maillage interne principal, présents sur les 25 pages
du site, qui mènent aux pages piliers sans aucun signal sémantique. C'est le
point le plus rentable de la liste du client.

Présents sur 25 pages sur 25. Une correction par entrée les traite partout.
C'est 70 % du volume, à faire en premier.

| Destination | Occurrences | Libellé à mettre | Fait |
|---|---|---|---|
| `/cabinet` | 25 | Cabinet | ☐ |
| `/equipe` | 25 | Équipe | ☐ |
| `/expertise` | 25 | Expertises | ☐ |
| `/clients` | 25 | Clients | ☐ |
| `/collaborations` | 25 | Collaborations | ☐ |
| `/publication` | 25 | Publications | ☐ |
| `/blog` | 25 | Actualités | ☐ |
| `/contact` | 25 | Contact | ☐ |

## Groupe 2 : carrousels alimentés par une collection, 66 occurrences

À **connecter** au champ, pas à saisir en dur. Une saisie manuelle afficherait
le même libellé sur toutes les cartes.

| Carrousel | Occurrences | Champ à connecter | Fait |
|---|---|---|---|
| Avocats | 54 | nom de l'avocat, collection EQUIPE | ☐ |
| Expertises | 12 | champ `title`, collection EXPERTISES | ☐ |

## Groupe 3 : le reste, 28 occurrences

| Boutons | Occurrences | Libellé | Fait |
|---|---|---|---|
| Email, gabarit fiche avocat | 9 | « Écrire à » + nom connecté | ☐ |
| LinkedIn, gabarit fiche avocat | 9 | « Profil LinkedIn de » + nom connecté | ☐ |
| Cartes actualités, accueil | 6 | titre de l'article, connecté | ☐ |
| Carte clients : entreprises | 1 | Entreprises et industries | ☐ |
| Carte clients : collectivités | 1 | Collectivités territoriales | ☐ |
| Carte clients : associations | 1 | Associations et fondations | ☐ |
| Carte clients : particuliers | 1 | Particuliers | ☐ |

Les boutons email et LinkedIn étant portés par le gabarit des fiches avocats,
une correction chacun couvre les neuf fiches.

## Point de vigilance sur le rendu

Aucune règle CSS concluante n'a été trouvée sur la visibilité du libellé. Le
client ayant découvert le défaut dans le code source et non à l'œil, ces
boutons s'affichent vraisemblablement en flèche seule.

Au premier libellé modifié, contrôler le rendu visuel.

- Si le texte reste masqué, poursuivre. L'ancre compte pour les moteurs et le
  nom accessible est corrigé.
- Si le texte apparaît et double un titre déjà présent, ne pas poursuivre à
  l'identique. La solution propre est alors de rendre le titre lui-même
  cliquable et de retirer le bouton, mais c'est un arbitrage de maquette.

## Contrôle après correction

Recomptage sur les 25 pages, texte d'ancre et `aria-label` :

```
curl -s "<url>" | grep -o 'aria-label="Add"' | wc -l
```

Attendu : 0 sur les 25 pages. Ligne de base au 31 août : 318 au total.


---

# Avancement

## 31 août, après publication du menu : 318 → 118

Mesuré sur les 25 pages en UA Googlebot, méthode de référence (texte du lien
égal à « Add », scripts écartés).

Les 8 entrées du menu sont réglées, 200 occurrences supprimées. Le champ de
libellé modifie **le texte du lien et le nom accessible ensemble**, vérifié
dans le code servi :

```
/cabinet    texte='Cabinet'    aria-label='Cabinet'
/equipe     texte='Équipe'     aria-label='Équipe'
/expertise  texte='Expertises' aria-label='Expertises'
```

Le signal sémantique et le critère 6.1 du RGAA sont donc traités d'un même
geste. Rien à reprendre sur ce groupe.

## Reste : 118 occurrences pour environ 11 corrections

| Rang | Groupe | Occurrences | Corrections | Libellé | Fait |
|---|---|---|---|---|---|
| 1 | Carrousel avocats | 54 | 1 | connecter le nom accessible au champ du nom, collection EQUIPE | ☐ |
| 2 | Bouton `/equipe`, gabarit fiche avocat | 12 | 1 | Toute l'équipe | ☐ |
| 3 | Bouton `/expertise`, gabarit fiche expertise | 12 | 1 | Toutes nos expertises | ☐ |
| 4 | Cartes expertises, accueil | 12 | 1 | connecter au champ `title`, collection EXPERTISES | ☐ |
| 5 | Boutons email, gabarit fiche avocat | 9 | 1 | connecter au nom | ☐ |
| 6 | Boutons LinkedIn, gabarit fiche avocat | 9 | 1 | connecter au nom | ☐ |
| 7 | Cartes actualités, accueil | 6 | 1 | connecter au titre de l'article | ☐ |
| 8 | Cartes typologies clients, accueil | 4 | 4 | Entreprises et industries, Collectivités territoriales, Associations et fondations, Particuliers | ☐ |

## Le cas des répéteurs connectés au CMS

Sur ces boutons, le panneau n'affiche pas un champ texte mais « Nom
accessible », et « Éléments à afficher » vaut « Rien » : le bouton est une zone
cliquable transparente.

Le nom accessible est une propriété du **modèle d'élément**, partagée par tous
les items du répéteur. Une saisie manuelle applique donc le même libellé aux
douze cartes, ce qui a été constaté. Il faut connecter ce nom au champ de la
collection, par la barre « Connecté au CMS » du panneau.

À défaut, voie de repli : rendre le texte déjà affiché et déjà connecté (le nom
de l'avocat, l'intitulé de l'expertise) cliquable vers la fiche, et retirer le
bouton transparent. L'ancre devient alors un vrai texte de lien.
