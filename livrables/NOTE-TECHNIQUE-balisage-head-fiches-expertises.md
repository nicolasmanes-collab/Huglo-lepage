# Note technique : l'émission du balisage dans le head des 12 fiches Expertises

Constat établi le 31 août 2026 sur le site en ligne, en user-agent Chrome et en
user-agent Googlebot, sans exécution de JavaScript.

## 1. Ce qui est désormais servi, et qui répond à la demande principale

Le graphe propre à chaque fiche est émis. Il ne s'agit plus d'un objet vide.

| Fiche | Taille du graphe servi |
|---|---|
| Droit de l'urbanisme et de l'aménagement | 6 999 caractères |
| Droit de la commande publique | 3 743 caractères |
| Droit de l'énergie | 1 601 caractères |
| Crédits carbone | 1 587 caractères |
| Protection de l'environnement | 1 546 caractères |
| Domanialité et expropriation | 1 528 caractères |
| Droit des collectivités territoriales | 1 497 caractères |
| RSE et audits réglementaires | 1 477 caractères |
| Environnement industriel | 1 473 caractères |
| Droit pénal de l'environnement | 1 438 caractères |
| RSE et vigilance | 1 363 caractères |
| Économie circulaire | 1 326 caractères |

Sur la fiche Urbanisme, le graphe porte un nœud `WebPage` doublé d'un `FAQPage`,
une `BreadcrumbList` à trois niveaux (Accueil, Expertises, la fiche), le
rattachement `mentions` aux quatre avocats de la matière, et les neuf questions
de la FAQ.

## 2. Fidélité des réponses de la FAQ

Les neuf réponses ont été comparées caractère par caractère au texte de la page.
Les neuf sont désormais des extraits littéraux, ponctuation et références de code
comprises. Les deux cas cités sont corrigés.

- CDPENAF : le balisage porte bien « lie l'autorité instructrice et conduit en
  pratique au refus de l'autorisation. Il n'est pas pour autant insusceptible de
  critique. »
- Sursis à statuer ZAN : la base légale est rétablie, avec l'article 194 IV 14°
  de la loi Climat et résilience du 22 août 2021 dans sa rédaction issue de la
  loi n° 2023-630 du 20 juillet 2023.

## 3. L'obstacle technique précis qui reste, exposé par écrit

Un effet de bord subsiste sur ces douze fiches, et sur elles seules. Elles ont
perdu leur `meta description`, leurs balises `og:title`, `og:description`,
`og:url`, `og:site_name`, `og:image` et l'ensemble de leurs balises `twitter:`.
La page d'accueil et les douze fiches avocats les conservent toutes.

L'origine est identifiée. Wix compose le head d'une page en superposant cinq
niveaux, du plus général au plus spécifique : les balises du site, le gabarit par
défaut Wix, le gabarit personnalisé, les balises de la page qui affiche la fiche,
puis celles de la fiche. Le canal qui délivre aujourd'hui le graphe par fiche est
le quatrième niveau, celui de la page dynamique. En s'y installant, il a pris le
pas sur les balises sociales et sur la description des niveaux inférieurs.

La correction relève de ce même quatrième niveau, c'est-à-dire du panneau SEO de
la page dynamique dans l'éditeur. Deux vérifications ont établi qu'elle ne peut
pas passer par l'API publique de Wix :

1. L'API des balises par élément ne connaît pas les pages dynamiques. Elle
   répond `UNSUPPORTED_ITEM_TYPE` et énumère les seuls types qu'elle accepte,
   parmi lesquels ne figure pas la page de données.
2. L'API des gabarits refuse d'enregistrer les variables de champ de collection
   dont ces fiches ont besoin. Le gabarit en place utilise
   `{{wix-data-page-item.EXPERTISES.mtaDescription}}` et
   `{{wix-data-page-item.EXPERTISES.title}}`, écrites depuis le tableau de bord.
   Soumises à l'API, ces deux variables sont rejetées avec le code
   `INVALID_PATTERN` et la mention « references unknown variable(s) ». Toute
   écriture par l'API supposerait donc de les retirer, ce qui ferait perdre la
   description propre à chaque fiche.

Le correctif est par conséquent une intervention dans l'éditeur, sur le panneau
SEO du gabarit des fiches Expertises. Elle ne demande pas de développement.

## 4. Le nœud ImageObject isolé et le bloc vide

Ces deux blocs ne proviennent pas du balisage rédigé pour vos fiches. Ce sont
deux modèles automatiques du gabarit Wix, `wix-data-page-item-images-preset` et
`wix-data-page-item-videos-preset`. Le premier décrit la première image de la
page, ce qui explique le portrait de Maître Denis sur la fiche Urbanisme, celui-ci
ouvrant le carrousel des avocats de la matière. Le second, faute de vidéo,
n'émet qu'un objet vide.

Wix expose deux interrupteurs pour les éteindre,
`wix-data-page-item.images-schema.disable` et
`wix-data-page-item.videos-search-schema.disable`. Ils s'actionnent dans le même
panneau que le point 3, et par la même intervention.

## 5. Les deux balises de vérification Google

Les deux valeurs ne viennent pas du même endroit, ce qui explique qu'elles
coexistent.

| Valeur | Emplacement |
|---|---|
| `o3_kXYah…` | panneau SEO du site |
| `rh34Kr1r…` | bloc de code personnalisé nommé « Personnalisé », position HEAD, catégorie ESSENTIAL |

Aucune des deux n'est obsolète du point de vue du site : ce sont deux preuves de
propriété, et Google en accepte plusieurs. Déterminer laquelle retirer suppose
d'ouvrir la Search Console et de voir quelle propriété est effectivement
utilisée, faute de quoi la suppression ferait perdre la validation d'une
propriété active. Nous ne toucherons donc à aucune des deux avant cet arbitrage.

## 6. Les sous-domaines www2 et dev

Les deux noms résolvent vers l'adresse 147.135.162.17, qui n'est pas une adresse
Wix. Le site, lui, résout vers l'infrastructure Wix. Ces deux hôtes sont donc
servis par un hébergement distinct de celui du site, auquel nous n'avons pas
d'accès. `www2` répond 401 et `dev` présente un certificat qui ne couvre pas ce
nom. Leur traitement relève du prestataire qui détient cet hébergement, ou d'une
suppression de l'enregistrement DNS correspondant.
