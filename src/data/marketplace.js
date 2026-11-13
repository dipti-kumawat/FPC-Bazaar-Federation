// Marketplace and supplier directory data.
// IMPORTANT: every entry below is a SAMPLE listing used to design and review the pages.
// They are shown only while VITE_DRAFT_MODE is not "false". At launch, replace them with real,
// verified listings (set verified: true, sample: false). Unverified entries are hidden when draft mode is off.
// All text is bilingual: { en, hi }. Prices are never shown: the model is enquiry based ("price on request").
import { draftMode } from '../config/site.js';

export const STATES = {
  rajasthan: { en: 'Rajasthan', hi: 'राजस्थान' },
  gujarat: { en: 'Gujarat', hi: 'गुजरात' },
  mp: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' },
  maharashtra: { en: 'Maharashtra', hi: 'महाराष्ट्र' },
};

export const CATEGORIES = [
  { id: 'grains', icon: 'grains', name: { en: 'Grains & Pulses', hi: 'अनाज और दालें' } },
  { id: 'produce', icon: 'produce', name: { en: 'Fruits & Vegetables', hi: 'फल और सब्ज़ियाँ' } },
  { id: 'spices', icon: 'spices', name: { en: 'Spices & Oilseeds', hi: 'मसाले और तिलहन' } },
  { id: 'dairy', icon: 'dairy', name: { en: 'Dairy & Gaushala Products', hi: 'डेयरी और गौशाला उत्पाद' } },
  { id: 'inputs', icon: 'inputs', name: { en: 'Organic Inputs & Fertilisers', hi: 'जैविक इनपुट और खाद' } },
  { id: 'processed', icon: 'processed', name: { en: 'Processed & Packaged Foods', hi: 'प्रसंस्कृत और पैकेज्ड खाद्य' } },
  { id: 'equipment', icon: 'equipment', name: { en: 'Equipment & Packaging', hi: 'उपकरण और पैकेजिंग' } },
  { id: 'feed', icon: 'feed', name: { en: 'Animal Feed & Supplements', hi: 'पशु आहार और सप्लीमेंट' } },
];

export const SUPPLIER_TYPES = ['farmer', 'fpo', 'manufacturer', 'supplier'];

const base = { sample: true, verified: false };

