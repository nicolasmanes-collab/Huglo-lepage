/**
 * Page dynamique EXPERTISES : code de page (Wix Studio, mode dev).
 * Version 2, 2 septembre 2026.
 *
 * Cette version ajoute la gestion conditionnelle des deux boutons d'action
 * demandee par le cabinet, et retire de nouveau setMetaTags.
 *
 * HISTORIQUE DE L'INCIDENT, A LIRE AVANT TOUTE MODIFICATION
 * --------------------------------------------------------
 * setMetaTags a casse les 12 fiches deux fois dans la meme journee.
 *
 * La documentation Wix est explicite :
 *   « The meta tags you set overwrite any meta tag information set earlier. »
 *   https://dev.wix.com/docs/sdk/frontend-modules/seo/set-meta-tags
 *
 * Un appel ne passant qu'une balise remplace donc TOUTES les balises meta de
 * la page par celle-la. Effet mesure sur les 12 fiches, en UA Chrome et
 * Googlebot : 0/12 pour la meta description, og:title, og:description,
 * og:url, og:site_name et twitter:card, et perte de la balise
 * google-site-verification servie au niveau du site.
 *
 * Survivent : le <title> (un title n'est pas une balise meta), le canonical
 * (c'est un <link>) et le graphe JSON-LD (setStructuredData, fonction
 * distincte, non concernee).
 *
 * NE JAMAIS REINTRODUIRE setMetaTags DANS CE FICHIER.
 * og:type = article est deja configure dans le tableau de bord :
 * SEO et GEO > Parametres de referencement > Parametres de DYNAMIC — EXPERTISES
 * > Balises Meta supplementaires. Toute balise meta a ajouter se met la, pas ici.
 *
 * BOUTONS D'ACTION
 * ----------------
 * « Telecharger notre offre » est replie sur les 12 fiches : le champ offre
 * est vide partout, ce bouton ne menait a rien.
 * « Formulaire de plainte » n'est deplie que si le champ plainte de la fiche
 * vaut « oui », ce qui ne concerne aujourd'hui que RSE/Audits reglementaires.
 * Le balayage par libelle sert de filet si un identifiant de composant change.
 */

import { setStructuredData } from 'wix-seo-frontend';
import wixLocation from 'wix-location-frontend';
import wixData from 'wix-data';

const ID_OFFRE = '#comp-m70ikdtu';
const ID_PLAINTE = '#comp-mb7rrhrm';

function sansAccent(v) {
  return (v || '').toString()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .trim().toLowerCase();
}

function replier(sel) {
  try { $w(sel).collapse(); } catch (e) { /* element absent */ }
}

function deplier(sel) {
  try { $w(sel).expand(); } catch (e) { /* element absent */ }
}

function parLibelle(afficherPlainte) {
  try {
    const liste = $w('Button');
    (Array.isArray(liste) ? liste : []).forEach((btn) => {
      const lib = sansAccent(btn.label);
      if (lib === 'telecharger notre offre') {
        btn.collapse();
      } else if (lib === 'formulaire de plainte') {
        if (afficherPlainte) { btn.expand(); } else { btn.collapse(); }
      }
    });
  } catch (e) { /* rien */ }
}

function appliquer(afficherPlainte) {
  replier(ID_OFFRE);
  if (afficherPlainte) { deplier(ID_PLAINTE); } else { replier(ID_PLAINTE); }
  parLibelle(afficherPlainte);
}

$w.onReady(async () => {
  appliquer(false);
  let afficherPlainte = false;

  try {
    const slug = '/' + [wixLocation.prefix, ...wixLocation.path].filter(Boolean).join('/');
    const res = await wixData.query('EXPERTISES')
      .eq('link-expertises-title', slug)
      .limit(1)
      .find();
    const item = res.items[0];

    if (item) {
      afficherPlainte = sansAccent(item.plainte) === 'oui';
      appliquer(afficherPlainte);

      if (item.jsonldGraph) {
        await setStructuredData([JSON.parse(item.jsonldGraph)]);
      }
    }
  } catch (err) {
    console.error('Code page expertises :', err);
  }

  try {
    $w('#dynamicDataset').onReady(() => appliquer(afficherPlainte));
  } catch (e) { /* pas de dataset sous ce nom */ }

  setTimeout(() => appliquer(afficherPlainte), 500);
  setTimeout(() => appliquer(afficherPlainte), 1500);
});
