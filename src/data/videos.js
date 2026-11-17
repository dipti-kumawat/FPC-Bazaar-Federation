/**
 * VIDEOS: every extra video on the site lives here.
 *
 * HOW TO ADD ONE
 * 1. Put the .mp4 and a poster .jpg in /public/videos/ (keep each mp4 under ~12 MB).
 * 2. Add an entry below. `where` decides which page shows it: 'home', 'gaushala', 'projects'.
 * 3. `wide: true` for landscape (16:9) videos; leave it out for vertical (9:16) ones.
 */
export const VIDEOS = [
  {
    id: 'self-reliant-gaushala', where: ['home'],
    src: '/videos/self-reliant-gaushala.mp4', poster: '/videos/self-reliant-gaushala.jpg',
    title: { en: 'Building a Self-Reliant Gaushala', hi: 'आत्मनिर्भर गौशाला का निर्माण' },
    desc: { en: 'From cow care to culture, from Gaushala to prosperity: the Federation’s Gaushala-to-fertilizer journey.', hi: 'गौ सेवा से संस्कृति तक, गौशाला से समृद्धि तक: गौशाला से जैविक खाद तक की महासंघ की यात्रा।' },
  },
  {
    id: 'organic-farming-amul', where: ['home'],
    src: '/videos/organic-farming-amul.mp4', poster: '/videos/organic-farming-amul.jpg',
    title: { en: 'Organic Farming & Village Livelihoods', hi: 'जैविक खेती और ग्रामीण आजीविका' },
    desc: { en: 'Farmers, women and cooperatives coming together for chemical-free, organic farming.', hi: 'रसायन-मुक्त जैविक खेती के लिए साथ आते किसान, महिलाएँ और सहकारी संस्थाएँ।' },
  },
  {
    id: 'gaushala-breeding-centre', where: ['gaushala'],
    src: '/videos/gaushala-breeding-centre.mp4', poster: '/videos/gaushala-breeding-centre.jpg',
    title: { en: 'Bovine Breeding Centre Visit', hi: 'बोवाइन ब्रीडिंग सेंटर भ्रमण' },
    desc: { en: 'A Federation member at the Amul Dairy bovine breeding centre, Mogar, learning from a modern cattle-care model.', hi: 'अमूल डेयरी के मोगर स्थित बोवाइन ब्रीडिंग सेंटर में महासंघ के सदस्य, आधुनिक पशुपालन मॉडल को समझते हुए।' },
  },
  {
    id: 'abc-agro-business-center', where: ['projects'], wide: true,
    src: '/videos/abc-agro-business-center.mp4', poster: '/videos/abc-agro-business-center.jpg',
    title: { en: 'ABC Agro Business Centre', hi: 'एबीसी एग्रो बिज़नेस सेंटर' },
    desc: { en: 'The ABC Agro Business Centre with Amul Organic and Maha FPC: inputs, organic products and services for farmers under one roof.', hi: 'अमूल ऑर्गेनिक और महा एफपीसी के साथ एबीसी एग्रो बिज़नेस सेंटर: किसानों के लिए एक ही स्थान पर इनपुट, जैविक उत्पाद और सेवाएँ।' },
  },
];

export const videosFor = (where) => VIDEOS.filter((v) => v.where.includes(where));