export const SUPPLIERS = [
  { id: 'hadoti-kisan-producer-company', type: 'fpo', state: 'rajasthan', cats: ['grains', 'spices'], name: { en: 'Hadoti Kisan Producer Company', hi: 'हाड़ौती किसान प्रोड्यूसर कंपनी' }, district: { en: 'Baran', hi: 'बारां' },
    about: { en: 'A farmer producer company aggregating wheat, chana and coriander from member farmers for bulk buyers and processors.', hi: 'सदस्य किसानों से गेहूँ, चना और धनिया एकत्र कर थोक खरीदारों और प्रोसेसरों को आपूर्ति करने वाली किसान उत्पादक कंपनी।' }, ...base },
  { id: 'malwa-grain-growers-fpo', type: 'fpo', state: 'mp', cats: ['grains', 'produce'], name: { en: 'Malwa Grain Growers FPO', hi: 'मालवा ग्रेन ग्रोअर्स एफपीओ' }, district: { en: 'Ujjain', hi: 'उज्जैन' },
    about: { en: 'Member-owned FPO supplying graded wheat and soybean with warehousing support for institutional orders.', hi: 'संस्थागत ऑर्डर के लिए गोदाम सहयोग के साथ ग्रेडेड गेहूँ और सोयाबीन उपलब्ध कराने वाला सदस्य-स्वामित्व का एफपीओ।' }, ...base },
  { id: 'marwar-millet-farmers-group', type: 'farmer', state: 'rajasthan', cats: ['grains'], name: { en: 'Marwar Millet Farmers Group', hi: 'मारवाड़ बाजरा किसान समूह' }, district: { en: 'Jodhpur', hi: 'जोधपुर' },
    about: { en: 'A group of dryland farmers growing bajra and moth under natural farming practices.', hi: 'प्राकृतिक खेती की पद्धतियों से बाजरा और मोठ उगाने वाले असिंचित क्षेत्र के किसानों का समूह।' }, ...base },
  { id: 'saurashtra-spice-growers', type: 'farmer', state: 'gujarat', cats: ['spices'], name: { en: 'Saurashtra Spice Growers', hi: 'सौराष्ट्र मसाला उत्पादक' }, district: { en: 'Rajkot', hi: 'राजकोट' },
    about: { en: 'Cumin and fennel growers selling cleaned and sorted seed directly to traders and masala makers.', hi: 'सफ़ाई और छँटाई के बाद जीरा और सौंफ सीधे व्यापारियों और मसाला निर्माताओं को बेचने वाले उत्पादक।' }, ...base },
  { id: 'nashik-onion-growers-fpo', type: 'fpo', state: 'maharashtra', cats: ['produce'], name: { en: 'Nashik Onion Growers FPO', hi: 'नासिक प्याज उत्पादक एफपीओ' }, district: { en: 'Nashik', hi: 'नासिक' },
    about: { en: 'Onion and tomato aggregation with sorting, grading and crate packing at a collection centre.', hi: 'संग्रह केंद्र पर छँटाई, ग्रेडिंग और क्रेट पैकिंग के साथ प्याज और टमाटर का एकत्रीकरण।' }, ...base },
  { id: 'gaushala-panchgavya-collective', type: 'manufacturer', state: 'gujarat', cats: ['dairy', 'inputs'], name: { en: 'Gaushala Panchgavya Collective', hi: 'गौशाला पंचगव्य समूह' }, district: { en: 'Ahmedabad', hi: 'अहमदाबाद' },
    about: { en: 'Makers of desi cow ghee and Panchgavya-based products from partner gaushalas.', hi: 'साझेदार गौशालाओं से देसी गाय का घी और पंचगव्य आधारित उत्पाद बनाने वाले निर्माता।' }, ...base },
  { id: 'aravali-organics', type: 'manufacturer', state: 'rajasthan', cats: ['inputs'], name: { en: 'Aravali Organics', hi: 'अरावली ऑर्गेनिक्स' }, district: { en: 'Udaipur', hi: 'उदयपुर' },
    about: { en: 'Manufacturer of vermicompost, bio-fertiliser and soil conditioners for farmers and FPOs.', hi: 'किसानों और एफपीओ के लिए वर्मीकम्पोस्ट, जैव-उर्वरक और मिट्टी सुधारक बनाने वाला निर्माता।' }, ...base },
  { id: 'deccan-agro-feeds', type: 'manufacturer', state: 'maharashtra', cats: ['feed'], name: { en: 'Deccan Agro Feeds', hi: 'डेक्कन एग्रो फीड्स' }, district: { en: 'Pune', hi: 'पुणे' },
    about: { en: 'Cattle feed and mineral mixture manufacturer supplying dairy cooperatives and gaushalas.', hi: 'डेयरी सहकारी समितियों और गौशालाओं को आपूर्ति करने वाला पशु आहार और खनिज मिश्रण निर्माता।' }, ...base },
  { id: 'narmada-agri-packaging', type: 'supplier', state: 'gujarat', cats: ['equipment'], name: { en: 'Narmada Agri Packaging', hi: 'नर्मदा एग्री पैकेजिंग' }, district: { en: 'Vadodara', hi: 'वडोदरा' },
    about: { en: 'Supplier of woven sacks, crates and cartons for grain, produce and processed food.', hi: 'अनाज, उपज और प्रसंस्कृत खाद्य के लिए बोरे, क्रेट और कार्टन के आपूर्तिकर्ता।' }, ...base },
  { id: 'sahyadri-irrigation-supplies', type: 'supplier', state: 'maharashtra', cats: ['equipment'], name: { en: 'Sahyadri Irrigation Supplies', hi: 'सह्याद्रि सिंचाई सप्लाई' }, district: { en: 'Kolhapur', hi: 'कोल्हापुर' },
    about: { en: 'Drip irrigation kits, sprayers and fittings for farmers and FPO-run custom hiring centres.', hi: 'किसानों और एफपीओ के कस्टम हायरिंग केंद्रों के लिए ड्रिप सिंचाई किट, स्प्रेयर और फिटिंग।' }, ...base },
  { id: 'mewar-cold-press-oils', type: 'manufacturer', state: 'rajasthan', cats: ['spices', 'processed'], name: { en: 'Mewar Cold Press Oils', hi: 'मेवाड़ कोल्ड प्रेस ऑयल्स' }, district: { en: 'Chittorgarh', hi: 'चित्तौड़गढ़' },
    about: { en: 'Cold-pressed mustard oil and jaggery made from sourced farmer produce, packed for retail and bulk.', hi: 'किसानों से ली गई उपज से बना कोल्ड-प्रेस सरसों तेल और गुड़, खुदरा और थोक पैकिंग में।' }, ...base },
  { id: 'khandesh-farm-inputs', type: 'supplier', state: 'mp', cats: ['inputs', 'equipment'], name: { en: 'Khandesh Farm Inputs', hi: 'खानदेश फार्म इनपुट्स' }, district: { en: 'Indore', hi: 'इंदौर' },
    about: { en: 'Seed, crop-nutrition and farm tool supplier serving FPOs across the Malwa and Nimar regions.', hi: 'मालवा और निमाड़ क्षेत्र के एफपीओ को सेवा देने वाला बीज, फसल पोषण और कृषि औज़ार आपूर्तिकर्ता।' }, ...base },
];

