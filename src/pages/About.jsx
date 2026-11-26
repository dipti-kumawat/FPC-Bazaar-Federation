import { useC, useLang } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Verify, SectionTitle, Band, PhotoSlot } from '../components/ui.jsx';
import { Icon } from '../components/Icons.jsx';
import Reveal from '../components/Reveal.jsx';

const leadership = {
  en: {
    vision: {
      title: 'Our Vision',
      text: 'To strengthen farmer-led institutions and build sustainable rural communities through cooperation, inclusive development and better livelihood opportunities.',
    },
    mission: {
      title: 'Our Mission',
      text: 'To support farmers, FPOs, rural youth and women through agricultural development, dairy initiatives, market linkages, training and community-focused projects.',
    },
    visionNote: 'Working draft based on the Federation profile. Replace with the exact approved wording from the original profile before publication.',
    messagesTitle: 'Leadership Messages',
    messagesSub: 'Messages are shown only where an approved message is available. Add the final signed-off text before launch.',
    messagePending: 'Approved message text to be added from the Federation profile.',
    profileTitle: 'Leadership & Management Team',
    profileSub: 'Profiles and designations as listed in the Federation profile.',
    role: {
      chair: 'Chairperson',
      md: 'Managing Director',
      cfo: 'Chief Financial Officer',
      farming: 'Director – Farming Products',
      finance: 'Director – Finance',
      admin: 'Director – Administration',
      agri: 'Agriculture Project Head',
      marketing: 'Marketing Head',
      project: 'Project Head',
      advisor: 'Advisory Member',
    },
    committeeTitle: 'Advisory Committee',
    committeeSub: 'Experienced professionals advising the Federation. Details are as provided by each member.',
    committeePending: 'Advisory committee profile details to be added after final verification.',
    photo: 'Photograph to be added',
    schemesTitle: 'Key Initiatives',
    docsTitle: 'Documents & Registration',
    audiencesTitle: 'Who We Work With',
    registered: 'Registered 2022',
    cin: 'CIN',
    office: 'Registered Office',
    organisation: 'Organisation',
    whoTitle: 'Who we are',
    whoParas: [
      'FPC Bazaar Federation is a Farmer - Youth - Women Welfare Cooperative Federation, registered in 2022 under the Ministry of Corporate Affairs, Government of India, with its registered office in Jaipur, Rajasthan. It works as a common platform for farmers, Farmer Producer Organisations (FPOs), rural youth and women.',
      'The Federation connects those who grow, aggregate, make and supply, so that produce finds fair markets and inputs reach the farm gate. Its work brings together Gaushala care, natural and organic farming, agribusiness clusters, clean energy, rural livelihoods and market linkages.',
      'Guided by the motto of Cooperation, Employment and Development, the Federation works through a network of FPOs to build self-reliant youth, independent farmers and a prosperous India.',
    ],
    glance: 'At a glance',
    detailsTitle: 'Company details', detailsSub: 'Who we are and how the Federation is set up.',
    motto: 'Cooperation · Employment · Development',
  },
  hi: {
    vision: {
      title: 'हमारा विज़न',
      text: 'सहकारिता, समावेशी विकास और बेहतर आजीविका के अवसरों के माध्यम से किसान-आधारित संस्थाओं को मजबूत करना और टिकाऊ ग्रामीण समुदायों का निर्माण करना।',
    },
    mission: {
      title: 'हमारा मिशन',
      text: 'कृषि विकास, डेयरी पहल, बाज़ार संपर्क, प्रशिक्षण और समुदाय-केंद्रित परियोजनाओं के माध्यम से किसानों, एफपीओ, ग्रामीण युवाओं और महिलाओं को सहयोग देना।',
    },
    visionNote: 'यह महासंघ की प्रोफ़ाइल पर आधारित कार्यशील प्रारूप है। प्रकाशित करने से पहले इसे मूल प्रोफ़ाइल के स्वीकृत शब्दों से बदलें।',
    messagesTitle: 'नेतृत्व के संदेश',
    messagesSub: 'संदेश केवल वहीं दिखाए जाएँगे जहाँ स्वीकृत संदेश उपलब्ध है। लॉन्च से पहले अंतिम स्वीकृत टेक्स्ट जोड़ें।',
    messagePending: 'महासंघ की प्रोफ़ाइल से स्वीकृत संदेश यहाँ जोड़ा जाएगा।',
    profileTitle: 'नेतृत्व एवं प्रबंधन टीम',
    profileSub: 'महासंघ की प्रोफ़ाइल में दिए गए नाम और पद।',
    role: {
      chair: 'अध्यक्ष',
      md: 'प्रबंध निदेशक',
      cfo: 'मुख्य वित्त अधिकारी',
      farming: 'निदेशक – कृषि उत्पाद',
      finance: 'निदेशक – वित्त',
      admin: 'निदेशक – प्रशासन',
      agri: 'कृषि परियोजना प्रमुख',
      marketing: 'मार्केटिंग प्रमुख',
      project: 'परियोजना प्रमुख',
      advisor: 'सलाहकार सदस्य',
    },
    committeeTitle: 'सलाहकार समिति',
    committeeSub: 'महासंघ को सलाह देने वाले अनुभवी पेशेवर। विवरण प्रत्येक सदस्य द्वारा दी गई जानकारी के अनुसार हैं।',
    committeePending: 'अंतिम सत्यापन के बाद सलाहकार समिति के प्रोफ़ाइल विवरण जोड़े जाएँगे।',
    photo: 'फोटो जोड़ी जाएगी',
    schemesTitle: 'प्रमुख पहल',
    docsTitle: 'दस्तावेज़ एवं पंजीकरण',
    audiencesTitle: 'हम किनके साथ काम करते हैं',
    registered: '2022 में पंजीकृत',
    cin: 'सीआईएन',
    office: 'पंजीकृत कार्यालय',
    organisation: 'संगठन',
    whoTitle: 'हम कौन हैं',
    whoParas: [
      'एफपीसी बाज़ार फेडरेशन एक किसान - युवा - महिला कल्याण सहकारी महासंघ है, जो 2022 में भारत सरकार के कॉर्पोरेट कार्य मंत्रालय के अंतर्गत पंजीकृत हुआ और जिसका पंजीकृत कार्यालय जयपुर, राजस्थान में है। यह किसानों, किसान उत्पादक संगठनों (एफपीओ), ग्रामीण युवाओं और महिलाओं के लिए एक साझा मंच के रूप में काम करता है।',
      'फेडरेशन उन सभी को जोड़ता है जो उगाते, एकत्र करते, बनाते और आपूर्ति करते हैं, ताकि उपज को उचित बाज़ार मिले और जरूरी सामग्री खेत तक पहुँचे। इसके कार्यों में गौशाला सेवा, प्राकृतिक और जैविक खेती, एग्रीबिजनेस क्लस्टर, स्वच्छ ऊर्जा, ग्रामीण आजीविका और बाज़ार संपर्क शामिल हैं।',
      'सहकारिता, रोजगार और विकास के आदर्श वाक्य के साथ फेडरेशन एफपीओ के नेटवर्क के माध्यम से आत्मनिर्भर युवा, स्वतंत्र किसान और समृद्ध भारत के निर्माण के लिए काम करता है।',
    ],
    glance: 'एक नज़र में',
    detailsTitle: 'संगठन का विवरण', detailsSub: 'हम कौन हैं और फेडरेशन का ढांचा।',
    motto: 'सहकारिता · रोजगार · विकास',
  },
  mr: {
    vision: {
      title: 'आमचा दृष्टिकोन',
      text: 'सहकार, सर्वसमावेशक विकास आणि उपजीविकेच्या चांगल्या संधींद्वारे शेतकरी-केंद्रित संस्था बळकट करणे आणि शाश्वत ग्रामीण समुदाय उभारणे.',
    },
    mission: {
      title: 'आमचे ध्येय',
      text: 'कृषी विकास, डेअरी उपक्रम, बाजार जोडणी, प्रशिक्षण आणि समुदायकेंद्रित प्रकल्पांद्वारे शेतकरी, एफपीओ, ग्रामीण तरुण आणि महिलांना पाठबळ देणे.',
    },
    visionNote: 'फेडरेशन प्रोफाइलवर आधारित कार्यरत मसुदा. प्रकाशनापूर्वी मूळ प्रोफाइलमधील मंजूर शब्दांनी बदला.',
    messagesTitle: 'नेतृत्वाचे संदेश',
    messagesSub: 'मंजूर संदेश उपलब्ध असेल तिथेच संदेश दाखवले जातात. लाँचपूर्वी अंतिम मंजूर मजकूर जोडा.',
    messagePending: 'मंजूर संदेशाचा मजकूर फेडरेशन प्रोफाइलमधून जोडला जाईल.',
    profileTitle: 'नेतृत्व आणि व्यवस्थापन टीम',
    profileSub: 'फेडरेशन प्रोफाइलमध्ये दिल्याप्रमाणे प्रोफाइल आणि पदे.',
    role: {
      chair: 'अध्यक्ष',
      md: 'व्यवस्थापकीय संचालक',
      cfo: 'मुख्य वित्त अधिकारी',
      farming: 'संचालक – शेती उत्पादने',
      finance: 'संचालक – वित्त',
      admin: 'संचालक – प्रशासन',
      agri: 'कृषी प्रकल्प प्रमुख',
      marketing: 'विपणन प्रमुख',
      project: 'प्रकल्प प्रमुख',
      advisor: 'सल्लागार सदस्य',
    },
    committeeTitle: 'सल्लागार समिती',
    committeeSub: 'फेडरेशनला सल्ला देणारे अनुभवी व्यावसायिक. तपशील प्रत्येक सदस्याने दिल्याप्रमाणे.',
    committeePending: 'अंतिम पडताळणीनंतर सल्लागार समितीच्या प्रोफाइलचा तपशील जोडला जाईल.',
    photo: 'फोटो जोडला जाईल',
    schemesTitle: 'प्रमुख उपक्रम',
    docsTitle: 'दस्तऐवज आणि नोंदणी',
    audiencesTitle: 'आम्ही कोणासोबत काम करतो',
    registered: '2022 मध्ये नोंदणीकृत',
    cin: 'CIN',
    office: 'नोंदणीकृत कार्यालय',
    organisation: 'संस्था',
    whoTitle: 'आम्ही कोण आहोत',
    whoParas: [
      'एफपीसी बाजार फेडरेशन हा शेतकरी - युवा - महिला कल्याण सहकारी महासंघ आहे. तो 2022 मध्ये भारत सरकारच्या कॉर्पोरेट व्यवहार मंत्रालयाकडे नोंदणीकृत झाला असून त्याचे नोंदणीकृत कार्यालय जयपूर, राजस्थान येथे आहे. तो शेतकरी, शेतकरी उत्पादक संस्था (एफपीओ), ग्रामीण तरुण आणि महिलांसाठी एक समान व्यासपीठ म्हणून काम करतो.',
      'फेडरेशन पिकवणारे, एकत्र करणारे, बनवणारे आणि पुरवणारे यांना जोडते, जेणेकरून शेतमालाला योग्य बाजार मिळेल आणि निविष्ठा शेताच्या बांधापर्यंत पोहोचतील. गोशाळा संगोपन, नैसर्गिक आणि सेंद्रिय शेती, कृषी व्यवसाय क्लस्टर, स्वच्छ ऊर्जा, ग्रामीण उपजीविका आणि बाजार जोडणी यांना त्याचे काम एकत्र आणते.',
      'सहकार, रोजगार आणि विकास या ब्रीदवाक्याच्या मार्गदर्शनाखाली फेडरेशन एफपीओंच्या नेटवर्कद्वारे आत्मनिर्भर तरुण, स्वतंत्र शेतकरी आणि समृद्ध भारत घडवण्याचे काम करते.',
    ],
    glance: 'एका दृष्टिक्षेपात',
    detailsTitle: 'कंपनीचा तपशील', detailsSub: 'आम्ही कोण आहोत आणि फेडरेशनची रचना कशी आहे.',
    motto: 'सहकार · रोजगार · विकास',
  },
  gu: {
    vision: {
      title: 'અમારું વિઝન',
      text: 'સહકાર, સર્વસમાવેશક વિકાસ અને આજીવિકાની વધુ સારી તકો દ્વારા ખેડૂત-કેન્દ્રિત સંસ્થાઓને મજબૂત કરવી અને ટકાઉ ગ્રામીણ સમુદાયો બનાવવા.',
    },
    mission: {
      title: 'અમારું ધ્યેય',
      text: 'કૃષિ વિકાસ, ડેરી પહેલ, બજાર જોડાણ, તાલીમ અને સમુદાયકેન્દ્રિત પ્રોજેક્ટ્સ દ્વારા ખેડૂતો, એફપીઓ, ગ્રામીણ યુવાનો અને મહિલાઓને ટેકો આપવો.',
    },
    visionNote: 'ફેડરેશન પ્રોફાઇલ પર આધારિત કાર્યકારી ડ્રાફ્ટ. પ્રકાશન પહેલાં મૂળ પ્રોફાઇલના મંજૂર શબ્દોથી બદલો.',
    messagesTitle: 'નેતૃત્વના સંદેશા',
    messagesSub: 'મંજૂર સંદેશ ઉપલબ્ધ હોય ત્યાં જ સંદેશા બતાવાય છે. લોન્ચ પહેલાં અંતિમ મંજૂર લખાણ ઉમેરો.',
    messagePending: 'મંજૂર સંદેશનું લખાણ ફેડરેશન પ્રોફાઇલમાંથી ઉમેરાશે.',
    profileTitle: 'નેતૃત્વ અને વ્યવસ્થાપન ટીમ',
    profileSub: 'ફેડરેશન પ્રોફાઇલમાં દર્શાવ્યા મુજબ પ્રોફાઇલ અને હોદ્દા.',
    role: {
      chair: 'અધ્યક્ષ',
      md: 'મેનેજિંગ ડિરેક્ટર',
      cfo: 'મુખ્ય નાણાકીય અધિકારી',
      farming: 'ડિરેક્ટર – ખેત ઉત્પાદનો',
      finance: 'ડિરેક્ટર – નાણાં',
      admin: 'ડિરેક્ટર – વહીવટ',
      agri: 'કૃષિ પ્રોજેક્ટ વડા',
      marketing: 'માર્કેટિંગ વડા',
      project: 'પ્રોજેક્ટ વડા',
      advisor: 'સલાહકાર સભ્ય',
    },
    committeeTitle: 'સલાહકાર સમિતિ',
    committeeSub: 'ફેડરેશનને સલાહ આપતા અનુભવી વ્યાવસાયિકો. વિગતો દરેક સભ્યએ આપ્યા મુજબ.',
    committeePending: 'અંતિમ ચકાસણી પછી સલાહકાર સમિતિની પ્રોફાઇલ વિગતો ઉમેરાશે.',
    photo: 'ફોટો ઉમેરાશે',
    schemesTitle: 'મુખ્ય પહેલ',
    docsTitle: 'દસ્તાવેજો અને નોંધણી',
    audiencesTitle: 'અમે કોની સાથે કામ કરીએ છીએ',
    registered: '2022માં નોંધાયેલ',
    cin: 'CIN',
    office: 'નોંધાયેલ કચેરી',
    organisation: 'સંસ્થા',
    whoTitle: 'અમે કોણ છીએ',
    whoParas: [
      'એફપીસી બજાર ફેડરેશન ખેડૂત - યુવા - મહિલા કલ્યાણ સહકારી મહાસંઘ છે. તે 2022માં ભારત સરકારના કોર્પોરેટ બાબતોના મંત્રાલયમાં નોંધાયેલ છે અને તેની નોંધાયેલ કચેરી જયપુર, રાજસ્થાનમાં છે. તે ખેડૂતો, ખેડૂત ઉત્પાદક સંસ્થાઓ (એફપીઓ), ગ્રામીણ યુવાનો અને મહિલાઓ માટે સહિયારા મંચ તરીકે કામ કરે છે.',
      'ફેડરેશન ઉગાડનારા, એકત્ર કરનારા, બનાવનારા અને પૂરું પાડનારાઓને જોડે છે, જેથી પેદાશને યોગ્ય બજાર મળે અને ઇનપુટ ખેતર સુધી પહોંચે. તેનું કામ ગૌશાળા સંભાળ, પ્રાકૃતિક અને ઓર્ગેનિક ખેતી, કૃષિ વ્યવસાય ક્લસ્ટર, સ્વચ્છ ઊર્જા, ગ્રામીણ આજીવિકા અને બજાર જોડાણને એકસાથે લાવે છે.',
      'સહકાર, રોજગાર અને વિકાસના સૂત્રના માર્ગદર્શન હેઠળ ફેડરેશન એફપીઓના નેટવર્ક દ્વારા આત્મનિર્ભર યુવાનો, સ્વતંત્ર ખેડૂતો અને સમૃદ્ધ ભારતના નિર્માણ માટે કામ કરે છે.',
    ],
    glance: 'એક નજરે',
    detailsTitle: 'કંપનીની વિગતો', detailsSub: 'અમે કોણ છીએ અને ફેડરેશનનું માળખું કેવું છે.',
    motto: 'સહકાર · રોજગાર · વિકાસ',
  },
};

