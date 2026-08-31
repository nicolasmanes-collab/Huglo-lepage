# Meta descriptions des 12 fiches Expertises

État au 31 août 2026. Les textes sont présents en base, dans le champ
`mtaDescription` de la collection EXPERTISES. Aucun n'est servi dans le head.

## Pourquoi elles ne sortent pas

Le défaut est isolé sur le seul gabarit des fiches Expertises. Les trois autres
gabarits dynamiques du site servent un head complet, avec un gabarit SEO de
structure identique.

| Gabarit dynamique | meta description | og:title | og:description | og:url | twitter:card | vérification Google |
|---|---|---|---|---|---|---|
| Expertises (`snatn`) | 0 | 0 | 0 | 0 | 0 | 1 |
| Avocats (`ejtvw`) | 1 | 1 | 1 | 1 | 1 | 2 |
| Publications (`wlqrm`) | 1 | 1 | 1 | 1 | 1 | 2 |
| Clients (`dp82b`) | 1 | 1 | 1 | 1 | 1 | 2 |

Le gabarit SEO n'est donc pas en cause. L'écrasement se situe au niveau des
réglages SEO de la page dynamique Expertises elle-même, c'est-à-dire le
quatrième des cinq niveaux que Wix superpose pour composer un head. Ce niveau
supprime aussi la balise de vérification du site, ce qui explique qu'il n'en
reste qu'une sur ces pages contre deux ailleurs.

## Les quatre canaux de l'API, tous fermés

Vérifié un par un le 31 août.

| Canal | Résultat |
|---|---|
| Item SEO Tags sur la fiche | `UNSUPPORTED_ITEM_TYPE`, les pages de données ne sont pas gérées |
| Item SEO Tags sur la page dynamique | `ITEM_NOT_FOUND`, une page routeur n'est pas adressable |
| SEO Patterns | n'est pas la cause, et rejette `INVALID_PATTERN` sur les variables de champ de collection nécessaires |
| Custom Embeds | `pageFilter` ne prend que des identifiants de page, et les 12 fiches partagent le même identifiant `snatn` |

La documentation SEO de Wix expose trois API pour cinq niveaux. Le niveau 4,
celui de la page qui affiche l'élément, n'en a aucune.

Point important : le graphe JSON-LD par fiche est délivré par ce même niveau 4.
Réinitialiser ce niveau rétablirait les descriptions mais supprimerait le graphe.
Les deux sont portés par le même objet, ils doivent être traités ensemble dans
l'éditeur.

## La correction, dans l'éditeur

Panneau SEO de la page dynamique des fiches Expertises. Rétablir la variable
`{{wix-data-page-item.EXPERTISES.mtaDescription}}` dans le champ de description,
puis les balises sociales, sans toucher au balisage de données structurées qui
délivre le graphe.

## Les 12 textes, tels qu'ils sont en base

À utiliser si le panneau demande une ressaisie plutôt qu'une variable.

| Fiche | Car. | Meta description |
|---|---|---|
| Crédits carbone | 178 | Quotas SEQE-UE, CBAM, CRCF, Label bas-carbone, article 6 de l'Accord de Paris, crédits biodiversité. Conseil et contentieux. Cabinet classé « incontournable » par Décideurs 2026. |
| Droit de l'énergie et des énergies renouvelables | 197 | Cabinet pionnier en droit de l'énergie depuis 45 ans. Huglo Lepage Avocats conseille et défend entreprises et collectivités : énergies renouvelables, marchés du carbone, CEE, contentieux climatique |
| Droit de l'expropriation et du domaine public | 146 | Cabinet Huglo Lepage, avocat en expropriation et domanialité. Nous accompagnons collectivités et propriétaires : utilité publique et indemnisation |
| Droit de l'urbanisme et de l'aménagement | 156 | Avocat en droit de l'urbanisme et de l'aménagement à Paris. PLU, permis de construire, ZAN, recours des tiers. Conseil et contentieux. Huglo Lepage Avocats. |
| Droit de la Commande publique | 145 | Besoin d'un avocat en droit de la commande publique ? Huglo Lepage sécurise vos marchés publics en conseil et contentieux. Contactez nos experts. |
| Droit des collectivités territoriales | 158 | Avocat en droit des collectivités territoriales : sécurisez vos décisions, actes et marchés publics. Conseil et contentieux avec Huglo Lepage. Contactez-nous. |
| Droit pénal de l'environnement | 148 | Cabinet classé incontournable Décideurs 2026 en droit pénal de l'environnement. Écocide, ICPE, CJIPE, référé pénal : défense devant les PSPE et PRE. |
| Economie circulaire | 186 | Premier cabinet du Palmarès du Droit 2026 en environnement. AGEC, REP, PPWR, EmpCo, Circular Economy Act, allégations environnementales, marchés publics durables. Conseil et contentieux. |
| Environnement industriel et installations classées | 171 | ICPE, Seveso, sites et sols pollués, friches, déchets, REACH, PFAS. Conseil et contentieux. Premier cabinet français en droit de l'environnement au Palmarès du Droit 2026. |
| Protection de l'environnement et de la santé | 161 | Défense et protection de l'environnement : sécurisez vos projets et gérez vos contentieux ICPE et préjudice écologique avec Huglo Lepage. Contactez nos associés. |
| RSE/Audits réglementaires | 152 | Organisme Tiers Indépendant (OTI) certifié : audit réglementaire RSE, vérification CSRD et DPEF par le cabinet Huglo Lepage. Sécurisez votre durabilité. |
| RSE/Vigilance/Audits volontaires | 155 | Conseil et conformité RSE, devoir de vigilance et finance durable : CSRD, CS3D, Taxonomie et greenwashing avec Huglo Lepage Avocats. Contactez nos experts. |

## Deux textes à retoucher au passage

- **Droit de l'énergie**, 197 caractères, et sans point final. C'est le plus long
  des douze, il sera tronqué en résultat de recherche. À ramener vers 155.
- **Droit de l'expropriation**, également sans point final.

Les dix autres tiennent entre 145 et 186 caractères.

## Contrôle après correction

Sur chacune des 12 adresses, sans exécution de JavaScript :

```
curl -s "<url de la fiche>" | sed -n '1,/<\/head>/p' | grep -c 'name="description"'
```

Attendu : 1 sur les 12. Même contrôle sur `og:title`, `og:description`,
`og:url`, `og:site_name` et `twitter:card`.
