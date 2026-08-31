/**
 * Page dynamique EXPERTISES : code de page (Wix Studio, mode dev).
 *
 * CORRECTION DU 31 AOUT 2026
 * --------------------------
 * La version precedente appelait :
 *     await setMetaTags([{ property: 'og:type', content: 'article' }]);
 *
 * Or la documentation Wix de setMetaTags est explicite :
 *     "The meta tags you set overwrite any meta tag information set earlier."
 *     https://dev.wix.com/docs/sdk/frontend-modules/seo/set-meta-tags
 *
 * Cet appel remplacait donc TOUTES les balises meta de la page par la seule
 * balise og:type. Consequence mesuree sur les 12 fiches, en UA Chrome et
 * Googlebot : plus de meta description, plus aucune balise og:title,
 * og:description, og:url, og:site_name, og:image, plus aucune balise twitter:,
 * et perte de la balise google-site-verification servie au niveau du site.
 *
 * Survivaient : le <title> (un title n'est pas une balise meta), le canonical
 * (c'est un <link>) et le graphe JSON-LD (setStructuredData, fonction distincte).
 *
 * L'appel etait de surcroit inutile : og:type = article est deja configure dans
 * le tableau de bord, SEO et GEO > Parametres de referencement >
 * Parametres de DYNAMIC — EXPERTISES > Balises Meta supplementaires.
 *
 * La correction consiste donc uniquement a retirer setMetaTags, de l'import et
 * du corps. Le graphe par fiche continue d'etre servi.
 *
 * NE PAS REINTRODUIRE setMetaTags ici. Si une balise meta doit etre ajoutee,
 * elle se met dans le panneau du tableau de bord cite ci-dessus. Si elle devait
 * malgre tout passer par le code, il faudrait lui repasser l'integralite des
 * balises de la page, ce qui est intenable a maintenir.
 */

import { setStructuredData } from 'wix-seo-frontend';
import wixLocation from 'wix-location-frontend';
import wixData from 'wix-data';

$w.onReady(async () => {
  try {
    const slug = '/' + [wixLocation.prefix, ...wixLocation.path].filter(Boolean).join('/');

    const res = await wixData.query('EXPERTISES')
      .eq('link-expertises-title', slug)
      .limit(1)
      .find();

    const item = res.items[0];
    if (!item || !item.jsonldGraph) return;

    await setStructuredData([JSON.parse(item.jsonldGraph)]);
  } catch (err) {
    console.error('JSON-LD non applique :', err);
  }
});