const members = [
  { key: 'chairperson', name: 'Laxman Lohana', role: 'chair', image: 'chairperson', message: true },
  { key: 'naveen', name: 'Naveen Dhingra', role: 'md', image: 'naveen', message: true },
  { key: 'sourabh', name: 'Sourabh Sindhi', role: 'cfo', image: 'sourabh' },
  { key: 'ashok', name: 'Ashok Sarrangan', role: 'farming', image: 'ashok', detail: 'Managing Director Technical, Richplus Bio Fertilizers & Feeds Pvt. Ltd.' },
  { key: 'narendra', name: 'Narendra Gaur', role: 'finance', image: 'narendra', detail: 'Retired Income Tax Chief Commissioner' },
  { key: 'shyam', name: 'Shyam Singh Rajpurohit', role: 'admin', image: 'shyam', detail: 'Retired IAS Officer' },
  { key: 'mittal', name: 'Mittal Shah', role: 'agri', image: 'mittal' },
  { key: 'nilesh', name: 'Nilesh Patel', role: 'marketing', image: 'nilesh' },
  { key: 'rajendra', name: 'Rajendra Ji', role: 'project', image: 'rajendra' },
  { key: 'shreevats', name: 'Shreevats Sanjay', hiName: 'श्रीवत्स संजय', guName: 'શ્રીવત્સ સંજય', role: 'advisor', image: 'shreevats',
    detail: { en: 'Retd. Deputy Director General (DDG), Ministry of Tourism, Govt. of India', hi: 'सेवानिवृत्त उप महानिदेशक (DDG), पर्यटन मंत्रालय, भारत सरकार', mr: 'निवृत्त उपमहासंचालक (DDG), पर्यटन मंत्रालय, भारत सरकार', gu: 'નિવૃત્ત નાયબ મહાનિદેશક (DDG), પ્રવાસન મંત્રાલય, ભારત સરકાર' },
    bio: {
      en: ['Directed India Tourism offices for 43 countries, including Europe, Russia, CIS, Scandinavia, USA, UK, Ireland and Israel', 'Regional Director for Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, Telangana, Puducherry, Lakshadweep and the North-East states', 'Principal of the Institutes of Hotel Management at Chennai and Bangalore, Govt. of India', 'Director Tourism in Rajasthan, Uttar Pradesh and Bihar', 'Addressed UNWTO in Spain and represented India at international conferences in China and Bangladesh'],
      hi: ['यूरोप, रूस, सीआईएस, स्कैंडिनेविया, अमेरिका, ब्रिटेन, आयरलैंड और इज़राइल सहित 43 देशों के लिए भारत पर्यटन कार्यालयों के निदेशक', 'कर्नाटक, केरल, तमिलनाडु, आंध्र प्रदेश, तेलंगाना, पुडुचेरी, लक्षद्वीप और पूर्वोत्तर राज्यों के क्षेत्रीय निदेशक', 'चेन्नई और बेंगलुरु के होटल प्रबंधन संस्थानों (भारत सरकार) के प्राचार्य', 'राजस्थान, उत्तर प्रदेश और बिहार में निदेशक – पर्यटन', 'स्पेन में UNWTO को संबोधित किया तथा चीन और बांग्लादेश के अंतरराष्ट्रीय सम्मेलनों में भारत का प्रतिनिधित्व किया'],
      mr: ['युरोप, रशिया, CIS, स्कँडिनेव्हिया, अमेरिका, ब्रिटन, आयर्लंड आणि इस्रायलसह 43 देशांसाठी भारत पर्यटन कार्यालयांचे संचालक', 'कर्नाटक, केरळ, तमिळनाडू, आंध्र प्रदेश, तेलंगणा, पुदुच्चेरी, लक्षद्वीप आणि ईशान्येकडील राज्यांचे प्रादेशिक संचालक', 'चेन्नई आणि बंगळुरू येथील हॉटेल व्यवस्थापन संस्थांचे (भारत सरकार) प्राचार्य', 'राजस्थान, उत्तर प्रदेश आणि बिहारमध्ये पर्यटन संचालक', 'स्पेनमध्ये UNWTO समोर भाषण केले आणि चीन व बांगलादेशातील आंतरराष्ट्रीय परिषदांमध्ये भारताचे प्रतिनिधित्व केले'],
      gu: ['યુરોપ, રશિયા, CIS, સ્કેન્ડિનેવિયા, અમેરિકા, બ્રિટન, આયર્લેન્ડ અને ઇઝરાયેલ સહિત 43 દેશો માટે ભારત પ્રવાસન કચેરીઓના નિયામક', 'કર્ણાટક, કેરળ, તમિલનાડુ, આંધ્ર પ્રદેશ, તેલંગાણા, પુડુચેરી, લક્ષદ્વીપ અને પૂર્વોત્તર રાજ્યોના પ્રાદેશિક નિયામક', 'ચેન્નઈ અને બેંગલુરુની હોટેલ મેનેજમેન્ટ સંસ્થાઓ (ભારત સરકાર)ના આચાર્ય', 'રાજસ્થાન, ઉત્તર પ્રદેશ અને બિહારમાં પ્રવાસન નિયામક', 'સ્પેનમાં UNWTOને સંબોધન કર્યું અને ચીન તથા બાંગ્લાદેશની આંતરરાષ્ટ્રીય પરિષદોમાં ભારતનું પ્રતિનિધિત્વ કર્યું'] } },
  { key: 'bharat', name: 'Bharat Singh Rajpurohit', hiName: 'भारत सिंह राजपुरोहित', guName: 'ભરત સિંહ રાજપુરોહિત', role: 'advisor', image: 'bharat',
    detail: { en: 'Dairy & Agri Consultant · President, AWARI', hi: 'डेयरी एवं कृषि सलाहकार · अध्यक्ष, AWARI', mr: 'दुग्ध आणि कृषी सल्लागार · अध्यक्ष, AWARI', gu: 'ડેરી અને કૃષિ સલાહકાર · પ્રમુખ, AWARI' },
    bio: {
      en: ['President of AWARI (Animal Welfare & Agricultural Research Institute), working on cow protection and promotion', 'Rajasthan in-charge for the Animal Welfare Board of India (AWBI), Govt. of India', 'Advisor to the Tharparkar Cow Conservation Centre, Jodhpur, and the Indo-Japan Dairy Project (H2 Milk Farm)', 'Incubator at MANAGE Hyderabad (Govt. of India); Director Investment Marketing, Global Confederation of Cow Based Industries', 'Author on cow-based organic farming, Panchgavya and cow-based rural development'],
      hi: ['AWARI (जीव जंतु कल्याण एवं कृषि शोध संस्थान) के अध्यक्ष, गौ संरक्षण एवं संवर्धन पर कार्यरत', 'भारतीय जीव जंतु कल्याण बोर्ड (AWBI), भारत सरकार के राजस्थान प्रभारी', 'थारपारकर गौ संरक्षण एवं संवर्धन केंद्र, जोधपुर तथा इंडो-जापान डेयरी प्रोजेक्ट (H2 मिल्क फ़ार्म) के सलाहकार', 'MANAGE हैदराबाद (भारत सरकार) में इन्क्यूबेटर; निदेशक निवेश मार्केटिंग, ग्लोबल कॉन्फेडरेशन ऑफ काऊ बेस्ड इंडस्ट्रीज़', 'गौ आधारित जैविक खेती, पंचगव्य और गौवंश आधारित ग्रामीण विकास पर लेखन'],
      mr: ['AWARI (प्राणी कल्याण आणि कृषी संशोधन संस्था) चे अध्यक्ष, गोसंरक्षण आणि संवर्धनासाठी कार्यरत', 'भारतीय जीवजंतू कल्याण मंडळ (AWBI), भारत सरकारचे राजस्थान प्रभारी', 'थारपारकर गो संवर्धन केंद्र, जोधपूर आणि इंडो-जपान डेअरी प्रकल्प (H2 मिल्क फार्म) चे सल्लागार', 'MANAGE हैदराबाद (भारत सरकार) येथे इन्क्युबेटर; संचालक गुंतवणूक विपणन, ग्लोबल कॉन्फेडरेशन ऑफ काऊ बेस्ड इंडस्ट्रीज', 'गो-आधारित सेंद्रिय शेती, पंचगव्य आणि गोवंश-आधारित ग्रामीण विकासावर लेखन'],
      gu: ['AWARI (પ્રાણી કલ્યાણ અને કૃષિ સંશોધન સંસ્થા)ના પ્રમુખ, ગૌ રક્ષણ અને સંવર્ધન માટે કાર્યરત', 'ભારતીય જીવ-જંતુ કલ્યાણ બોર્ડ (AWBI), ભારત સરકારના રાજસ્થાન પ્રભારી', 'થરપારકર ગૌ સંવર્ધન કેન્દ્ર, જોધપુર અને ઇન્ડો-જાપાન ડેરી પ્રોજેક્ટ (H2 મિલ્ક ફાર્મ)ના સલાહકાર', 'MANAGE હૈદરાબાદ (ભારત સરકાર)માં ઇન્ક્યુબેટર; ડિરેક્ટર ઇન્વેસ્ટમેન્ટ માર્કેટિંગ, ગ્લોબલ કોન્ફેડરેશન ઓફ કાઉ બેઝ્ડ ઇન્ડસ્ટ્રીઝ', 'ગૌ-આધારિત ઓર્ગેનિક ખેતી, પંચગવ્ય અને ગૌવંશ-આધારિત ગ્રામીણ વિકાસ પર લેખન'] } },
  { key: 'girish', name: 'Girish Chandra Baluni', hiName: 'गिरीश चंद्र बलूनी', guName: 'ગિરીશ ચંદ્ર બલૂની', role: 'advisor', image: 'girish',
    detail: { en: 'Advisor, National Council of State Agricultural Marketing Boards, New Delhi', hi: 'सलाहकार, राष्ट्रीय राज्य कृषि विपणन बोर्ड परिषद, नई दिल्ली', mr: 'सल्लागार, राष्ट्रीय राज्य कृषी पणन मंडळ परिषद, नवी दिल्ली', gu: 'સલાહકાર, રાષ્ટ્રીય રાજ્ય કૃષિ માર્કેટિંગ બોર્ડ પરિષદ, નવી દિલ્હી' },
    bio: {
      en: ['Member, Uttarakhand Organic Commodity Board, Govt. of Uttarakhand', 'Senior journalist and editor with several national Hindi news organisations', 'Director Operations, Brand Watch Communication Pvt. Ltd.; Advisor and coordinator to media and business institutes', 'Former member, Hindi Advisory Committee (Ministry of Labour & Employment) and Central Board of Film Certification'],
      hi: ['सदस्य, उत्तराखंड जैविक उत्पाद परिषद, उत्तराखंड सरकार', 'कई राष्ट्रीय हिंदी समाचार संस्थानों में वरिष्ठ पत्रकार एवं संपादक', 'निदेशक ऑपरेशंस, ब्रांड वॉच कम्युनिकेशन प्रा. लि.; मीडिया और बिज़नेस संस्थानों के सलाहकार व समन्वयक', 'पूर्व सदस्य, हिंदी सलाहकार समिति (श्रम एवं रोज़गार मंत्रालय) तथा केंद्रीय फिल्म प्रमाणन बोर्ड'],
      mr: ['सदस्य, उत्तराखंड सेंद्रिय उत्पादन परिषद, उत्तराखंड सरकार', 'अनेक राष्ट्रीय हिंदी वृत्तसंस्थांमध्ये ज्येष्ठ पत्रकार आणि संपादक', 'संचालक ऑपरेशन्स, ब्रँड वॉच कम्युनिकेशन प्रा. लि.; माध्यम आणि व्यवसाय संस्थांचे सल्लागार व समन्वयक', 'माजी सदस्य, हिंदी सल्लागार समिती (कामगार आणि रोजगार मंत्रालय) आणि केंद्रीय चित्रपट प्रमाणन मंडळ'],
      gu: ['સભ્ય, ઉત્તરાખંડ ઓર્ગેનિક કોમોડિટી બોર્ડ, ઉત્તરાખંડ સરકાર', 'અનેક રાષ્ટ્રીય હિન્દી સમાચાર સંસ્થાઓમાં વરિષ્ઠ પત્રકાર અને સંપાદક', 'ડિરેક્ટર ઓપરેશન્સ, બ્રાન્ડ વૉચ કમ્યુનિકેશન પ્રા. લિ.; મીડિયા અને બિઝનેસ સંસ્થાઓના સલાહકાર અને સંયોજક', 'પૂર્વ સભ્ય, હિન્દી સલાહકાર સમિતિ (શ્રમ અને રોજગાર મંત્રાલય) અને કેન્દ્રીય ફિલ્મ પ્રમાણન બોર્ડ'] } },
  { key: 'manish', name: 'Manish Bafna', hiName: 'मनीष बाफना', guName: 'મનીષ બાફના', role: 'advisor', image: 'manish',
    detail: { en: 'Solar Energy Professional & Project Developer · Greenfield Solutions | Vikas Solar Solutions | Solar House', hi: 'सोलर एनर्जी प्रोफेशनल एवं प्रोजेक्ट डेवलपर · ग्रीनफील्ड सॉल्यूशंस | विकास सोलर सॉल्यूशंस | सोलर हाउस', mr: 'सौर ऊर्जा व्यावसायिक आणि प्रकल्प विकासक · ग्रीनफिल्ड सोल्युशन्स | विकास सोलर सोल्युशन्स | सोलर हाऊस', gu: 'સૌર ઊર્જા વ્યાવસાયિક અને પ્રોજેક્ટ ડેવલપર · ગ્રીનફિલ્ડ સોલ્યુશન્સ | વિકાસ સોલર સોલ્યુશન્સ | સોલર હાઉસ' },
    bio: {
      en: ['Over 7 years of experience in the solar energy sector', 'Development and execution of MW-scale solar power projects; Solar EPC, installation, commissioning and O&M', 'Land identification support and supply of major solar plant components', 'Industrial, commercial, residential and utility-scale projects; across Rajasthan and Pan India through partner networks'],
      hi: ['सोलर ऊर्जा क्षेत्र में 7 वर्ष से अधिक का अनुभव', 'मेगावाट-स्तर की सोलर परियोजनाओं का विकास और क्रियान्वयन; सोलर EPC, इंस्टॉलेशन, कमीशनिंग और O&M', 'भूमि चिन्हांकन में सहयोग तथा प्रमुख सोलर उपकरणों की आपूर्ति', 'औद्योगिक, व्यावसायिक, आवासीय और यूटिलिटी-स्तर की परियोजनाएँ; पूरे राजस्थान में और साझेदार नेटवर्क से पैन इंडिया'],
      mr: ['सौर ऊर्जा क्षेत्रात 7 वर्षांहून अधिक अनुभव', 'मेगावॅट क्षमतेच्या सौर प्रकल्पांचा विकास आणि अंमलबजावणी; सोलर EPC, उभारणी, कार्यान्वयन आणि O&M', 'जमीन निवडीत सहाय्य आणि प्रमुख सौर प्रकल्प घटकांचा पुरवठा', 'औद्योगिक, व्यावसायिक, निवासी आणि युटिलिटी-स्तरावरील प्रकल्प; संपूर्ण राजस्थानात आणि भागीदार नेटवर्कद्वारे देशभरात'],
      gu: ['સૌર ઊર્જા ક્ષેત્રમાં 7 વર્ષથી વધુનો અનુભવ', 'મેગાવોટ ક્ષમતાના સોલર પ્રોજેક્ટ્સનો વિકાસ અને અમલ; સોલર EPC, ઇન્સ્ટોલેશન, કમિશનિંગ અને O&M', 'જમીન પસંદગીમાં સહાય અને મુખ્ય સોલર પ્લાન્ટ ઘટકોનો પુરવઠો', 'ઔદ્યોગિક, વ્યાપારી, રહેણાંક અને યુટિલિટી-સ્તરના પ્રોજેક્ટ્સ; સમગ્ર રાજસ્થાનમાં અને ભાગીદાર નેટવર્ક દ્વારા સમગ્ર ભારતમાં'] } },
];