export const PRODUCTS = [
  { id: 'wheat-sharbati', cat: 'grains', supplier: 'malwa-grain-growers-fpo', state: 'mp', name: { en: 'Wheat (Sharbati)', hi: 'गेहूँ (शरबती)' }, moq: { en: '10 tonnes', hi: '10 टन' }, pack: { en: 'Bulk or 50 kg bags', hi: 'थोक या 50 किलो बोरे' }, season: { en: 'Mar – May harvest', hi: 'मार्च – मई की कटाई' },
    desc: { en: 'Clean, graded wheat from member farmers. Moisture and foreign-matter limits can be agreed with the buyer.', hi: 'सदस्य किसानों का साफ़ और ग्रेडेड गेहूँ। नमी और अशुद्धि की सीमा खरीदार के साथ तय की जा सकती है।' }, ...base },
  { id: 'chana-desi', cat: 'grains', supplier: 'hadoti-kisan-producer-company', state: 'rajasthan', name: { en: 'Desi Chana (Chickpea)', hi: 'देसी चना' }, moq: { en: '5 tonnes', hi: '5 टन' }, pack: { en: '50 kg bags', hi: '50 किलो बोरे' }, season: { en: 'Mar – Apr harvest', hi: 'मार्च – अप्रैल की कटाई' },
    desc: { en: 'Sorted desi chana suitable for dal mills and besan makers.', hi: 'दाल मिलों और बेसन निर्माताओं के लिए उपयुक्त छँटा हुआ देसी चना।' }, ...base },
  { id: 'bajra-pearl-millet', cat: 'grains', supplier: 'marwar-millet-farmers-group', state: 'rajasthan', name: { en: 'Bajra (Pearl Millet)', hi: 'बाजरा' }, moq: { en: '2 tonnes', hi: '2 टन' }, pack: { en: '50 kg bags', hi: '50 किलो बोरे' }, season: { en: 'Oct – Nov harvest', hi: 'अक्टूबर – नवंबर की कटाई' },
    desc: { en: 'Naturally grown bajra from dryland farms, available whole or cleaned.', hi: 'असिंचित खेतों का प्राकृतिक रूप से उगाया बाजरा, साबुत या साफ़ किया हुआ।' }, ...base },
  { id: 'coriander-seed', cat: 'spices', supplier: 'hadoti-kisan-producer-company', state: 'rajasthan', name: { en: 'Coriander Seed', hi: 'धनिया बीज' }, moq: { en: '3 tonnes', hi: '3 टन' }, pack: { en: '40 kg bags', hi: '40 किलो बोरे' }, season: { en: 'Mar – Apr harvest', hi: 'मार्च – अप्रैल की कटाई' },
    desc: { en: 'Whole coriander seed, cleaned and sorted for spice grinders and traders.', hi: 'मसाला पीसने वालों और व्यापारियों के लिए साफ़ और छँटा हुआ साबुत धनिया।' }, ...base },
  { id: 'cumin-jeera', cat: 'spices', supplier: 'saurashtra-spice-growers', state: 'gujarat', name: { en: 'Cumin (Jeera)', hi: 'जीरा' }, moq: { en: '1 tonne', hi: '1 टन' }, pack: { en: '30 kg bags', hi: '30 किलो बोरे' }, season: { en: 'Feb – Mar harvest', hi: 'फरवरी – मार्च की कटाई' },
    desc: { en: 'Machine-cleaned cumin seed with grade options on request.', hi: 'मशीन से साफ़ किया हुआ जीरा, माँग पर अलग-अलग ग्रेड उपलब्ध।' }, ...base },
  { id: 'mustard-seed', cat: 'spices', supplier: 'mewar-cold-press-oils', state: 'rajasthan', name: { en: 'Mustard Seed', hi: 'सरसों' }, moq: { en: '5 tonnes', hi: '5 टन' }, pack: { en: '50 kg bags', hi: '50 किलो बोरे' }, season: { en: 'Feb – Mar harvest', hi: 'फरवरी – मार्च की कटाई' },
    desc: { en: 'Oilseed-grade mustard for expellers and cold-press units.', hi: 'एक्सपेलर और कोल्ड-प्रेस इकाइयों के लिए तेल-योग्य सरसों।' }, ...base },
  { id: 'onion-nashik', cat: 'produce', supplier: 'nashik-onion-growers-fpo', state: 'maharashtra', name: { en: 'Onion (Graded)', hi: 'प्याज (ग्रेडेड)' }, moq: { en: '1 truckload', hi: '1 ट्रक लोड' }, pack: { en: 'Mesh bags or crates', hi: 'जालीदार बोरे या क्रेट' }, season: { en: 'Seasonal supply', hi: 'मौसमी आपूर्ति' },
    desc: { en: 'Sorted and size-graded onions packed at a collection centre.', hi: 'संग्रह केंद्र पर छँटा और आकार के अनुसार ग्रेड किया हुआ प्याज।' }, ...base },
  { id: 'desi-cow-ghee', cat: 'dairy', supplier: 'gaushala-panchgavya-collective', state: 'gujarat', name: { en: 'Desi Cow Ghee', hi: 'देसी गाय का घी' }, moq: { en: '50 kg', hi: '50 किलो' }, pack: { en: '500 ml, 1 L jars; bulk tins', hi: '500 मि.ली., 1 लीटर जार; थोक टिन' }, season: { en: 'Year-round', hi: 'पूरे वर्ष' },
    desc: { en: 'Traditionally prepared ghee from partner gaushalas. Batch details and lab reports on request.', hi: 'साझेदार गौशालाओं का पारंपरिक विधि से बना घी। बैच विवरण और लैब रिपोर्ट माँग पर।' }, ...base },
  { id: 'panchgavya-range', cat: 'dairy', supplier: 'gaushala-panchgavya-collective', state: 'gujarat', name: { en: 'Panchgavya Products', hi: 'पंचगव्य उत्पाद' }, moq: { en: '100 units', hi: '100 इकाइयाँ' }, pack: { en: 'Retail and bulk packs', hi: 'खुदरा और थोक पैक' }, season: { en: 'Year-round', hi: 'पूरे वर्ष' },
    desc: { en: 'A range of gaushala-based products for households, temples and wellness retailers.', hi: 'घरों, मंदिरों और वेलनेस विक्रेताओं के लिए गौशाला आधारित उत्पादों की श्रृंखला।' }, ...base },
  { id: 'vermicompost', cat: 'inputs', supplier: 'aravali-organics', state: 'rajasthan', name: { en: 'Vermicompost', hi: 'वर्मीकम्पोस्ट' }, moq: { en: '5 tonnes', hi: '5 टन' }, pack: { en: '5, 25 and 50 kg bags', hi: '5, 25 और 50 किलो बोरे' }, season: { en: 'Year-round', hi: 'पूरे वर्ष' },
    desc: { en: 'Screened vermicompost for field crops, orchards and nurseries.', hi: 'खेत की फसलों, बागों और नर्सरी के लिए छना हुआ वर्मीकम्पोस्ट।' }, ...base },
  { id: 'gaushala-compost', cat: 'inputs', supplier: 'gaushala-panchgavya-collective', state: 'gujarat', name: { en: 'Gaushala Organic Fertiliser', hi: 'गौशाला जैविक खाद' }, moq: { en: '10 tonnes', hi: '10 टन' }, pack: { en: 'Bio-fertiliser bags', hi: 'जैव-उर्वरक के बोरे' }, season: { en: 'Year-round', hi: 'पूरे वर्ष' },
    desc: { en: 'Organic fertiliser made from gaushala cow dung, in line with the Federation’s gaushala model.', hi: 'फेडरेशन के गौशाला मॉडल के अनुरूप, गौशाला के गोबर से बनी जैविक खाद।' }, ...base },
  { id: 'cattle-mineral-mix', cat: 'feed', supplier: 'deccan-agro-feeds', state: 'maharashtra', name: { en: 'Cattle Feed & Mineral Mixture', hi: 'पशु आहार और खनिज मिश्रण' }, moq: { en: '2 tonnes', hi: '2 टन' }, pack: { en: '25 and 50 kg bags', hi: '25 और 50 किलो बोरे' }, season: { en: 'Year-round', hi: 'पूरे वर्ष' },
    desc: { en: 'Balanced feed and mineral mixture for milch animals. Formulation sheets on request.', hi: 'दुधारू पशुओं के लिए संतुलित आहार और खनिज मिश्रण। फ़ॉर्मूलेशन शीट माँग पर।' }, ...base },
  { id: 'cold-pressed-mustard-oil', cat: 'processed', supplier: 'mewar-cold-press-oils', state: 'rajasthan', name: { en: 'Cold-Pressed Mustard Oil', hi: 'कोल्ड-प्रेस सरसों तेल' }, moq: { en: '200 litres', hi: '200 लीटर' }, pack: { en: '1 L, 5 L and 15 L packs', hi: '1, 5 और 15 लीटर पैक' }, season: { en: 'Year-round', hi: 'पूरे वर्ष' },
    desc: { en: 'Cold-pressed oil from sourced mustard, available for retail and bulk buyers.', hi: 'खरीदी गई सरसों से बना कोल्ड-प्रेस तेल, खुदरा और थोक खरीदारों के लिए उपलब्ध।' }, ...base },
  { id: 'jaggery-blocks', cat: 'processed', supplier: 'mewar-cold-press-oils', state: 'rajasthan', name: { en: 'Jaggery (Gur)', hi: 'गुड़' }, moq: { en: '500 kg', hi: '500 किलो' }, pack: { en: 'Blocks and powder', hi: 'ढेली और पाउडर' }, season: { en: 'Nov – Mar', hi: 'नवंबर – मार्च' },
    desc: { en: 'Chemical-free jaggery in blocks and powder form.', hi: 'ढेली और पाउडर रूप में रसायन-मुक्त गुड़।' }, ...base },
  { id: 'woven-sacks-crates', cat: 'equipment', supplier: 'narmada-agri-packaging', state: 'gujarat', name: { en: 'Woven Sacks & Crates', hi: 'बोरे और क्रेट' }, moq: { en: '1,000 pieces', hi: '1,000 नग' }, pack: { en: 'Custom print available', hi: 'कस्टम प्रिंट उपलब्ध' }, season: { en: 'Year-round', hi: 'पूरे वर्ष' },
    desc: { en: 'Packaging for grain and produce, with FPO branding on request.', hi: 'अनाज और उपज के लिए पैकेजिंग, माँग पर एफपीओ ब्रांडिंग के साथ।' }, ...base },
  { id: 'drip-irrigation-kit', cat: 'equipment', supplier: 'sahyadri-irrigation-supplies', state: 'maharashtra', name: { en: 'Drip Irrigation Kits', hi: 'ड्रिप सिंचाई किट' }, moq: { en: '10 kits', hi: '10 किट' }, pack: { en: 'Per-acre kits', hi: 'प्रति एकड़ किट' }, season: { en: 'Year-round', hi: 'पूरे वर्ष' },
    desc: { en: 'Per-acre drip kits with fittings, suited to orchard and vegetable plots.', hi: 'बाग और सब्ज़ी के खेतों के लिए फिटिंग सहित प्रति एकड़ ड्रिप किट।' }, ...base },
];

/** Hide sample/unverified entries once draft mode is switched off. */
const show = (x) => draftMode || x.verified;
export const visibleProducts = () => PRODUCTS.filter(show);
export const visibleSuppliers = () => SUPPLIERS.filter(show);
export const supplierById = (id) => SUPPLIERS.find((s) => s.id === id);
export const productById = (id) => PRODUCTS.find((p) => p.id === id);
export const categoryById = (id) => CATEGORIES.find((c) => c.id === id);
export const productsOf = (supplierId) => visibleProducts().filter((p) => p.supplier === supplierId);
export const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
