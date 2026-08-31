# Ce qui reste à faire, et où le faire

Document interne. État constaté sur le site en ligne le 31 août 2026.

## Déjà corrigé et vérifié, rien à faire

| Point | Vérification |
|---|---|
| Graphe JSON-LD par fiche | servi sur les 12 fiches, de 1 326 à 6 999 caractères, en UA Chrome et Googlebot |
| Fidélité des 9 réponses FAQ | 9 sur 9 littérales, comparaison caractère par caractère |
| og:type | `article` sur les 12 piliers, `profile` sur les 12 fiches avocats |
| robots.txt | `Disallow: *?lightbox=` repris dans les 7 groupes nommés, plus CCBot, meta-externalagent, Bytespider, Amazonbot arbitrés |
| /blank-1 | retiré de pages-sitemap.xml (13 URL) et redirigé 301 vers la racine |
| /blank, /blank-2, /blank-3 | redirigés 301 |
| Second H1 du bloc newsletter | passé en H3 |
| Redirections | 93 au total, 0 chaîne, 0 cible encodée, 0 source en doublon |

## À faire dans l'éditeur Wix, panneau SEO du gabarit des fiches Expertises

Une seule intervention règle quatre points d'un coup. Voir la note technique
pour le détail du mécanisme.

1. Rétablir la `meta description`. Le champ de collection `mtaDescription` est
   rempli sur les 12 fiches, de 145 à 197 caractères. La variable à utiliser est
   `{{wix-data-page-item.EXPERTISES.mtaDescription}}`.
2. Rétablir `og:title`, `og:description`, `og:url`, `og:site_name`, `og:image`
   et les 4 balises `twitter:`.
3. Éteindre `wix-data-page-item.images-schema.disable` pour supprimer le nœud
   ImageObject isolé.
4. Éteindre `wix-data-page-item.videos-search-schema.disable` pour supprimer le
   bloc JSON-LD vide.

Ne pas passer par l'API : elle rejette les variables de champ de collection dont
le gabarit a besoin. La sauvegarde du gabarit actuel est dans
`sauvegarde-pattern-seo-expertises.json`.

## À faire dans l'éditeur visuel

### Libellés d'ancres « Add »

318 occurrences relevées sur 25 pages, avec `aria-label="Add"` en plus du texte.
Sur la page d'accueil, les 12 liens vers les expertises et les 12 liens vers les
avocats portent tous ce libellé.

- Liens vers une fiche avocat : porter le nom de l'avocat.
- Liens vers une expertise : porter l'intitulé de l'expertise.
- Corriger le texte du lien et l'`aria-label` ensemble, sinon le critère 6.1 du
  RGAA reste en défaut.

### Hiérarchie de titres de la page d'accueil

État actuel : 5 H1, 0 H2, 20 H4, 20 H5.

- Les quatre « EN SAVOIR PLUS » des cartes de typologies de clients sont en H1.
  Ce ne sont pas des titres, les passer en texte ou en balise de lien.
- Les titres de sections (« Nos expertises », « Nos clients », « Actualités »,
  « Ils parlent de nous », « Conjuguer expérience et innovation ») sont en H5,
  les passer en H2.
- Les blocs qu'ils coiffent sont en H4, les passer en H3.

### Pied de page, présent sur toutes les pages

- « Huglo Lepage Avocats » est en H3, le repasser en H2.
- Les 7 rubriques sont en H5, les passer en H3.
- La colonne PUBLICATIONS est la seule des 8 sans balise de titre. Son libellé
  est un paragraphe de classe `font_5`. Lui donner le même niveau que les autres.
- Le lien « Site map » est en anglais et pointe vers le fichier XML. Le
  renommer « Plan du site » et le faire pointer vers la page HTML.

### Page « Plan du site »

`/plan-du-site` répond 404. `/sitemap` et `/plan-site` aussi. La page est à
recréer, puis à relier depuis le pied de page.

### Fiche RSE / Vigilance

`/expertises/rse-vigilance` porte 2 H1 : « RSE/Vigilance/Audits volontaires » et
« RSE, devoir de vigilance & finance durable : ». Le second doit passer en H2.

## En attente d'un arbitrage

- **Balises de vérification Google.** Deux valeurs coexistent, l'une dans le
  panneau SEO du site, l'autre dans le bloc de code personnalisé. Ouvrir la
  Search Console pour voir quelle propriété est active avant de retirer l'une
  des deux.
- **www2 et dev.** Hébergés hors Wix, sur 147.135.162.17. Hors de notre périmètre
  d'accès.

## Contenus en attente côté cabinet

- `/expertises/protection-de-l-environnement` : 0 H2, page sans corps de texte.
  Roxane a envoyé le contenu le 28 août par mail, en pièce jointe .docx, avec une
  demande d'intégration urgente. Le mail n'était pas encore ouvert.
- `/expertises/rse-audits-reglementaires` : 0 H2, page sans corps de texte.