// ADD LEADERSHIP MESSAGES HERE. Paste the approved text between the quotes, one entry per person.
// Use \n\n between paragraphs. If a person has a message in either language, they move into the
// "Leadership Messages" section automatically. If the Hindi one is empty, the English text is shown.
const messages = {
  en: {
    chairperson: `Dear Stakeholders,
It gives me immense pleasure to introduce FPC Bazar Federation, an organization committed to transforming the agricultural landscape of our nation. Agriculture is not just a profession; it is the backbone of our economy and a way of life for millions. At FPC Bazar Federation, we are driven by the belief that empowering farmers is key to building a prosperous and sustainable future.

As we look ahead, our vision is clear: to be a trusted partner in every farmer's journey towards growth and success. I invite you to join hands with us in this mission and be a part of this transformative journey. Thank you for your trust and support.`,
    naveen: `Dear Farmers, Partners, and Stakeholders,
It is a great honor for me to address you as the Managing Director of FPC Bazzar Federation, an organization founded with a clear purpose — to uplift rural India through sustainable agriculture, innovative technologies, and economic empowerment.

Our federation is committed to advancing sectors that are the lifeline of our country: agriculture, dairy development, net house and poly house farming, market linkage solutions, and the preservation and promotion of Gausahala-based products. With a blend of traditional wisdom and modern practices, we are working to build a strong, self-reliant, and future-ready rural ecosystem.

Our vision is to create a model of development where farmers are empowered, natural resources are respected, and communities are economically and socially strengthened. Our mission is to act as a bridge between rural potential and national progress—by enabling growth, ensuring fair market access, and promoting environmentally responsible practices.`,
    sourabh: `I serve as the Chief Finance Officer of FPC Bazzar Federation, an organization that is reshaping the future of rural India through innovation, sustainability, and community empowerment in agriculture and allied sectors.

Our federation is engaged in impactful areas such as agriculture, dairy development, government-supported infrastructure, net house and poly house projects, and the promotion of Gausahala-based eco-products. Behind every project and initiative lies a strong foundation of financial planning, risk management, and transparent resource allocation.`,
    ashok: `As the Director – Farming Products at FPC Bazzar Federation, I take immense pride in leading a segment that directly contributes to the backbone of our rural economy—agriculture and farm-based innovation. Our goal is not just to offer farming products, but to deliver solutions that empower, technologies that enable, and support that sustains farmer livelihoods across the country.

We are focused on ensuring the availability of high-quality, eco-friendly, and cost-effective inputs ranging from fertilizers, seeds, drip irrigation systems, net houses, poly houses, to organic soil enhancers and Gausahala-based products like bio-pesticides and compost. These offerings are tailored to meet the specific needs of our diverse farming communities while promoting sustainability and soil health.`,
    narendra: `Dear Stakeholders and Valued Partners,
It is an honor to serve as the Director – Finance at FPC Bazzar Federation, an organization devoted to the holistic development of rural India through agriculture, dairy, and sustainable farming practices. Our financial vision is grounded in transparency, accountability, and strategic planning to support impactful projects across sectors like net house and poly house infrastructure, government-sponsored schemes, and Gausahala-based product development.`,
    shyam: `Dear Partners, Stakeholders, and Community Members,
It is a privilege to serve as the Administration Director of FPC Bazzar Federation, an organization that stands at the forefront of rural transformation. Our federation’s commitment to excellence, transparency, and social responsibility forms the bedrock of every project we undertake—be it in agriculture, dairy development, government collaborations, or the promotion of indigenous Gausahala products.

In administration, our focus remains on ensuring seamless coordination across all departments, compliance with government regulations, and efficient execution of our initiatives. We strive to create systems that are not only accountable but also responsive to the real needs of the farmers and communities we serve.`,
    mittal: `Value Chain Expert & Business Development Strategist

About Me:
As a dedicated professional with experience in agriculture and value chain development, I help FPC Bazaar members strengthen backward and forward linkages. My expertise lies in analyzing complex systems, identifying opportunities, and developing strategic partnerships to drive growth and improve livelihoods.
- Develop strategic partnerships with buyers, suppliers, and other stakeholders
- Improve the overall competitiveness of your FPC Bazaar`,
    nilesh: `Dear Partners and Stakeholders,
At FPC Bazar Federation, our marketing efforts are driven by a commitment to bridge the gap between rural producers and urban markets. By leveraging innovative strategies and robust market linkages, we empower farmers and entrepreneurs to achieve greater visibility and profitability for their products.`,
    rajendra: `It is an honor to lead the project implementation efforts for an organization that is deeply rooted in rural empowerment and agricultural innovation. Our commitment extends across various sectors—agriculture, dairy development, government projects, net house and poly house solutions, market linkage, and Gaushala-based sustainable product initiatives. I sincerely invite all stakeholders to collaborate with us, contribute insights, and be part of this transformative journey. Together, we can strengthen the backbone of India—its villages and its farmers.`,
  },
  hi: {
    chairperson: `प्रिय हितधारकों,
एफपीसी बाज़ार फेडरेशन का परिचय देते हुए मुझे अत्यंत प्रसन्नता हो रही है, जो हमारे देश के कृषि परिदृश्य को बदलने के लिए प्रतिबद्ध संगठन है। कृषि केवल एक पेशा नहीं है; यह हमारी अर्थव्यवस्था की रीढ़ और करोड़ों लोगों के जीवन जीने का तरीका है। एफपीसी बाज़ार फेडरेशन में हम इस विश्वास से प्रेरित हैं कि किसानों को सशक्त बनाना एक समृद्ध और टिकाऊ भविष्य के निर्माण की कुंजी है।

आगे देखते हुए हमारी दृष्टि स्पष्ट है: हर किसान की विकास और सफलता की यात्रा में एक भरोसेमंद साझेदार बनना। मैं आपको इस मिशन में हमारे साथ हाथ मिलाने और इस परिवर्तनकारी यात्रा का हिस्सा बनने के लिए आमंत्रित करता हूँ। आपके विश्वास और सहयोग के लिए धन्यवाद।`,
    naveen: `प्रिय किसान, साझेदार और हितधारकगण,
एफपीसी बाज़ार फेडरेशन के प्रबंध निदेशक के रूप में आपसे संवाद करना मेरे लिए बड़े सम्मान की बात है। यह संगठन एक स्पष्ट उद्देश्य के साथ स्थापित हुआ है: टिकाऊ कृषि, नवीन तकनीकों और आर्थिक सशक्तिकरण के माध्यम से ग्रामीण भारत का उत्थान करना।

हमारा महासंघ उन क्षेत्रों को आगे बढ़ाने के लिए प्रतिबद्ध है जो हमारे देश की जीवनरेखा हैं: कृषि, डेयरी विकास, नेट हाउस और पॉली हाउस खेती, बाज़ार संपर्क समाधान, और गौशाला आधारित उत्पादों का संरक्षण और संवर्धन। पारंपरिक ज्ञान और आधुनिक पद्धतियों के मेल से हम एक मज़बूत, आत्मनिर्भर और भविष्य के लिए तैयार ग्रामीण पारिस्थितिकी तंत्र बनाने के लिए काम कर रहे हैं।

हमारी दृष्टि विकास का ऐसा मॉडल बनाना है जहाँ किसान सशक्त हों, प्राकृतिक संसाधनों का सम्मान हो, और समुदाय आर्थिक व सामाजिक रूप से मज़बूत हों। हमारा मिशन ग्रामीण क्षमता और राष्ट्रीय प्रगति के बीच सेतु बनना है, विकास को संभव बनाकर, उचित बाज़ार पहुँच सुनिश्चित करके और पर्यावरण के प्रति ज़िम्मेदार पद्धतियों को बढ़ावा देकर।`,
    sourabh: `मैं एफपीसी बाज़ार फेडरेशन का मुख्य वित्त अधिकारी हूँ, एक ऐसा संगठन जो नवाचार, स्थिरता और कृषि व संबद्ध क्षेत्रों में सामुदायिक सशक्तिकरण के माध्यम से ग्रामीण भारत का भविष्य नए सिरे से गढ़ रहा है।

हमारा महासंघ कई प्रभावशाली क्षेत्रों में सक्रिय है, जैसे कृषि, डेयरी विकास, सरकार-समर्थित बुनियादी ढाँचा, नेट हाउस और पॉली हाउस परियोजनाएँ, और गौशाला आधारित इको-उत्पादों का संवर्धन। हर परियोजना और पहल के पीछे वित्तीय योजना, जोखिम प्रबंधन और पारदर्शी संसाधन आवंटन की मज़बूत नींव है।`,
    ashok: `एफपीसी बाज़ार फेडरेशन में निदेशक – कृषि उत्पाद के रूप में, मुझे ऐसे विभाग का नेतृत्व करने पर गर्व है जो सीधे हमारी ग्रामीण अर्थव्यवस्था की रीढ़ यानी कृषि और खेती-आधारित नवाचार में योगदान देता है। हमारा लक्ष्य केवल खेती के उत्पाद उपलब्ध कराना नहीं है, बल्कि ऐसे समाधान देना है जो सशक्त करें, ऐसी तकनीकें जो सक्षम बनाएँ, और ऐसा सहयोग जो देशभर में किसानों की आजीविका को बनाए रखे।

हम उच्च गुणवत्ता वाले, पर्यावरण-अनुकूल और किफ़ायती इनपुट की उपलब्धता सुनिश्चित करने पर ध्यान दे रहे हैं, जिनमें उर्वरक, बीज, ड्रिप सिंचाई प्रणालियाँ, नेट हाउस और पॉली हाउस से लेकर जैविक मृदा सुधारक और जैव-कीटनाशक व कम्पोस्ट जैसे गौशाला आधारित उत्पाद शामिल हैं। ये सभी हमारे विविध किसान समुदायों की विशेष ज़रूरतों के अनुसार तैयार किए गए हैं, और साथ ही टिकाऊपन और मृदा स्वास्थ्य को बढ़ावा देते हैं।`,
    narendra: `प्रिय हितधारकों और सम्मानित साझेदारों,
एफपीसी बाज़ार फेडरेशन में निदेशक – वित्त के रूप में सेवा करना मेरे लिए सम्मान की बात है, यह संगठन कृषि, डेयरी और टिकाऊ खेती पद्धतियों के माध्यम से ग्रामीण भारत के समग्र विकास के लिए समर्पित है। हमारी वित्तीय दृष्टि पारदर्शिता, जवाबदेही और रणनीतिक योजना पर आधारित है, ताकि नेट हाउस और पॉली हाउस ढाँचे, सरकार-प्रायोजित योजनाओं और गौशाला आधारित उत्पाद विकास जैसे क्षेत्रों में प्रभावशाली परियोजनाओं को सहयोग दिया जा सके।`,
    shyam: `प्रिय साझेदारों, हितधारकों और समुदाय के सदस्यों,
एफपीसी बाज़ार फेडरेशन के प्रशासन निदेशक के रूप में सेवा करना मेरे लिए सौभाग्य की बात है, यह संगठन ग्रामीण परिवर्तन में अग्रणी है। उत्कृष्टता, पारदर्शिता और सामाजिक उत्तरदायित्व के प्रति हमारे महासंघ की प्रतिबद्धता हमारी हर परियोजना की नींव है, चाहे वह कृषि हो, डेयरी विकास, सरकारी सहयोग, या देशी गौशाला उत्पादों का संवर्धन।

प्रशासन में हमारा ध्यान सभी विभागों के बीच सहज समन्वय, सरकारी नियमों के अनुपालन और हमारी पहलों के कुशल क्रियान्वयन पर रहता है। हम ऐसी व्यवस्थाएँ बनाने का प्रयास करते हैं जो न केवल जवाबदेह हों, बल्कि उन किसानों और समुदायों की वास्तविक ज़रूरतों के प्रति संवेदनशील भी हों जिनकी हम सेवा करते हैं।`,
    mittal: `मूल्य श्रृंखला विशेषज्ञ और व्यवसाय विकास रणनीतिकार

मेरे बारे में:
कृषि और मूल्य श्रृंखला विकास में अनुभव रखने वाली एक समर्पित पेशेवर के रूप में, मैं एफपीसी बाज़ार के सदस्यों को पश्चगामी और अग्रगामी संबंध मज़बूत करने में मदद करती हूँ। मेरी विशेषज्ञता जटिल प्रणालियों का विश्लेषण करने, अवसरों की पहचान करने और विकास को गति देने तथा आजीविका सुधारने के लिए रणनीतिक साझेदारियाँ विकसित करने में है।
- खरीदारों, आपूर्तिकर्ताओं और अन्य हितधारकों के साथ रणनीतिक साझेदारियाँ विकसित करना
- आपके एफपीसी बाज़ार की समग्र प्रतिस्पर्धात्मकता बढ़ाना`,
    nilesh: `प्रिय साझेदारों और हितधारकों,
एफपीसी बाज़ार फेडरेशन में हमारे मार्केटिंग प्रयास ग्रामीण उत्पादकों और शहरी बाज़ारों के बीच की दूरी पाटने की प्रतिबद्धता से संचालित हैं। नवीन रणनीतियों और मज़बूत बाज़ार संपर्कों का उपयोग करके हम किसानों और उद्यमियों को उनके उत्पादों के लिए अधिक दृश्यता और लाभप्रदता पाने में सशक्त बनाते हैं।`,
    rajendra: `एक ऐसे संगठन के लिए परियोजना क्रियान्वयन प्रयासों का नेतृत्व करना मेरे लिए सम्मान की बात है, जो ग्रामीण सशक्तिकरण और कृषि नवाचार में गहराई से रचा-बसा है। हमारी प्रतिबद्धता कई क्षेत्रों में फैली है: कृषि, डेयरी विकास, सरकारी परियोजनाएँ, नेट हाउस और पॉली हाउस समाधान, बाज़ार संपर्क, और गौशाला आधारित टिकाऊ उत्पाद पहल। मैं सभी हितधारकों को हमारे साथ सहयोग करने, अपने सुझाव देने और इस परिवर्तनकारी यात्रा का हिस्सा बनने के लिए हार्दिक आमंत्रित करता हूँ। साथ मिलकर हम भारत की रीढ़, यानी उसके गाँवों और किसानों को मज़बूत कर सकते हैं।`,
  },
  mr: {
    chairperson: `प्रिय हितधारकांनो,
आपल्या देशाच्या कृषी क्षेत्रात परिवर्तन घडवण्यासाठी कटिबद्ध असलेल्या एफपीसी बाजार फेडरेशनची ओळख करून देताना मला अतिशय आनंद होत आहे. शेती हा केवळ व्यवसाय नाही; ती आपल्या अर्थव्यवस्थेचा कणा आणि लाखो लोकांची जीवनपद्धती आहे. शेतकऱ्यांना सक्षम करणे हीच समृद्ध आणि शाश्वत भविष्याची गुरुकिल्ली आहे, या विश्वासाने एफपीसी बाजार फेडरेशन काम करते.

पुढे पाहताना आमचा दृष्टिकोन स्पष्ट आहे: प्रत्येक शेतकऱ्याच्या प्रगती आणि यशाच्या प्रवासात विश्वासार्ह भागीदार बनणे. या ध्येयात आमच्यासोबत हातमिळवणी करून या परिवर्तनाच्या प्रवासाचा भाग होण्याचे मी तुम्हाला आमंत्रण देतो. तुमच्या विश्वास आणि पाठिंब्याबद्दल धन्यवाद.`,
    naveen: `प्रिय शेतकरी, भागीदार आणि हितधारकांनो,
एफपीसी बाजार फेडरेशनचा व्यवस्थापकीय संचालक म्हणून तुमच्याशी संवाद साधणे हा माझ्यासाठी मोठा सन्मान आहे. शाश्वत शेती, नावीन्यपूर्ण तंत्रज्ञान आणि आर्थिक सक्षमीकरणाद्वारे ग्रामीण भारताचा उत्कर्ष, या स्पष्ट उद्देशाने ही संस्था स्थापन झाली आहे.

आपल्या देशाची जीवनरेखा असलेल्या क्षेत्रांना पुढे नेण्यासाठी आमचा महासंघ कटिबद्ध आहे: शेती, दुग्ध विकास, नेट हाऊस आणि पॉलीहाऊस शेती, बाजार जोडणीचे उपाय, तसेच गोशाळा-आधारित उत्पादनांचे जतन आणि प्रसार. पारंपरिक शहाणपण आणि आधुनिक पद्धती यांचा मेळ घालून आम्ही एक मजबूत, आत्मनिर्भर आणि भविष्यासाठी सज्ज ग्रामीण परिसंस्था उभारत आहोत.

शेतकरी सक्षम असतील, नैसर्गिक संसाधनांचा आदर होईल आणि समुदाय आर्थिक व सामाजिकदृष्ट्या बळकट होतील, असे विकासाचे मॉडेल तयार करणे हा आमचा दृष्टिकोन आहे. वाढीला चालना देऊन, बाजारपेठेत योग्य प्रवेश मिळवून देऊन आणि पर्यावरणपूरक पद्धतींना प्रोत्साहन देऊन ग्रामीण क्षमता आणि राष्ट्रीय प्रगती यांच्यातील दुवा बनणे, हे आमचे ध्येय आहे.`,
    sourabh: `मी एफपीसी बाजार फेडरेशनचा मुख्य वित्त अधिकारी म्हणून काम करतो. कृषी आणि संलग्न क्षेत्रांतील नावीन्य, शाश्वतता आणि सामुदायिक सक्षमीकरणाद्वारे ही संस्था ग्रामीण भारताचे भविष्य घडवत आहे.

आमचा महासंघ शेती, दुग्ध विकास, सरकारी सहाय्यित पायाभूत सुविधा, नेट हाऊस आणि पॉलीहाऊस प्रकल्प आणि गोशाळा-आधारित पर्यावरणपूरक उत्पादनांचा प्रसार अशा प्रभावी क्षेत्रांमध्ये कार्यरत आहे. प्रत्येक प्रकल्प आणि उपक्रमामागे आर्थिक नियोजन, जोखीम व्यवस्थापन आणि संसाधनांच्या पारदर्शक वाटपाचा भक्कम पाया असतो.`,
    ashok: `एफपीसी बाजार फेडरेशनमध्ये संचालक – शेती उत्पादने म्हणून, आपल्या ग्रामीण अर्थव्यवस्थेचा कणा असलेल्या शेती आणि शेतीतील नावीन्याला थेट हातभार लावणाऱ्या विभागाचे नेतृत्व करताना मला मोठा अभिमान वाटतो. आमचे उद्दिष्ट केवळ शेती उत्पादने देणे नाही, तर देशभरातील शेतकऱ्यांच्या उपजीविकेला सक्षम करणारे उपाय, उपयुक्त तंत्रज्ञान आणि टिकाऊ पाठबळ देणे हे आहे.

खते, बियाणे, ठिबक सिंचन प्रणाली, नेट हाऊस, पॉलीहाऊस, सेंद्रिय माती सुधारक, तसेच जैविक कीटकनाशके आणि कंपोस्ट यांसारखी गोशाळा-आधारित उत्पादने, अशा दर्जेदार, पर्यावरणपूरक आणि किफायतशीर निविष्ठा उपलब्ध करून देण्यावर आमचा भर आहे. शाश्वतता आणि मातीच्या आरोग्याला चालना देत, आपल्या विविध शेतकरी समुदायांच्या विशिष्ट गरजांनुसार ही उत्पादने तयार केली जातात.`,
    narendra: `प्रिय हितधारक आणि सन्माननीय भागीदारांनो,
शेती, डेअरी आणि शाश्वत शेती पद्धतींद्वारे ग्रामीण भारताच्या सर्वांगीण विकासासाठी समर्पित असलेल्या एफपीसी बाजार फेडरेशनमध्ये संचालक – वित्त म्हणून काम करणे हा माझा सन्मान आहे. नेट हाऊस आणि पॉलीहाऊस पायाभूत सुविधा, सरकारी योजना आणि गोशाळा-आधारित उत्पादन विकास अशा क्षेत्रांतील प्रभावी प्रकल्पांना पाठबळ देण्यासाठी आमचा आर्थिक दृष्टिकोन पारदर्शकता, उत्तरदायित्व आणि धोरणात्मक नियोजनावर आधारित आहे.`,
    shyam: `प्रिय भागीदार, हितधारक आणि समुदायातील सदस्यांनो,
ग्रामीण परिवर्तनात आघाडीवर असलेल्या एफपीसी बाजार फेडरेशनचा प्रशासन संचालक म्हणून काम करणे हा माझा बहुमान आहे. उत्कृष्टता, पारदर्शकता आणि सामाजिक जबाबदारी यांप्रती महासंघाची बांधिलकी हा आम्ही हाती घेतलेल्या प्रत्येक प्रकल्पाचा पाया आहे, मग तो शेती, दुग्ध विकास, सरकारी सहयोग किंवा देशी गोशाळा उत्पादनांच्या प्रसाराचा असो.

प्रशासनात सर्व विभागांमध्ये सुरळीत समन्वय, सरकारी नियमांचे पालन आणि आमच्या उपक्रमांची कार्यक्षम अंमलबजावणी यावर आमचा भर असतो. केवळ उत्तरदायीच नव्हे, तर आम्ही ज्या शेतकरी आणि समुदायांसाठी काम करतो त्यांच्या खऱ्या गरजांना प्रतिसाद देणाऱ्या व्यवस्था उभारण्याचा आमचा प्रयत्न असतो.`,
    mittal: `मूल्यसाखळी तज्ज्ञ आणि व्यवसाय विकास रणनीतिकार

माझ्याबद्दल:
शेती आणि मूल्यसाखळी विकासाचा अनुभव असलेला समर्पित व्यावसायिक म्हणून मी एफपीसी बाजारच्या सदस्यांना मागील आणि पुढील जोडण्या मजबूत करण्यास मदत करतो. गुंतागुंतीच्या व्यवस्थांचे विश्लेषण करणे, संधी ओळखणे आणि वाढीसाठी व उपजीविका सुधारण्यासाठी धोरणात्मक भागीदारी उभारणे, हे माझे कौशल्य आहे.
- खरेदीदार, पुरवठादार आणि इतर हितधारकांसोबत धोरणात्मक भागीदारी उभारणे
- तुमच्या एफपीसी बाजारची एकूण स्पर्धात्मकता सुधारणे`,
    nilesh: `प्रिय भागीदार आणि हितधारकांनो,
एफपीसी बाजार फेडरेशनमध्ये ग्रामीण उत्पादक आणि शहरी बाजारपेठ यांच्यातील अंतर कमी करण्याच्या बांधिलकीने आमचे विपणन प्रयत्न चालतात. नावीन्यपूर्ण रणनीती आणि भक्कम बाजार जोडणीचा वापर करून आम्ही शेतकरी आणि उद्योजकांना त्यांच्या उत्पादनांसाठी अधिक ओळख आणि नफा मिळवण्यास सक्षम करतो.`,
    rajendra: `ग्रामीण सक्षमीकरण आणि कृषी नावीन्याशी खोलवर जोडलेल्या संस्थेच्या प्रकल्प अंमलबजावणीचे नेतृत्व करणे हा माझा सन्मान आहे. आमची बांधिलकी शेती, दुग्ध विकास, सरकारी प्रकल्प, नेट हाऊस आणि पॉलीहाऊस उपाय, बाजार जोडणी आणि गोशाळा-आधारित शाश्वत उत्पादन उपक्रम अशा विविध क्षेत्रांमध्ये आहे. सर्व हितधारकांनी आमच्यासोबत काम करावे, आपले विचार द्यावेत आणि या परिवर्तनाच्या प्रवासाचा भाग व्हावे, असे मी मनापासून आमंत्रण देतो. एकत्र येऊन आपण भारताचा कणा असलेली गावे आणि शेतकरी अधिक बळकट करू शकतो.`,
  },
  gu: {
    chairperson: `પ્રિય હિતધારકો,
આપણા દેશના કૃષિ ક્ષેત્રમાં પરિવર્તન લાવવા પ્રતિબદ્ધ સંસ્થા એફપીસી બજાર ફેડરેશનનો પરિચય આપતાં મને અત્યંત આનંદ થાય છે. ખેતી માત્ર વ્યવસાય નથી; તે આપણા અર્થતંત્રની કરોડરજ્જુ અને લાખો લોકોની જીવનશૈલી છે. ખેડૂતોને સશક્ત બનાવવા એ જ સમૃદ્ધ અને ટકાઉ ભવિષ્યની ચાવી છે, એ વિશ્વાસ સાથે એફપીસી બજાર ફેડરેશન કામ કરે છે.

આગળ જોતાં અમારું વિઝન સ્પષ્ટ છે: દરેક ખેડૂતની પ્રગતિ અને સફળતાની યાત્રામાં વિશ્વસનીય ભાગીદાર બનવું. આ મિશનમાં અમારી સાથે જોડાઈને આ પરિવર્તનની યાત્રાનો ભાગ બનવા હું તમને આમંત્રણ આપું છું. તમારા વિશ્વાસ અને સહકાર બદલ આભાર.`,
    naveen: `પ્રિય ખેડૂતો, ભાગીદારો અને હિતધારકો,
એફપીસી બજાર ફેડરેશનના મેનેજિંગ ડિરેક્ટર તરીકે તમને સંબોધવું મારા માટે મોટું સન્માન છે. ટકાઉ ખેતી, નવીન ટેકનોલોજી અને આર્થિક સશક્તિકરણ દ્વારા ગ્રામીણ ભારતના ઉત્થાનના સ્પષ્ટ હેતુ સાથે આ સંસ્થાની સ્થાપના થઈ છે.

આપણા દેશની જીવાદોરી સમાં ક્ષેત્રોને આગળ વધારવા અમારો મહાસંઘ પ્રતિબદ્ધ છે: ખેતી, ડેરી વિકાસ, નેટ હાઉસ અને પોલીહાઉસ ખેતી, બજાર જોડાણના ઉકેલો, તેમજ ગૌશાળા-આધારિત ઉત્પાદનોનું જતન અને પ્રચાર. પરંપરાગત જ્ઞાન અને આધુનિક પદ્ધતિઓના સમન્વયથી અમે મજબૂત, આત્મનિર્ભર અને ભવિષ્ય માટે તૈયાર ગ્રામીણ ઇકોસિસ્ટમ બનાવી રહ્યા છીએ.

ખેડૂતો સશક્ત હોય, કુદરતી સંસાધનોનો આદર થાય અને સમુદાયો આર્થિક તથા સામાજિક રીતે મજબૂત બને, એવું વિકાસનું મોડેલ બનાવવું એ અમારું વિઝન છે. વૃદ્ધિને વેગ આપીને, બજારમાં યોગ્ય પ્રવેશ અપાવીને અને પર્યાવરણ-જવાબદાર પદ્ધતિઓને પ્રોત્સાહન આપીને ગ્રામીણ ક્ષમતા અને રાષ્ટ્રીય પ્રગતિ વચ્ચે સેતુ બનવું એ અમારું ધ્યેય છે.`,
    sourabh: `હું એફપીસી બજાર ફેડરેશનના મુખ્ય નાણાકીય અધિકારી તરીકે કામ કરું છું. કૃષિ અને સંલગ્ન ક્ષેત્રોમાં નવીનતા, ટકાઉપણું અને સામુદાયિક સશક્તિકરણ દ્વારા આ સંસ્થા ગ્રામીણ ભારતનું ભવિષ્ય ઘડી રહી છે.

અમારો મહાસંઘ ખેતી, ડેરી વિકાસ, સરકાર સમર્થિત માળખાકીય સુવિધાઓ, નેટ હાઉસ અને પોલીહાઉસ પ્રોજેક્ટ્સ અને ગૌશાળા-આધારિત પર્યાવરણમૈત્રી ઉત્પાદનોના પ્રચાર જેવાં અસરકારક ક્ષેત્રોમાં કાર્યરત છે. દરેક પ્રોજેક્ટ અને પહેલની પાછળ નાણાકીય આયોજન, જોખમ વ્યવસ્થાપન અને સંસાધનોની પારદર્શક ફાળવણીનો મજબૂત પાયો છે.`,
    ashok: `એફપીસી બજાર ફેડરેશનમાં ડિરેક્ટર – ખેત ઉત્પાદનો તરીકે, આપણા ગ્રામીણ અર્થતંત્રની કરોડરજ્જુ સમાન ખેતી અને ખેતી આધારિત નવીનતામાં સીધો ફાળો આપતા વિભાગનું નેતૃત્વ કરવાનો મને ગર્વ છે. અમારો હેતુ માત્ર ખેત ઉત્પાદનો આપવાનો નથી, પરંતુ દેશભરના ખેડૂતોની આજીવિકાને સશક્ત બનાવતા ઉકેલો, ઉપયોગી ટેકનોલોજી અને ટકાઉ સહાય આપવાનો છે.

ખાતર, બિયારણ, ટપક સિંચાઈ પ્રણાલી, નેટ હાઉસ, પોલીહાઉસ, ઓર્ગેનિક જમીન સુધારક, તેમજ જૈવિક જંતુનાશક અને કમ્પોસ્ટ જેવાં ગૌશાળા-આધારિત ઉત્પાદનો સુધીના ઉચ્ચ ગુણવત્તાવાળા, પર્યાવરણમૈત્રી અને કિફાયતી ઇનપુટ ઉપલબ્ધ કરાવવા પર અમારું ધ્યાન છે. ટકાઉપણું અને જમીનના સ્વાસ્થ્યને પ્રોત્સાહન આપતાં, આપણા વૈવિધ્યસભર ખેડૂત સમુદાયોની ચોક્કસ જરૂરિયાતો મુજબ આ ઉત્પાદનો તૈયાર કરાય છે.`,
    narendra: `પ્રિય હિતધારકો અને આદરણીય ભાગીદારો,
ખેતી, ડેરી અને ટકાઉ ખેતી પદ્ધતિઓ દ્વારા ગ્રામીણ ભારતના સર્વાંગી વિકાસ માટે સમર્પિત એફપીસી બજાર ફેડરેશનમાં ડિરેક્ટર – નાણાં તરીકે સેવા આપવી મારા માટે સન્માનની વાત છે. નેટ હાઉસ અને પોલીહાઉસ માળખું, સરકારી યોજનાઓ અને ગૌશાળા-આધારિત ઉત્પાદન વિકાસ જેવાં ક્ષેત્રોના અસરકારક પ્રોજેક્ટ્સને ટેકો આપવા અમારું નાણાકીય વિઝન પારદર્શિતા, જવાબદારી અને વ્યૂહાત્મક આયોજન પર આધારિત છે.`,
    shyam: `પ્રિય ભાગીદારો, હિતધારકો અને સમુદાયના સભ્યો,
ગ્રામીણ પરિવર્તનમાં મોખરે રહેલા એફપીસી બજાર ફેડરેશનના વહીવટી ડિરેક્ટર તરીકે સેવા આપવી મારા માટે ગૌરવની વાત છે. શ્રેષ્ઠતા, પારદર્શિતા અને સામાજિક જવાબદારી પ્રત્યે મહાસંઘની પ્રતિબદ્ધતા અમારા દરેક પ્રોજેક્ટનો પાયો છે, પછી તે ખેતી, ડેરી વિકાસ, સરકારી સહયોગ કે દેશી ગૌશાળા ઉત્પાદનોના પ્રચારનો હોય.

વહીવટમાં બધા વિભાગો વચ્ચે સરળ સંકલન, સરકારી નિયમોનું પાલન અને અમારી પહેલનો કાર્યક્ષમ અમલ સુનિશ્ચિત કરવા પર અમારું ધ્યાન રહે છે. માત્ર જવાબદાર જ નહીં, પરંતુ અમે જે ખેડૂતો અને સમુદાયોની સેવા કરીએ છીએ તેમની સાચી જરૂરિયાતોને પ્રતિસાદ આપતી વ્યવસ્થાઓ બનાવવાનો અમારો પ્રયાસ છે.`,
    mittal: `મૂલ્ય શૃંખલા નિષ્ણાત અને બિઝનેસ ડેવલપમેન્ટ વ્યૂહરચનાકાર

મારા વિશે:
ખેતી અને મૂલ્ય શૃંખલા વિકાસનો અનુભવ ધરાવતા સમર્પિત વ્યાવસાયિક તરીકે હું એફપીસી બજારના સભ્યોને પાછળ અને આગળનાં જોડાણો મજબૂત કરવામાં મદદ કરું છું. જટિલ વ્યવસ્થાઓનું વિશ્લેષણ, તકો ઓળખવી અને વૃદ્ધિ તથા આજીવિકા સુધારવા વ્યૂહાત્મક ભાગીદારીઓ વિકસાવવી, એ મારી નિપુણતા છે.
- ખરીદદારો, સપ્લાયર્સ અને અન્ય હિતધારકો સાથે વ્યૂહાત્મક ભાગીદારીઓ વિકસાવવી
- તમારા એફપીસી બજારની એકંદર સ્પર્ધાત્મકતા સુધારવી`,
    nilesh: `પ્રિય ભાગીદારો અને હિતધારકો,
એફપીસી બજાર ફેડરેશનમાં ગ્રામીણ ઉત્પાદકો અને શહેરી બજારો વચ્ચેનું અંતર ઘટાડવાની પ્રતિબદ્ધતા સાથે અમારા માર્કેટિંગ પ્રયાસો ચાલે છે. નવીન વ્યૂહરચનાઓ અને મજબૂત બજાર જોડાણનો ઉપયોગ કરીને અમે ખેડૂતો અને ઉદ્યોગસાહસિકોને તેમનાં ઉત્પાદનો માટે વધુ ઓળખ અને નફો મેળવવા સક્ષમ બનાવીએ છીએ.`,
    rajendra: `ગ્રામીણ સશક્તિકરણ અને કૃષિ નવીનતામાં ઊંડે સુધી જોડાયેલી સંસ્થાના પ્રોજેક્ટ અમલીકરણનું નેતૃત્વ કરવું મારા માટે સન્માનની વાત છે. અમારી પ્રતિબદ્ધતા ખેતી, ડેરી વિકાસ, સરકારી પ્રોજેક્ટ્સ, નેટ હાઉસ અને પોલીહાઉસ ઉકેલો, બજાર જોડાણ અને ગૌશાળા-આધારિત ટકાઉ ઉત્પાદન પહેલ જેવાં વિવિધ ક્ષેત્રોમાં ફેલાયેલી છે. બધા હિતધારકો અમારી સાથે સહયોગ કરે, પોતાના વિચારો આપે અને આ પરિવર્તનની યાત્રાનો ભાગ બને, એવું હું દિલથી આમંત્રણ આપું છું. સાથે મળીને આપણે ભારતની કરોડરજ્જુ સમાં ગામો અને ખેડૂતોને વધુ મજબૂત બનાવી શકીએ છીએ.`,
  },
};

