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
    title: { en: 'Building a Self-Reliant Gaushala', hi: 'आत्मनिर्भर गौशाला का निर्माण', mr: 'आत्मनिर्भर गोशाळेची उभारणी', gu: 'આત્મનિર્ભર ગૌશાળાનું નિર્માણ' },
    desc: { en: 'From cow care to culture, from Gaushala to prosperity: the Federation’s Gaushala-to-fertilizer journey.', hi: 'गौ सेवा से संस्कृति तक, गौशाला से समृद्धि तक: गौशाला से जैविक खाद तक की महासंघ की यात्रा।', mr: 'गोसेवेपासून संस्कृतीपर्यंत, गोशाळेपासून समृद्धीपर्यंत: फेडरेशनचा गोशाळा ते खत हा प्रवास.', gu: 'ગૌસેવાથી સંસ્કૃતિ સુધી, ગૌશાળાથી સમૃદ્ધિ સુધી: ફેડરેશનની ગૌશાળાથી ખાતર સુધીની યાત્રા.' },
  },
  {
    id: 'organic-farming-amul', where: ['home'],
    src: '/videos/organic-farming-amul.mp4', poster: '/videos/organic-farming-amul.jpg',
    title: { en: 'Organic Farming & Village Livelihoods', hi: 'जैविक खेती और ग्रामीण आजीविका', mr: 'सेंद्रिय शेती आणि ग्रामीण उपजीविका', gu: 'ઓર્ગેનિક ખેતી અને ગ્રામીણ આજીવિકા' },
    desc: { en: 'Farmers, women and cooperatives coming together for chemical-free, organic farming.', hi: 'रसायन-मुक्त जैविक खेती के लिए साथ आते किसान, महिलाएँ और सहकारी संस्थाएँ।', mr: 'रसायनमुक्त, सेंद्रिय शेतीसाठी एकत्र येणारे शेतकरी, महिला आणि सहकारी संस्था.', gu: 'રસાયણમુક્ત, ઓર્ગેનિક ખેતી માટે એકસાથે આવતા ખેડૂતો, મહિલાઓ અને સહકારી મંડળીઓ.' },
  },
  {
    id: 'desi-cow-ghee', where: ['gaushala'],
    src: '/videos/desi-cow-ghee.mp4', poster: '/videos/desi-cow-ghee.jpg',
    title: { en: 'Desi cow ghee', hi: 'देसी गाय का घी', mr: 'देशी गायीचे तूप', gu: 'દેશી ગાયનું ઘી' },
    desc: { en: 'The traditional method of making ghee.', hi: 'घी बनाने की पारंपरिक विधि।', mr: 'तूप बनवण्याची पारंपरिक पद्धत.', gu: 'ઘી બનાવવાની પરંપરાગત રીત.' },
  },
  {
    id: 'gaushala-breeding-centre', where: ['gaushala'],
    src: '/videos/gaushala-breeding-centre.mp4', poster: '/videos/gaushala-breeding-centre.jpg',
    title: { en: 'Bovine Breeding Centre Visit', hi: 'बोवाइन ब्रीडिंग सेंटर भ्रमण', mr: 'गोवंश प्रजनन केंद्राला भेट', gu: 'ગૌવંશ સંવર્ધન કેન્દ્રની મુલાકાત' },
    desc: { en: 'A Federation member at the Amul Dairy bovine breeding centre, Mogar, learning from a modern cattle-care model.', hi: 'अमूल डेयरी के मोगर स्थित बोवाइन ब्रीडिंग सेंटर में महासंघ के सदस्य, आधुनिक पशुपालन मॉडल को समझते हुए।', mr: 'मोगर येथील अमूल डेअरीच्या गोवंश प्रजनन केंद्रात आधुनिक पशुसंगोपन मॉडेलमधून शिकताना फेडरेशनचे सदस्य.', gu: 'મોગરના અમૂલ ડેરી ગૌવંશ સંવર્ધન કેન્દ્રમાં આધુનિક પશુ સંભાળ મોડેલમાંથી શીખતા ફેડરેશનના સભ્ય.' },
  },
  {
    id: 'gau-rashtra-yatra-solapur', where: ['gaushala'],
    src: '/videos/gau-rashtra-yatra-solapur.mp4', poster: '/videos/gau-rashtra-yatra-solapur.jpg',
    title: { en: 'Gau Rashtra Yatra, Solapur', hi: 'गौ राष्ट्र यात्रा, सोलापुर', mr: 'गो राष्ट्र यात्रा, सोलापूर', gu: 'ગૌ રાષ્ટ્ર યાત્રા, સોલાપુર' },
    desc: { en: 'Gau Rashtra Yatra at a Gaushala in Solapur, Maharashtra: meeting caretakers and visiting the cattle.', hi: 'सोलापुर, महाराष्ट्र की एक गौशाला में गौ राष्ट्र यात्रा: गौ सेवकों से भेंट और गौवंश का भ्रमण।', mr: 'सोलापूर, महाराष्ट्र येथील गोशाळेत गो राष्ट्र यात्रा: गोपालकांशी भेट आणि गोवंशाची पाहणी.', gu: 'સોલાપુર, મહારાષ્ટ્રની એક ગૌશાળામાં ગૌ રાષ્ટ્ર યાત્રા: ગૌપાલકોને મળવું અને ગૌવંશની મુલાકાત.' },
  },
  {
    id: 'abc-agro-business-center', where: ['projects'], wide: true,
    src: '/videos/abc-agro-business-center.mp4', poster: '/videos/abc-agro-business-center.jpg',
    title: { en: 'ABC Agro Business Centre', hi: 'एबीसी एग्रो बिज़नेस सेंटर', mr: 'ABC ॲग्रो बिझनेस सेंटर', gu: 'ABC એગ્રો બિઝનેસ સેન્ટર' },
    desc: { en: 'The ABC Agro Business Centre with Amul Organic and Maha FPC: inputs, organic products and services for farmers under one roof.', hi: 'अमूल ऑर्गेनिक और महा एफपीसी के साथ एबीसी एग्रो बिज़नेस सेंटर: किसानों के लिए एक ही स्थान पर इनपुट, जैविक उत्पाद और सेवाएँ।', mr: 'अमूल ऑरगॅनिक आणि महा एफपीसीसोबत ABC ॲग्रो बिझनेस सेंटर: शेतकऱ्यांसाठी निविष्ठा, सेंद्रिय उत्पादने आणि सेवा एकाच छताखाली.', gu: 'અમૂલ ઓર્ગેનિક અને મહા એફપીસી સાથે ABC એગ્રો બિઝનેસ સેન્ટર: ખેડૂતો માટે ઇનપુટ, ઓર્ગેનિક ઉત્પાદનો અને સેવાઓ એક જ છત નીચે.' },
  },
  {
    id: 'rajasthan-cm-gau-expo', where: ['home'],
    src: '/videos/rajasthan-cm-gau-expo.mp4', poster: '/videos/rajasthan-cm-gau-expo.jpg',
    title: { en: 'Gau Expo: Leaders & Gaushala Vision', hi: 'गौ एक्सपो: नेतृत्व और गौशाला विज़न', mr: 'गो एक्स्पो: नेते आणि गोशाळेचा दृष्टिकोन', gu: 'ગૌ એક્સ્પો: નેતાઓ અને ગૌશાળાનું વિઝન' },
    desc: { en: 'Highlights from a cow-based economy exhibition: leaders interacting with Gaushala models and organic initiatives.', hi: 'गौ आधारित अर्थव्यवस्था प्रदर्शनी की झलकियाँ: गौशाला मॉडल और जैविक पहलों से रूबरू नेतृत्व।', mr: 'गो-आधारित अर्थव्यवस्था प्रदर्शनातील ठळक क्षण: गोशाळा मॉडेल्स आणि सेंद्रिय उपक्रमांशी संवाद साधणारे नेते.', gu: 'ગૌ-આધારિત અર્થતંત્ર પ્રદર્શનની ઝલક: ગૌશાળા મોડેલ્સ અને ઓર્ગેનિક પહેલ સાથે સંવાદ કરતા નેતાઓ.' },
  },
  {
    id: 'gaushala-organic-fertilizer', where: ['home', 'gaushala'],
    src: '/videos/gaushala-organic-fertilizer.mp4', poster: '/videos/gaushala-organic-fertilizer.jpg',
    title: { en: 'Organic Fertilizer Made in Gaushala', hi: 'गौशाला में निर्मित जैविक खाद', mr: 'गोशाळेत बनवलेले सेंद्रिय खत', gu: 'ગૌશાળામાં બનેલું ઓર્ગેનિક ખાતર' },
    desc: { en: 'An agriculture officer and farmers on how Gaushala-made organic fertilizer improves soil and crops.', hi: 'कृषि अधिकारी और किसान बता रहे हैं कि गौशाला में बनी जैविक खाद मिट्टी और फसल को कैसे बेहतर बनाती है।', mr: 'गोशाळेत बनवलेले सेंद्रिय खत माती आणि पिके कशी सुधारते, याबद्दल कृषी अधिकारी आणि शेतकरी.', gu: 'ગૌશાળામાં બનેલું ઓર્ગેનિક ખાતર જમીન અને પાક કેવી રીતે સુધારે છે, તે વિશે કૃષિ અધિકારી અને ખેડૂતો.' },
  },
  {
    id: 'gaudham-ashram-chodila', where: ['gaushala'],
    src: '/videos/gaudham-ashram-chodila.mp4', poster: '/videos/gaudham-ashram-chodila.jpg',
    title: { en: 'Go Dham Ashram, Murtha (Chodila, Gujarat)', hi: 'गो धाम आश्रम, मूर्था (चोदिला, गुजरात)', mr: 'गो धाम आश्रम, मुरथा (चोडीला, गुजरात)', gu: 'ગૌ ધામ આશ્રમ, મુરથા (ચોડીલા, ગુજરાત)' },
    desc: { en: 'A visit to Go Dham Ashram Gaushala in Chodila, Gujarat, with its healthy, well-cared-for cattle.', hi: 'चोदिला, गुजरात के गो धाम आश्रम गौशाला का भ्रमण और वहाँ की स्वस्थ, सुपोषित गायें।', mr: 'चोडीला, गुजरात येथील गो धाम आश्रम गोशाळेला भेट, जिथे निरोगी आणि चांगली निगा राखलेले गोवंश आहे.', gu: 'ચોડીલા, ગુજરાતના ગૌ ધામ આશ્રમ ગૌશાળાની મુલાકાત, જ્યાં તંદુરસ્ત અને સારી સંભાળ પામતું ગૌવંશ છે.' },
  },
  {
    id: 'meeting-discussion', where: ['projects'], wide: true,
    src: '/videos/meeting-discussion.mp4', poster: '/videos/meeting-discussion.jpg',
    title: { en: 'Federation Meeting & Discussion', hi: 'महासंघ की बैठक एवं चर्चा', mr: 'फेडरेशनची बैठक आणि चर्चा', gu: 'ફેડરેશનની બેઠક અને ચર્ચા' },
    desc: { en: 'Members and leaders of the Federation in a planning discussion on the way forward.', hi: 'आगे की रूपरेखा पर महासंघ के सदस्यों और पदाधिकारियों की चर्चा।', mr: 'पुढील वाटचालीच्या नियोजन चर्चेत फेडरेशनचे सदस्य आणि नेते.', gu: 'આગળના માર્ગ અંગે આયોજન ચર્ચામાં ફેડરેશનના સભ્યો અને નેતાઓ.' },
  },
];

export const videosFor = (where) => VIDEOS.filter((v) => v.where.includes(where));