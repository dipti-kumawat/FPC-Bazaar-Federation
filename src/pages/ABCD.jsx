import { useC, useLang, LLink } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Band, SectionTitle, Verify } from '../components/ui.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';

// ABCD project content (from the ABCD Project presentation). Edit text here; images are in /public/images/abcd/.
const T = {
  en: {
    title: 'ABCD: Agriculture Business Cluster Development Centre',
    crumb: 'ABCD Project',
    sub: 'Every village becomes self-reliant: one village-level centre for banking, inputs, training, veterinary care, energy and a guaranteed market.',
    lead: 'ABCD brings the services a farming village needs under one roof, so farmers and rural youth can earn locally instead of leaving for jobs elsewhere.',
    hubsTitle: 'Three hubs in every centre',
    hubs: [
      ['Agrow Super Store', 'Farm inputs, organic products and daily supplies.'],
      ['Agrow Services Hub', 'Banking, e-Mitra and government scheme services.'],
      ['Training & Skill Centre', 'Soil testing, drone spraying and livestock training.'],
    ],
    servicesTitle: 'Eight services of the ABCD centre',
    servicesSub: 'Each centre can offer these services to farmers in and around the village.',
    items: [
      { img: 'mini-atm', n: 'Mini ATM and e-Mitra: banking and government schemes', d: 'Basic banking, cash withdrawal and digital banking in the village itself, together with help for government schemes such as PM Kisan.' },
      { img: 'rental-centre', n: 'Agri sales centre and farm equipment rental', d: 'Seeds, fertilisers and other inputs in one place, and tractors, harvesters and sprayers available on rent, so small farmers need not buy costly machines.' },
      { img: 'training', n: 'Farmer training centre: new technology and poison-free farming', d: 'Drone spray training (precise spraying in place of pesticides) and a soil testing workshop that advises the right fertiliser and nutrients.' },
      { img: 'vet-camp', n: 'Veterinary camp and pure milk production training', d: 'Free animal health check-ups and training programmes on clean, quality milk production for livestock keepers.' },
      { img: 'solar-pump', n: 'Mini diesel pump and solar energy: the village’s own business', d: 'Pumps and solar energy services run as a local business, creating work for rural youth and supporting irrigation.' },
      { img: 'organic-store', n: 'Poison-free farming: organic product sales centre', d: 'A sales centre for organic and natural farm products, including Gaushala-based inputs, sold under the FPC Bazar name.' },
      { img: 'emitra', n: 'e-Mitra centre: state and central schemes for farmers', d: 'Online applications and help for schemes such as PM Kisan, Fasal Bima, PMKSY and Kisan Credit Card, so the benefit reaches every farmer.' },
      { img: 'buyback', n: 'Buy-back guarantee: organic produce, fruits and vegetables', d: 'Farmers sell their organic produce, fruits and vegetables through the centre with a buy-back arrangement.', verify: true },
    ],
    slogans: ['Self-reliant farmer', 'Empowered youth', 'Healthy citizens', 'Prosperous nation'],
    quote: 'Leave the job, start a business: the profit is yours, the loss is ours.',
    note: 'Images on this page are illustrations from the ABCD project presentation.',
    ctaTitle: 'Want an ABCD centre in your area?',
    ctaText: 'FPOs, entrepreneurs and partners can reach out to take part in the ABCD project.',
    ctaA: 'Contact us', ctaB: 'Register as a vendor',
    chairman: 'ABCD project by FPC Bazar Federation · Chairman: Laxman Lohana',
  },
  hi: {
    title: 'ABCD: एग्रीकल्चर बिज़नेस क्लस्टर डेवलपमेंट सेंटर',
    crumb: 'ABCD परियोजना',
    sub: 'अब हर गाँव होगा आत्मनिर्भर: बैंकिंग, कृषि इनपुट, प्रशिक्षण, पशु चिकित्सा, ऊर्जा और सुनिश्चित बाज़ार के लिए गाँव में एक ही केंद्र।',
    lead: 'ABCD खेती करने वाले गाँव की ज़रूरत की सभी सेवाएँ एक छत के नीचे लाता है, ताकि किसान और ग्रामीण युवा नौकरी के लिए बाहर जाने के बजाय अपने गाँव में कमा सकें।',
    hubsTitle: 'हर केंद्र में तीन हब',
    hubs: [
      ['एग्रो सुपर स्टोर', 'कृषि इनपुट, जैविक उत्पाद और रोज़मर्रा की ज़रूरत का सामान।'],
      ['एग्रो सर्विसेज़ हब', 'बैंकिंग, ई-मित्र और सरकारी योजनाओं की सेवाएँ।'],
      ['ट्रेनिंग एवं स्किल सेंटर', 'मृदा परीक्षण, ड्रोन स्प्रे और पशुपालन प्रशिक्षण।'],
    ],
    servicesTitle: 'ABCD केंद्र की आठ सेवाएँ',
    servicesSub: 'हर केंद्र गाँव और आसपास के किसानों को ये सेवाएँ दे सकता है।',
    items: [
      { img: 'mini-atm', n: 'मिनी ATM और ई-मित्र: बैंकिंग और सरकारी योजनाएँ', d: 'गाँव में ही बुनियादी बैंकिंग, नकद निकासी और डिजिटल बैंकिंग, साथ ही पीएम किसान जैसी सरकारी योजनाओं में मदद।' },
      { img: 'rental-centre', n: 'कृषि विक्रय केंद्र और कृषि उपकरण रेंटल सेंटर', d: 'बीज, खाद और अन्य इनपुट एक ही जगह, और ट्रैक्टर, हार्वेस्टर, स्प्रेयर किराये पर उपलब्ध, ताकि छोटे किसानों को महँगी मशीनें न खरीदनी पड़ें।' },
      { img: 'training', n: 'किसान प्रशिक्षण केंद्र: नई तकनीक और ज़हर-मुक्त कृषि', d: 'ड्रोन स्प्रे प्रशिक्षण (कीटनाशक के स्थान पर ड्रोन द्वारा सटीक छिड़काव) और मृदा परीक्षण कार्यशाला, जहाँ मिट्टी की जाँच कर सही उर्वरक एवं पोषक तत्व की सलाह दी जाती है।' },
      { img: 'vet-camp', n: 'पशु चिकित्सा कैंप और शुद्ध दुग्ध उत्पादन प्रशिक्षण', d: 'पशुपालकों के लिए निःशुल्क पशु स्वास्थ्य जाँच और स्वच्छ, गुणवत्तापूर्ण दुग्ध उत्पादन का प्रशिक्षण।' },
      { img: 'solar-pump', n: 'मिनी डीज़ल पंप और सोलर ऊर्जा: गाँव का अपना बिज़नेस', d: 'पंप और सोलर ऊर्जा की सेवाएँ स्थानीय व्यवसाय के रूप में, जिससे ग्रामीण युवाओं को काम मिले और सिंचाई को सहारा मिले।' },
      { img: 'organic-store', n: 'ज़हर-मुक्त कृषि: ऑर्गेनिक प्रोडक्ट विक्रय केंद्र', d: 'जैविक और प्राकृतिक कृषि उत्पादों, गौशाला आधारित इनपुट सहित, का विक्रय केंद्र, FPC बाज़ार नाम से।' },
      { img: 'emitra', n: 'ई-मित्र केंद्र: राज्य और केंद्र सरकार की योजनाएँ किसानों तक', d: 'पीएम किसान, फसल बीमा, PMKSY और किसान क्रेडिट कार्ड जैसी योजनाओं के लिए ऑनलाइन आवेदन और सहायता, ताकि लाभ हर किसान तक पहुँचे।' },
      { img: 'buyback', n: 'बाय-बैक गारंटी: किसानों का ऑर्गेनिक प्रोडक्ट, फ्रूट्स और वेजिटेबल', d: 'किसान अपना जैविक उत्पाद, फल और सब्ज़ियाँ केंद्र के माध्यम से बाय-बैक व्यवस्था के साथ बेच सकते हैं।', verify: true },
    ],
    slogans: ['आत्मनिर्भर किसान', 'सशक्त युवा', 'स्वस्थ भारत वासी', 'समृद्ध राष्ट्र'],
    quote: 'नौकरी छोड़ो, व्यापार करो: नफा आपका, नुकसान हमारा।',
    note: 'इस पृष्ठ की तस्वीरें ABCD प्रोजेक्ट प्रेज़ेंटेशन के चित्र हैं।',
    ctaTitle: 'क्या आप अपने क्षेत्र में ABCD केंद्र चाहते हैं?',
    ctaText: 'FPO, उद्यमी और साझेदार ABCD परियोजना में भाग लेने के लिए संपर्क कर सकते हैं।',
    ctaA: 'संपर्क करें', ctaB: 'वेंडर के रूप में पंजीकरण करें',
    chairman: 'FPC बाज़ार फेडरेशन द्वारा प्रस्तुत ABCD परियोजना · चेयरमैन: लक्ष्मण लोहाना',
  },
  mr: {
    title: 'ABCD: कृषी व्यवसाय क्लस्टर विकास केंद्र',
    crumb: 'ABCD प्रकल्प',
    sub: 'प्रत्येक गाव आत्मनिर्भर: बँकिंग, निविष्ठा, प्रशिक्षण, पशुवैद्यकीय सेवा, ऊर्जा आणि हमखास बाजारासाठी गावपातळीवर एक केंद्र.',
    lead: 'शेतकऱ्यांच्या गावाला लागणाऱ्या सेवा ABCD एकाच छताखाली आणते, त्यामुळे शेतकरी आणि ग्रामीण तरुण नोकरीसाठी बाहेर न जाता गावातच कमाई करू शकतात.',
    hubsTitle: 'प्रत्येक केंद्रात तीन विभाग',
    hubs: [
      ['ॲग्रो सुपर स्टोअर', 'शेती निविष्ठा, सेंद्रिय उत्पादने आणि दैनंदिन वस्तू.'],
      ['ॲग्रो सर्व्हिसेस हब', 'बँकिंग, ई-मित्र आणि सरकारी योजनांच्या सेवा.'],
      ['प्रशिक्षण आणि कौशल्य केंद्र', 'माती परीक्षण, ड्रोन फवारणी आणि पशुधन प्रशिक्षण.'],
    ],
    servicesTitle: 'ABCD केंद्राच्या आठ सेवा',
    servicesSub: 'प्रत्येक केंद्र गावातील आणि परिसरातील शेतकऱ्यांना या सेवा देऊ शकते.',
    items: [
      { img: 'mini-atm', n: 'मिनी ATM आणि ई-मित्र: बँकिंग आणि सरकारी योजना', d: 'गावातच मूलभूत बँकिंग, पैसे काढणे आणि डिजिटल बँकिंग, तसेच पीएम किसानसारख्या सरकारी योजनांसाठी मदत.' },
      { img: 'rental-centre', n: 'कृषी विक्री केंद्र आणि शेती उपकरणे भाड्याने', d: 'बियाणे, खते आणि इतर निविष्ठा एकाच ठिकाणी, आणि ट्रॅक्टर, हार्वेस्टर व फवारणी यंत्रे भाड्याने, त्यामुळे लहान शेतकऱ्यांना महागडी यंत्रे विकत घ्यावी लागत नाहीत.' },
      { img: 'training', n: 'शेतकरी प्रशिक्षण केंद्र: नवीन तंत्रज्ञान आणि विषमुक्त शेती', d: 'ड्रोन फवारणी प्रशिक्षण (कीटकनाशकांऐवजी अचूक फवारणी) आणि योग्य खते व पोषक घटकांचा सल्ला देणारी माती परीक्षण कार्यशाळा.' },
      { img: 'vet-camp', n: 'पशुवैद्यकीय शिबिर आणि शुद्ध दूध उत्पादन प्रशिक्षण', d: 'पशुपालकांसाठी मोफत पशु आरोग्य तपासणी आणि स्वच्छ, दर्जेदार दूध उत्पादनाचे प्रशिक्षण कार्यक्रम.' },
      { img: 'solar-pump', n: 'मिनी डिझेल पंप आणि सौर ऊर्जा: गावाचा स्वतःचा व्यवसाय', d: 'स्थानिक व्यवसाय म्हणून चालवलेल्या पंप आणि सौर ऊर्जा सेवा, ज्यामुळे ग्रामीण तरुणांना काम मिळते आणि सिंचनाला आधार मिळतो.' },
      { img: 'organic-store', n: 'विषमुक्त शेती: सेंद्रिय उत्पादन विक्री केंद्र', d: 'एफपीसी बाजारच्या नावाने विकल्या जाणाऱ्या, गोशाळा-आधारित निविष्ठांसह सेंद्रिय आणि नैसर्गिक शेती उत्पादनांचे विक्री केंद्र.' },
      { img: 'emitra', n: 'ई-मित्र केंद्र: शेतकऱ्यांसाठी राज्य आणि केंद्र सरकारच्या योजना', d: 'पीएम किसान, फसल बीमा, PMKSY आणि किसान क्रेडिट कार्ड यांसारख्या योजनांसाठी ऑनलाइन अर्ज आणि मदत, जेणेकरून लाभ प्रत्येक शेतकऱ्यापर्यंत पोहोचेल.' },
      { img: 'buyback', n: 'खरेदीची हमी: सेंद्रिय शेतमाल, फळे आणि भाजीपाला', d: 'शेतकरी आपला सेंद्रिय शेतमाल, फळे आणि भाजीपाला खरेदी हमीच्या व्यवस्थेसह केंद्रामार्फत विकतात.', verify: true },
    ],
    slogans: ['आत्मनिर्भर शेतकरी', 'सक्षम तरुण', 'निरोगी नागरिक', 'समृद्ध राष्ट्र'],
    quote: 'नोकरी सोडा, व्यवसाय सुरू करा: नफा तुमचा, तोटा आमचा.',
    note: 'या पेजवरील चित्रे ABCD प्रकल्पाच्या सादरीकरणातील आहेत.',
    ctaTitle: 'तुमच्या भागात ABCD केंद्र हवे आहे?',
    ctaText: 'ABCD प्रकल्पात सहभागी होण्यासाठी एफपीओ, उद्योजक आणि भागीदार संपर्क साधू शकतात.',
    ctaA: 'संपर्क साधा', ctaB: 'व्हेंडर म्हणून नोंदणी करा',
    chairman: 'एफपीसी बाजार फेडरेशनचा ABCD प्रकल्प · अध्यक्ष: लक्ष्मण लोहाणा',
  },
  gu: {
    title: 'ABCD: કૃષિ વ્યવસાય ક્લસ્ટર વિકાસ કેન્દ્ર',
    crumb: 'ABCD પ્રોજેક્ટ',
    sub: 'દરેક ગામ આત્મનિર્ભર: બેંકિંગ, ઇનપુટ, તાલીમ, પશુ ચિકિત્સા, ઊર્જા અને ખાતરીપૂર્વકના બજાર માટે ગામ સ્તરે એક કેન્દ્ર.',
    lead: 'ખેડૂત ગામને જરૂરી સેવાઓ ABCD એક જ છત નીચે લાવે છે, જેથી ખેડૂતો અને ગ્રામીણ યુવાનો નોકરી માટે બહાર જવાને બદલે ગામમાં જ કમાઈ શકે.',
    hubsTitle: 'દરેક કેન્દ્રમાં ત્રણ વિભાગ',
    hubs: [
      ['એગ્રો સુપર સ્ટોર', 'ખેત ઇનપુટ, ઓર્ગેનિક ઉત્પાદનો અને રોજિંદી વસ્તુઓ.'],
      ['એગ્રો સર્વિસીસ હબ', 'બેંકિંગ, ઈ-મિત્ર અને સરકારી યોજનાઓની સેવાઓ.'],
      ['તાલીમ અને કૌશલ્ય કેન્દ્ર', 'જમીન ચકાસણી, ડ્રોન છંટકાવ અને પશુધન તાલીમ.'],
    ],
    servicesTitle: 'ABCD કેન્દ્રની આઠ સેવાઓ',
    servicesSub: 'દરેક કેન્દ્ર ગામ અને આસપાસના ખેડૂતોને આ સેવાઓ આપી શકે છે.',
    items: [
      { img: 'mini-atm', n: 'મિની ATM અને ઈ-મિત્ર: બેંકિંગ અને સરકારી યોજનાઓ', d: 'ગામમાં જ મૂળભૂત બેંકિંગ, રોકડ ઉપાડ અને ડિજિટલ બેંકિંગ, સાથે પીએમ કિસાન જેવી સરકારી યોજનાઓ માટે મદદ.' },
      { img: 'rental-centre', n: 'કૃષિ વેચાણ કેન્દ્ર અને ખેત સાધનો ભાડે', d: 'બિયારણ, ખાતર અને અન્ય ઇનપુટ એક જ જગ્યાએ, અને ટ્રેક્ટર, હાર્વેસ્ટર અને સ્પ્રેયર ભાડે ઉપલબ્ધ, જેથી નાના ખેડૂતોને મોંઘાં મશીનો ખરીદવાં ન પડે.' },
      { img: 'training', n: 'ખેડૂત તાલીમ કેન્દ્ર: નવી ટેકનોલોજી અને ઝેરમુક્ત ખેતી', d: 'ડ્રોન છંટકાવ તાલીમ (જંતુનાશકોને બદલે ચોક્કસ છંટકાવ) અને યોગ્ય ખાતર તથા પોષક તત્ત્વોની સલાહ આપતી જમીન ચકાસણી વર્કશોપ.' },
      { img: 'vet-camp', n: 'પશુ ચિકિત્સા કેમ્પ અને શુદ્ધ દૂધ ઉત્પાદન તાલીમ', d: 'પશુપાલકો માટે મફત પશુ આરોગ્ય તપાસ અને સ્વચ્છ, ગુણવત્તાયુક્ત દૂધ ઉત્પાદનના તાલીમ કાર્યક્રમો.' },
      { img: 'solar-pump', n: 'મિની ડીઝલ પંપ અને સૌર ઊર્જા: ગામનો પોતાનો વ્યવસાય', d: 'સ્થાનિક વ્યવસાય તરીકે ચાલતી પંપ અને સૌર ઊર્જા સેવાઓ, જેનાથી ગ્રામીણ યુવાનોને કામ મળે છે અને સિંચાઈને ટેકો મળે છે.' },
      { img: 'organic-store', n: 'ઝેરમુક્ત ખેતી: ઓર્ગેનિક ઉત્પાદન વેચાણ કેન્દ્ર', d: 'એફપીસી બજારના નામે વેચાતાં, ગૌશાળા-આધારિત ઇનપુટ સહિત ઓર્ગેનિક અને પ્રાકૃતિક ખેત ઉત્પાદનોનું વેચાણ કેન્દ્ર.' },
      { img: 'emitra', n: 'ઈ-મિત્ર કેન્દ્ર: ખેડૂતો માટે રાજ્ય અને કેન્દ્રની યોજનાઓ', d: 'પીએમ કિસાન, ફસલ બીમા, PMKSY અને કિસાન ક્રેડિટ કાર્ડ જેવી યોજનાઓ માટે ઓનલાઇન અરજી અને મદદ, જેથી લાભ દરેક ખેડૂત સુધી પહોંચે.' },
      { img: 'buyback', n: 'ખરીદીની ખાતરી: ઓર્ગેનિક પેદાશ, ફળ અને શાકભાજી', d: 'ખેડૂતો પોતાની ઓર્ગેનિક પેદાશ, ફળ અને શાકભાજી ખરીદીની ખાતરીની વ્યવસ્થા સાથે કેન્દ્ર મારફતે વેચે છે.', verify: true },
    ],
    slogans: ['આત્મનિર્ભર ખેડૂત', 'સશક્ત યુવા', 'સ્વસ્થ નાગરિક', 'સમૃદ્ધ રાષ્ટ્ર'],
    quote: 'નોકરી છોડો, વ્યવસાય શરૂ કરો: નફો તમારો, નુકસાન અમારું.',
    note: 'આ પેજનાં ચિત્રો ABCD પ્રોજેક્ટની પ્રસ્તુતિમાંથી છે.',
    ctaTitle: 'તમારા વિસ્તારમાં ABCD કેન્દ્ર જોઈએ છે?',
    ctaText: 'ABCD પ્રોજેક્ટમાં ભાગ લેવા એફપીઓ, ઉદ્યોગસાહસિકો અને ભાગીદારો સંપર્ક કરી શકે છે.',
    ctaA: 'સંપર્ક કરો', ctaB: 'વેન્ડર તરીકે નોંધણી કરો',
    chairman: 'એફપીસી બજાર ફેડરેશનનો ABCD પ્રોજેક્ટ · અધ્યક્ષ: લક્ષ્મણ લોહાણા',
  },
};