// Advisors' names in the script of the page language (Marathi uses the Devanagari spelling, like Hindi).
const localName = (p, lang) => (lang === 'gu' ? p.guName : lang === 'hi' || lang === 'mr' ? p.hiName : null) || p.name;
const tx = (v, lang) => (v && typeof v === 'object' ? v[lang] || v.en : v);

function PersonCard({ person, labels, lang = 'en', featured = false }) {
  return (
    <article className={`overflow-hidden rounded-sm border border-brand-100 bg-white ${featured ? 'shadow-md' : 'shadow-sm'} ${person.bio ? 'sm:grid sm:grid-cols-[190px_1fr]' : ''}`}>
      <div className={`overflow-hidden bg-brand-50 ${person.bio ? 'aspect-[4/5] sm:m-5 sm:mr-0 sm:self-start' : featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <PhotoSlot slot={person.image} person={person.name} plain={!!person.bio} alt={`${person.name} — ${labels.photo}`} />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-gold-600">{labels.role[person.role]}</p>
        <h3 className="mt-1 text-lg font-extrabold text-brand-900">{localName(person, lang)}</h3>
        {person.detail && <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">{tx(person.detail, lang)}</p>}
        {person.bio && (
          <ul className="mt-3 space-y-1.5 border-t border-brand-100 pt-3">
            {(person.bio[lang] || person.bio.en).map((line) => (
              <li key={line} className="flex gap-2 text-[13px] leading-6 text-slate-600"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" />{line}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default function About() {
  useSeo('about');
  const c = useC();
  const lang = useLang();
  const a = c.about;
  const t = leadership[lang] || leadership.en;
  const msgOf = (person) => (messages[lang] || {})[person.key] || messages.en[person.key] || '';
  const hasMsg = (person) => person.message || msgOf(person);
  const messagePeople = members.filter(hasMsg);
  const profilePeople = members.filter((person) => !hasMsg(person) && person.role !== 'chair' && person.role !== 'advisor');
  const advisors = members.filter((person) => person.role === 'advisor');

  return (
    <>
      <PageHero title={a.title} crumb={a.crumb} sub={a.sub} kind="centre" slot="cluster" />

      <section className="relative z-10 -mt-8 pb-4">
        <div className="container-x">
          <Reveal variant="zoom"><div className="grid overflow-hidden border border-brand-100 border-t-4 border-t-gold-500 bg-white shadow-lift md:grid-cols-[1.5fr_1fr_1.2fr_1fr] md:divide-x md:divide-brand-100 max-md:divide-y max-md:divide-brand-100">
            <div className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-gold-600">{t.organisation}</p>
              <p className="mt-2 font-display text-xl font-semibold leading-snug text-brand-900">{c.footer.about}</p>
            </div>
            <div className="group flex items-center gap-4 p-6 transition hover:bg-brand-50/60">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-900 text-gold-300 transition duration-500 group-hover:rotate-[360deg] group-hover:bg-gold-500 group-hover:text-brand-950"><span className="absolute inset-0 animate-ping rounded-full bg-gold-500/30 [animation-duration:3s]" aria-hidden="true" /><Icon name="doc" className="relative h-6 w-6" /></span>
              <p className="font-display text-lg font-semibold leading-snug text-brand-900">{t.registered}</p>
            </div>
            <div className="group flex items-center gap-4 p-6 transition hover:bg-brand-50/60">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-900 text-gold-300 transition duration-500 group-hover:rotate-[360deg] group-hover:bg-gold-500 group-hover:text-brand-950"><span className="absolute inset-0 animate-ping rounded-full bg-gold-500/30 [animation-delay:1.2s] [animation-duration:3s]" aria-hidden="true" /><Icon name="shield" className="relative h-6 w-6" /></span>
              <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-gold-600">{t.cin}</p><p className="mt-1 break-all text-sm font-bold text-brand-900">U85197RJ2022NPL078943</p></div>
            </div>
            <div className="p-6">
              <ul className="space-y-1.5">
                {t.motto.split('·').map((w, i) => (
                  <li key={w} className="fpc-slide flex items-center gap-2 text-sm font-semibold text-brand-900" style={{ animationDelay: `${0.5 + i * 0.18}s` }}><span className="h-1.5 w-1.5 rounded-full bg-gold-500" />{w.trim()}</li>
                ))}
              </ul>
            </div>
          </div></Reveal>
        </div>
      </section>

      <Band>
        <div className="mx-auto max-w-5xl">
          <Reveal variant="none" stagger>
            <p className="eyebrow mb-4">{t.organisation}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">{t.whoTitle}</h2>
            <span className="gold-rule gold-grow mt-5" />
          </Reveal>
          <div className="mt-6 space-y-5 text-[17px] leading-8 text-slate-600">
            {t.whoParas.map((para, i) => <Reveal key={i} delay={i * 140} variant={i % 2 ? 'right' : 'left'}><p>{para}</p></Reveal>)}
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[t.vision, t.mission].map((item, i) => (
            <Reveal key={item.title} variant={i ? 'right' : 'left'} delay={i * 120}>
              <article className="group relative h-full overflow-hidden border border-brand-100 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-1.5 hover:border-gold-500/70 hover:shadow-lift">
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-500 to-gold-300 transition duration-700 group-hover:scale-x-100" aria-hidden="true" />
                <span className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gold-500/10 transition duration-700 group-hover:scale-[2.2]" aria-hidden="true" />
                <span className="mb-4 block h-1 w-12 bg-gold-500 transition-all duration-500 group-hover:w-24" />
                <h3 className="relative font-display text-2xl font-extrabold text-brand-900">{item.title}</h3>
                <p className="relative mt-3 leading-7 text-slate-600">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      <Band className="bg-white">
        <SectionTitle>{t.messagesTitle}</SectionTitle>
        <div className="mx-auto grid max-w-5xl gap-6">
          {messagePeople.map((person, idx) => (
            <Reveal key={person.key} variant={idx % 2 ? 'right' : 'left'}>
              <article className={`group relative grid overflow-hidden border border-brand-100 bg-paper shadow-sm transition duration-500 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-lift ${idx % 2 ? 'sm:grid-cols-[1fr_260px]' : 'sm:grid-cols-[260px_1fr]'}`}>
                <div className={`relative min-h-56 overflow-hidden bg-brand-50 ${idx % 2 ? 'sm:order-2' : ''}`}>
                  <PhotoSlot slot={person.image} person={person.name} alt={`${person.name} — ${t.photo}`} />
                  <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
                    <span className="absolute h-[11.4rem] w-[11.4rem] animate-ping rounded-full border border-gold-400/50 [animation-duration:3.2s] sm:h-[12.4rem] sm:w-[12.4rem]" />
                    <span className="absolute h-[12.6rem] w-[12.6rem] animate-spin rounded-full border border-dashed border-gold-400/60 [animation-duration:28s] sm:h-[13.6rem] sm:w-[13.6rem]" />
                  </div>
                </div>
                <div className="relative flex flex-col justify-center overflow-hidden p-6 sm:p-8">
                  <span className="pointer-events-none absolute right-5 top-0 select-none font-display text-[9rem] leading-none text-gold-500/15 transition duration-700 group-hover:-translate-y-1 group-hover:text-gold-500/25" aria-hidden="true">&rdquo;</span>
                  <p className="relative text-[10px] font-bold uppercase tracking-[.18em] text-gold-600">{t.role[person.role]}</p>
                  <h3 className="relative mt-2 text-xl font-extrabold text-brand-900">{person.name}</h3>
                  <span className="gold-rule gold-grow relative mt-3" />
                  {person.detail && <p className="relative mt-2 text-xs leading-relaxed text-slate-500">{tx(person.detail, lang)}</p>}
                  <div className="relative mt-5 pl-4">
                    <span className="bar-grow absolute inset-y-0 left-0 w-0.5 bg-gold-500" aria-hidden="true" />
                    <p className="whitespace-pre-line text-sm leading-7 text-slate-600">{msgOf(person) || <span className="italic">{t.messagePending}</span>}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Band>

      {profilePeople.length > 0 && <Band>
        <SectionTitle sub={t.profileSub}>{t.profileTitle}</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profilePeople.map((person) => <PersonCard key={person.key} person={person} labels={t} lang={lang} />)}
        </div>
      </Band>}

      <Band className="bg-brand-50">
        <SectionTitle sub={t.committeeSub}>{t.committeeTitle}</SectionTitle>
        {advisors.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {advisors.map((person) => <PersonCard key={person.key} person={person} labels={t} lang={lang} />)}
          </div>
        ) : (
        <div className="mx-auto max-w-3xl border border-brand-200 bg-white p-7 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6m3-3h-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <p className="text-sm leading-7 text-slate-600">{t.committeePending}</p>
        </div>
        )}
      </Band>

      <Band className="bg-white">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-brand-900">{t.docsTitle}</h2>
            <dl className="divide-y divide-brand-100 border-y border-brand-100">
              <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr]"><dt className="font-bold text-brand-800">{t.cin}</dt><dd>U85197RJ2022NPL078943</dd></div>
              <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr]"><dt className="font-bold text-brand-800">{t.office}</dt><dd>Jaipur, Rajasthan</dd></div>
              <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr]"><dt className="font-bold text-brand-800">{t.registered}</dt><dd>2022</dd></div>
            </dl>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-brand-900">{t.audiencesTitle}</h2>
            <ul className="flex flex-wrap gap-2">{c.home.audiences.map((x) => <li key={x} className="rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-semibold text-brand-800">{x}</li>)}</ul>
          </div>
        </div>
      </Band>
    </>
  );
}