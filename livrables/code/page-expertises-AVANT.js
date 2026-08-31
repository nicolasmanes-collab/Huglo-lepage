/**
 * ARCHIVE : version en place jusqu'au 31 aout 2026, conservee pour memoire.
 * C'est l'appel setMetaTags de la ligne 17 qui ecrasait toutes les balises meta
 * des 12 fiches Expertises. Ne pas remettre en service.
 */

import { setStructuredData, setMetaTags } from 'wix-seo-frontend';
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
    await setMetaTags([{ property: 'og:type', content: 'article' }]);
  } catch (err) {
    console.error('JSON-LD non applique :', err);
  }
});
