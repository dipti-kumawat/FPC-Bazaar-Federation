// News & events shown on the Home page (latest few) and on /events (all of them).
// HOW TO ADD ONE: copy a block below, paste it at the TOP of the list (newest first) and change the text.
//   id        unique short name, no spaces
//   date      'YYYY-MM-DD' (optional, shown on the card; newest date is placed first automatically)
//   clipping  true for a newspaper cutting: shows the whole page (no crop) and opens bigger on click
//   focus     optional crop focus for tall photos, e.g. 'center 20%' (default 'center 35%')
//   image     path of a photo under public/images/events/ (optional; without it a green placeholder is used)
//   category / location / title / description   English (en) and Hindi (hi)
export const UPDATES = [
  {
    id: 'bvg-chairman-pune-gaushala-approval', date: '2026-11-16', image: '/images/events/bvg-chairman-pune-meeting.jpeg',
    imageAlt: { en: 'Meeting with the BVG chairman in Pune', hi: 'पुणे में बीवीजी के चेयरमैन के साथ बैठक', mr: 'पुण्यात BVG अध्यक्षांसोबत बैठक', gu: 'પુણેમાં BVG અધ્યક્ષ સાથે બેઠક' },
    category: { en: 'Gaushala initiative', hi: 'गौशाला पहल', mr: 'गोशाळा उपक्रम', gu: 'ગૌશાળા પહેલ' },
    location: { en: 'Pune, Maharashtra', hi: 'पुणे, महाराष्ट्र', mr: 'पुणे, महाराष्ट्र', gu: 'પુણે, મહારાષ્ટ્ર' },
    title: { en: 'Gaushala project approved in meeting with BVG chairman', hi: 'बीवीजी के चेयरमैन के साथ बैठक में गौशाला परियोजना को स्वीकृति', mr: 'BVG अध्यक्षांसोबतच्या बैठकीत गोशाळा प्रकल्पाला मंजुरी', gu: 'BVG અધ્યક્ષ સાથેની બેઠકમાં ગૌશાળા પ્રોજેક્ટને મંજૂરી' },
    description: { en: 'A meeting was held today in Pune with Mr. Gaikwad, Chairman of BVG. The Gaushala project received approval in the meeting.', hi: 'आज पुणे में बीवीजी के चेयरमैन श्री गायकवाड़ जी के साथ बैठक हुई। बैठक में गौशाला परियोजना पर स्वीकृति बनी।', mr: 'आज पुण्यात BVG चे अध्यक्ष श्री. गायकवाड यांच्यासोबत बैठक झाली. बैठकीत गोशाळा प्रकल्पाला मंजुरी मिळाली.', gu: 'આજે પુણેમાં BVGના અધ્યક્ષ શ્રી ગાયકવાડ સાથે બેઠક યોજાઈ. બેઠકમાં ગૌશાળા પ્રોજેક્ટને મંજૂરી મળી.' },
  },
  {
    id: 'sardar-patel-multi-state-women-loan', date: '2026-11-16', image: '/images/events/sardar-patel-women-cooperative.jpeg',
    imageAlt: { en: 'Federation team members at a meeting', hi: 'बैठक में फेडरेशन की टीम के सदस्य', mr: 'बैठकीत फेडरेशनच्या टीमचे सदस्य', gu: 'બેઠકમાં ફેડરેશનની ટીમના સભ્યો' },
    category: { en: 'Women empowerment', hi: 'महिला सशक्तिकरण', mr: 'महिला सक्षमीकरण', gu: 'મહિલા સશક્તિકરણ' },
    location: { en: '', hi: '', mr: '', gu: '' },
    title: { en: '60,000 women join through Sardar Patel Multi State Cooperative', hi: 'सरदार पटेल मल्टी स्टेट कोऑपरेटिव से जुड़ीं 60,000 महिलाएँ', mr: 'सरदार पटेल मल्टी स्टेट को-ऑपरेटिव्हच्या माध्यमातून 60,000 महिला जोडल्या', gu: 'સરદાર પટેલ મલ્ટી સ્ટેટ કો-ઓપરેટિવ દ્વારા 60,000 મહિલાઓ જોડાઈ' },
    description: { en: 'A group of 60,000 women has joined through Sardar Patel Multi State Cooperative. Of them, 20,000 women will be given a loan of Rs 30,000 each.', hi: 'सरदार पटेल मल्टी स्टेट कोऑपरेटिव के माध्यम से 60,000 महिलाओं का समूह जुड़ा है। इनमें से 20,000 महिलाओं को प्रति महिला 30,000 रुपये का ऋण दिया जाएगा।', mr: 'सरदार पटेल मल्टी स्टेट को-ऑपरेटिव्हच्या माध्यमातून 60,000 महिलांचा गट जोडला गेला आहे. त्यापैकी 20,000 महिलांना प्रत्येकी 30,000 रुपयांचे कर्ज दिले जाईल.', gu: 'સરદાર પટેલ મલ્ટી સ્ટેટ કો-ઓપરેટિવ દ્વારા 60,000 મહિલાઓનું જૂથ જોડાયું છે. તેમાંથી 20,000 મહિલાઓને દરેકને 30,000 રૂપિયાની લોન આપવામાં આવશે.' },
  },
  {
    id: 'amul-organic-fertilizer-launch-jaipur', date: '', image: '/images/events/amul-organic-launch-jaipur.jpg',
    imageAlt: { en: 'Newspaper report on the Amul Organic Fertilizer launch at Panjrapol Gaushala, Jaipur', hi: 'जयपुर की पिंजरापोल गौशाला में अमूल ऑर्गेनिक फर्टिलाइज़र लॉन्चिंग की अखबार की खबर', mr: 'जयपूरच्या पांजरापोळ गोशाळेत अमूल ऑरगॅनिक खताच्या शुभारंभाची वृत्तपत्रातील बातमी', gu: 'જયપુરની પાંજરાપોળ ગૌશાળામાં અમૂલ ઓર્ગેનિક ખાતરના લોન્ચ અંગે અખબારી અહેવાલ' },
    category: { en: 'Gaushala initiative', hi: 'गौशाला पहल', mr: 'गोशाळा उपक्रम', gu: 'ગૌશાળા પહેલ' },
    location: { en: 'Jaipur, Rajasthan', hi: 'जयपुर, राजस्थान', mr: 'जयपूर, राजस्थान', gu: 'જયપુર, રાજસ્થાન' },
    title: { en: 'Amul Organic Fertilizer launched at Panjrapol Gaushala, Jaipur', hi: 'जयपुर की पिंजरापोल गौशाला में अमूल ऑर्गेनिक फर्टिलाइज़र का भव्य लॉन्चिंग', mr: 'जयपूरच्या पांजरापोळ गोशाळेत अमूल ऑरगॅनिक खताचा शुभारंभ', gu: 'જયપુરની પાંજરાપોળ ગૌશાળામાં અમૂલ ઓર્ગેનિક ખાતર લોન્ચ' },
    description: {
      en: 'Rajasthan Governor Shri Haribhau Kisanrao Bagde launched Amul Organic Fertilizer at Panjrapol Gaushala (Surabhi Sadan), Jaipur, to make it available to farmers. The event was organised jointly by the Gaushala family, FPC Bazar Federation and partner organisations, with Amul as sponsor. All products were displayed and an outlet was set up for the public.',
      hi: 'राजस्थान के राज्यपाल श्री हरिभाऊ किशनराव बागड़े ने जयपुर की पिंजरापोल गौशाला (सुरभि सदन) में किसानों के लिए अमूल ऑर्गेनिक फर्टिलाइज़र का लॉन्चिंग किया। कार्यक्रम गौशाला परिवार, एफपीसी बाज़ार फेडरेशन और सहयोगी संस्थाओं ने मिलकर आयोजित किया, जिसमें अमूल स्पॉन्सर के रूप में शामिल रहा। सभी उत्पाद प्रदर्शित किए गए और आम जनता के लिए आउटलेट भी लगाया गया।', mr: 'शेतकऱ्यांना उपलब्ध करून देण्यासाठी राजस्थानचे राज्यपाल श्री हरिभाऊ किसनराव बागडे यांनी जयपूरच्या पांजरापोळ गोशाळेत (सुरभी सदन) अमूल ऑरगॅनिक खताचा शुभारंभ केला. गोशाळा परिवार, एफपीसी बाजार फेडरेशन आणि भागीदार संस्थांनी संयुक्तपणे हा कार्यक्रम आयोजित केला होता, अमूल प्रायोजक होते. सर्व उत्पादने प्रदर्शित करण्यात आली आणि लोकांसाठी विक्री केंद्र उभारण्यात आले.', gu: 'ખેડૂતોને ઉપલબ્ધ કરાવવા રાજસ્થાનના રાજ્યપાલ શ્રી હરિભાઉ કિસનરાવ બાગડેએ જયપુરની પાંજરાપોળ ગૌશાળા (સુરભિ સદન)માં અમૂલ ઓર્ગેનિક ખાતર લોન્ચ કર્યું. આ કાર્યક્રમ ગૌશાળા પરિવાર, એફપીસી બજાર ફેડરેશન અને ભાગીદાર સંસ્થાઓએ સંયુક્ત રીતે યોજ્યો હતો, અમૂલ પ્રાયોજક હતું. બધાં ઉત્પાદનો પ્રદર્શિત કરાયાં અને લોકો માટે વેચાણ કેન્દ્ર ઊભું કરાયું.',
    },
    clipping: true,
  },
  {
    id: "recognition-for-tribal-family-developmen", date: '', image: "/images/events/nandurbar-felicitation.jpg", imageAlt: { en: "FPC representatives being felicitated during a community engagement in Nandurbar", hi: "नंदुरबार में सामुदायिक कार्यक्रम के दौरान सम्मान", mr: "नंदुरबारमधील सामुदायिक कार्यक्रमात एफपीसी प्रतिनिधींचा सत्कार", gu: "નંદુરબારમાં સામુદાયિક કાર્યક્રમ દરમિયાન એફપીસી પ્રતિનિધિઓનું સન્માન" },
    category: { en: "Community engagement", hi: "सामुदायिक सहभागिता", mr: "सामुदायिक उपक्रम", gu: "સામુદાયિક પ્રવૃત્તિ" },
    location: { en: "Nandurbar, Maharashtra", hi: "नंदुरबार, महाराष्ट्र", mr: "नंदुरबार, महाराष्ट्र", gu: "નંદુરબાર, મહારાષ્ટ્ર" },
    title: { en: "Recognition for Tribal Family Development Initiative", hi: "आदिवासी परिवार विकास पहल के लिए सम्मान", mr: "आदिवासी कुटुंब विकास उपक्रमाचा गौरव", gu: "આદિવાસી પરિવાર વિકાસ પહેલનું સન્માન" },
    description: { en: "Felicitation and blessings received from senior local RSS and BJP representatives for work undertaken under the Samriddh Adivasi Parivar project.", hi: "समृद्ध आदिवासी परिवार परियोजना के अंतर्गत किए गए कार्यों के लिए वरिष्ठ स्थानीय आरएसएस और बीजेपी पदाधिकारियों से सम्मान एवं आशीर्वाद प्राप्त हुआ।", mr: "समृद्ध आदिवासी परिवार प्रकल्पांतर्गत केलेल्या कामाबद्दल स्थानिक RSS आणि BJP च्या ज्येष्ठ प्रतिनिधींकडून सत्कार आणि आशीर्वाद मिळाले.", gu: "સમૃદ્ધ આદિવાસી પરિવાર પ્રોજેક્ટ હેઠળ થયેલા કામ માટે સ્થાનિક RSS અને BJPના વરિષ્ઠ પ્રતિનિધિઓ તરફથી સન્માન અને આશીર્વાદ મળ્યા." },
  },
  {
    id: "abcd-project-memorandum-of-understanding", date: '', image: "/images/events/abcd-mou-gujarat.jpg", imageAlt: { en: "Agricultural collaboration meeting", hi: "कृषि सहयोग बैठक", mr: "कृषी सहयोग बैठक", gu: "કૃષિ સહયોગ બેઠક" },
    category: { en: "Agricultural collaboration", hi: "कृषि सहयोग", mr: "कृषी सहयोग", gu: "કૃષિ સહયોગ" },
    location: { en: "Gujarat", hi: "गुजरात", mr: "गुजरात", gu: "ગુજરાત" },
    title: { en: "ABCD Project – Memorandum of Understanding", hi: "ABCD परियोजना – समझौता ज्ञापन", mr: "ABCD प्रकल्प – सामंजस्य करार", gu: "ABCD પ્રોજેક્ટ – સમજૂતી કરાર" },
    description: { en: "An MoU initiative involving Bharatiya Kisan Sangh and Agro Unity, intended to strengthen collaboration around agricultural development.", hi: "भारतीय किसान संघ और Agro Unity की भागीदारी वाली एमओयू पहल, जिसका उद्देश्य कृषि विकास में सहयोग को मजबूत करना है।", mr: "भारतीय किसान संघ आणि ॲग्रो युनिटी यांचा समावेश असलेला सामंजस्य करार उपक्रम, कृषी विकासातील सहकार्य मजबूत करण्यासाठी.", gu: "ભારતીય કિસાન સંઘ અને એગ્રો યુનિટીને સાંકળતી સમજૂતી કરારની પહેલ, કૃષિ વિકાસમાં સહયોગ મજબૂત કરવા માટે." },
  },
  {
    id: "participation-in-sri-lakshmi-narayani-go", date: '', image: "/images/events/vellore-gaushala-programme.jpg", imageAlt: { en: "Programme participation in Vellore", hi: "वेल्लोर कार्यक्रम में सहभागिता", mr: "वेल्लोरमधील कार्यक्रमात सहभाग", gu: "વેલ્લોરના કાર્યક્રમમાં ભાગીદારી" },
    category: { en: "Gaushala initiative", hi: "गौशाला पहल", mr: "गोशाळा उपक्रम", gu: "ગૌશાળા પહેલ" },
    location: { en: "Vellore, Tamil Nadu", hi: "वेल्लोर, तमिलनाडु", mr: "वेल्लोर, तमिळनाडू", gu: "વેલ્લોર, તમિલનાડુ" },
    title: { en: "Participation in Sri Lakshmi Narayani Golden Temple Programme", hi: "श्री लक्ष्मी नारायणी स्वर्ण मंदिर कार्यक्रम में सहभागिता", mr: "श्री लक्ष्मी नारायणी सुवर्ण मंदिर कार्यक्रमात सहभाग", gu: "શ્રી લક્ષ્મી નારાયણી સુવર્ણ મંદિર કાર્યક્રમમાં ભાગીદારી" },
    description: { en: "Participation in a programme at Sri Lakshmi Narayani Golden Temple, Sripuram, and an opportunity associated with the Gaushala Project.", hi: "श्रीपुरम स्थित श्री लक्ष्मी नारायणी स्वर्ण मंदिर के कार्यक्रम में शामिल होने और गौशाला परियोजना से जुड़ा अवसर प्राप्त हुआ।", mr: "श्रीपुरम येथील श्री लक्ष्मी नारायणी सुवर्ण मंदिरातील कार्यक्रमात सहभाग आणि गोशाळा प्रकल्पाशी संबंधित एक संधी.", gu: "શ્રીપુરમના શ્રી લક્ષ્મી નારાયણી સુવર્ણ મંદિરના કાર્યક્રમમાં ભાગીદારી અને ગૌશાળા પ્રોજેક્ટ સાથે જોડાયેલી એક તક." },
  },
  {
    id: "action-on-encroachments-from-village-gau", date: '', image: "/images/events/gauchar-land-initiative.jpg", imageAlt: { en: "Federation delegation meeting", hi: "फेडरेशन प्रतिनिधिमंडल की बैठक", mr: "फेडरेशन शिष्टमंडळाची बैठक", gu: "ફેડરેશન પ્રતિનિધિમંડળની બેઠક" },
    category: { en: "Federation update", hi: "फेडरेशन अपडेट", mr: "फेडरेशन अपडेट", gu: "ફેડરેશન અપડેટ" },
    location: { en: "Rajasthan", hi: "राजस्थान", mr: "राजस्थान", gu: "રાજસ્થાન" },
    title: { en: "Action on Encroachments from Village Gauchar Land", hi: "गाँवों की गौचर भूमि से अतिक्रमण हटाने की पहल", mr: "गावच्या गायरान जमिनीवरील अतिक्रमणांवर कारवाई", gu: "ગામની ગૌચર જમીન પરનાં દબાણો સામે કાર્યવાહી" },
    description: { en: "Acknowledgement to Cabinet Minister Shri Hemant Meena Ji for the departmental order concerning removal of encroachments from village grazing lands across Rajasthan.", hi: "राजस्थान में गाँवों की चारागाह एवं गौचर भूमि से अतिक्रमण हटाने संबंधी विभागीय आदेश के लिए कैबिनेट मंत्री श्री हेमंत मीणा जी का आभार।", mr: "राजस्थानातील गावांच्या गायरान जमिनींवरील अतिक्रमणे हटवण्याच्या विभागीय आदेशाबद्दल कॅबिनेट मंत्री श्री हेमंत मीणा जी यांचे आभार.", gu: "સમગ્ર રાજસ્થાનમાં ગામોની ગૌચર જમીન પરથી દબાણો હટાવવાના વિભાગીય આદેશ માટે કેબિનેટ મંત્રી શ્રી હેમંત મીણા જીનો આભાર." },
  },
];

/** Newest first: dated items sorted by date, undated items keep the order written above. */
export const sortedUpdates = () => [...UPDATES].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
export const HOME_COUNT = 4;