export default function ABCD() {
  useSeo('abcd');
  const lang = useLang();
  const t = T[lang] || T.en;
  return (
    <>
      <PageHero title={t.title} sub={t.sub} crumb={t.crumb} slot="abcdHero" />

      <Band>
        <p className="mx-auto max-w-3xl text-center text-xl leading-9 text-slate-700">{t.lead}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.hubs.map(([h, d], i) => (
            <Reveal key={h} delay={i * 90}>
              <div className="card h-full border-t-4 border-t-gold-500 p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-brand-900">{h}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Band>

      <Band className="bg-white">
        <SectionTitle sub={t.servicesSub}>{t.servicesTitle}</SectionTitle>
        <div className="grid gap-8">
          {t.items.map((it, i) => {
            const body = (
              <Reveal key={it.img}>
                <article className={`card grid overflow-hidden md:grid-cols-2 ${i % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}>
                  <div className="aspect-[16/10] overflow-hidden bg-brand-900 md:aspect-auto md:min-h-[300px]">
                    <img src={`/images/abcd/${it.img}.jpg`} alt={it.n} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center p-7 sm:p-9">
                    <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-gold-500 font-display text-lg font-bold text-brand-800">{i + 1}</span>
                    <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-brand-900">{it.n}</h3>
                    <p className="mt-3 leading-8 text-slate-600">{it.d}</p>
                  </div>
                </article>
              </Reveal>
            );
            return it.verify ? <Verify key={it.img} flag="noInvestBuyback">{body}</Verify> : body;
          })}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">{t.note}</p>
      </Band>

      <section className="relative isolate overflow-hidden bg-brand-800 py-16 text-white">
        <div className="bg-lattice absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-x text-center">
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {t.slogans.map((s) => <span key={s} className="rounded-full border border-gold-500/60 px-5 py-2 text-sm font-semibold text-gold-300">{s}</span>)}
          </div>
          <Verify flag="noInvestBuyback">
            <p className="mx-auto mt-8 max-w-3xl font-display text-3xl font-semibold leading-snug sm:text-4xl">{t.quote}</p>
          </Verify>
          <p className="mt-6 text-sm text-white/70">{t.chairman}</p>
        </div>
      </section>

      <Band>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold text-brand-900">{t.ctaTitle}</h2>
          <span className="gold-rule mx-auto mt-4" />
          <p className="mt-5 text-lg leading-8 text-slate-600">{t.ctaText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LLink to="/contact" className="btn-primary">{t.ctaA} <Arrow className="h-4 w-4" /></LLink>
            <LLink to="/vendor-registration" className="btn-outline">{t.ctaB}</LLink>
          </div>
        </div>
      </Band>
    </>
  );
}

// Shared with the Cluster Centre page, which shows the same eight services as an accordion.
export const abcdServices = (lang) => { const t = T[lang] || T.en; return { title: t.servicesTitle, sub: t.servicesSub, items: t.items }; };