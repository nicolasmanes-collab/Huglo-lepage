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

## Groupe 1 : pied de page, 8 boutons, 224 occurrences

Présents sur 25 pages sur 25. Une correction par bouton les traite partout.
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
