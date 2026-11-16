import { useC, useLang } from '../i18n/hooks.jsx';
import { useSeo } from '../lib/useSeo.js';
import { PageHero, Verify, SectionTitle, Band, PhotoSlot } from '../components/ui.jsx';

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
    motto: 'सहकारिता · रोजगार · विकास',
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
  { key: 'shreevats', name: 'Shreevats Sanjay', hiName: 'श्रीवत्स संजय', role: 'advisor', image: 'shreevats',
    detail: { en: 'Retd. Deputy Director General (DDG), Ministry of Tourism, Govt. of India', hi: 'सेवानिवृत्त उप महानिदेशक (DDG), पर्यटन मंत्रालय, भारत सरकार' },
    bio: {
      en: ['Directed India Tourism offices for 43 countries, including Europe, Russia, CIS, Scandinavia, USA, UK, Ireland and Israel', 'Regional Director for Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, Telangana, Puducherry, Lakshadweep and the North-East states', 'Principal of the Institutes of Hotel Management at Chennai and Bangalore, Govt. of India', 'Director Tourism in Rajasthan, Uttar Pradesh and Bihar', 'Addressed UNWTO in Spain and represented India at international conferences in China and Bangladesh'],
      hi: ['यूरोप, रूस, सीआईएस, स्कैंडिनेविया, अमेरिका, ब्रिटेन, आयरलैंड और इज़राइल सहित 43 देशों के लिए भारत पर्यटन कार्यालयों के निदेशक', 'कर्नाटक, केरल, तमिलनाडु, आंध्र प्रदेश, तेलंगाना, पुडुचेरी, लक्षद्वीप और पूर्वोत्तर राज्यों के क्षेत्रीय निदेशक', 'चेन्नई और बेंगलुरु के होटल प्रबंधन संस्थानों (भारत सरकार) के प्राचार्य', 'राजस्थान, उत्तर प्रदेश और बिहार में निदेशक – पर्यटन', 'स्पेन में UNWTO को संबोधित किया तथा चीन और बांग्लादेश के अंतरराष्ट्रीय सम्मेलनों में भारत का प्रतिनिधित्व किया'] } },
  { key: 'bharat', name: 'Bharat Singh Rajpurohit', hiName: 'भारत सिंह राजपुरोहित', role: 'advisor', image: 'bharat',
    detail: { en: 'Dairy & Agri Consultant · President, AWARI', hi: 'डेयरी एवं कृषि सलाहकार · अध्यक्ष, AWARI' },
    bio: {
      en: ['President of AWARI (Animal Welfare & Agricultural Research Institute), working on cow protection and promotion', 'Rajasthan in-charge for the Animal Welfare Board of India (AWBI), Govt. of India', 'Advisor to the Tharparkar Cow Conservation Centre, Jodhpur, and the Indo-Japan Dairy Project (H2 Milk Farm)', 'Incubator at MANAGE Hyderabad (Govt. of India); Director Investment Marketing, Global Confederation of Cow Based Industries', 'Author on cow-based organic farming, Panchgavya and cow-based rural development'],
      hi: ['AWARI (जीव जंतु कल्याण एवं कृषि शोध संस्थान) के अध्यक्ष, गौ संरक्षण एवं संवर्धन पर कार्यरत', 'भारतीय जीव जंतु कल्याण बोर्ड (AWBI), भारत सरकार के राजस्थान प्रभारी', 'थारपारकर गौ संरक्षण एवं संवर्धन केंद्र, जोधपुर तथा इंडो-जापान डेयरी प्रोजेक्ट (H2 मिल्क फ़ार्म) के सलाहकार', 'MANAGE हैदराबाद (भारत सरकार) में इन्क्यूबेटर; निदेशक निवेश मार्केटिंग, ग्लोबल कॉन्फेडरेशन ऑफ काऊ बेस्ड इंडस्ट्रीज़', 'गौ आधारित जैविक खेती, पंचगव्य और गौवंश आधारित ग्रामीण विकास पर लेखन'] } },
  { key: 'girish', name: 'Girish Chandra Baluni', hiName: 'गिरीश चंद्र बलूनी', role: 'advisor', image: 'girish',
    detail: { en: 'Advisor, National Council of State Agricultural Marketing Boards, New Delhi', hi: 'सलाहकार, राष्ट्रीय राज्य कृषि विपणन बोर्ड परिषद, नई दिल्ली' },
    bio: {
      en: ['Member, Uttarakhand Organic Commodity Board, Govt. of Uttarakhand', 'Senior journalist and editor with several national Hindi news organisations', 'Director Operations, Brand Watch Communication Pvt. Ltd.; Advisor and coordinator to media and business institutes', 'Former member, Hindi Advisory Committee (Ministry of Labour & Employment) and Central Board of Film Certification'],
      hi: ['सदस्य, उत्तराखंड जैविक उत्पाद परिषद, उत्तराखंड सरकार', 'कई राष्ट्रीय हिंदी समाचार संस्थानों में वरिष्ठ पत्रकार एवं संपादक', 'निदेशक ऑपरेशंस, ब्रांड वॉच कम्युनिकेशन प्रा. लि.; मीडिया और बिज़नेस संस्थानों के सलाहकार व समन्वयक', 'पूर्व सदस्य, हिंदी सलाहकार समिति (श्रम एवं रोज़गार मंत्रालय) तथा केंद्रीय फिल्म प्रमाणन बोर्ड'] } },
  { key: 'manish', name: 'Manish Bafna', hiName: 'मनीष बाफना', role: 'advisor', image: 'manish',
    detail: { en: 'Solar Energy Professional & Project Developer · Greenfield Solutions | Vikas Solar Solutions | Solar House', hi: 'सोलर एनर्जी प्रोफेशनल एवं प्रोजेक्ट डेवलपर · ग्रीनफील्ड सॉल्यूशंस | विकास सोलर सॉल्यूशंस | सोलर हाउस' },
    bio: {
      en: ['Over 7 years of experience in the solar energy sector', 'Development and execution of MW-scale solar power projects; Solar EPC, installation, commissioning and O&M', 'Land identification support and supply of major solar plant components', 'Industrial, commercial, residential and utility-scale projects; across Rajasthan and Pan India through partner networks'],
      hi: ['सोलर ऊर्जा क्षेत्र में 7 वर्ष से अधिक का अनुभव', 'मेगावाट-स्तर की सोलर परियोजनाओं का विकास और क्रियान्वयन; सोलर EPC, इंस्टॉलेशन, कमीशनिंग और O&M', 'भूमि चिन्हांकन में सहयोग तथा प्रमुख सोलर उपकरणों की आपूर्ति', 'औद्योगिक, व्यावसायिक, आवासीय और यूटिलिटी-स्तर की परियोजनाएँ; पूरे राजस्थान में और साझेदार नेटवर्क से पैन इंडिया'] } },
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
};

const tx = (v, lang) => (v && typeof v === 'object' ? v[lang] || v.en : v);

function PersonCard({ person, labels, lang = 'en', featured = false }) {
  return (
    <article className={`overflow-hidden rounded-sm border border-brand-100 bg-white ${featured ? 'shadow-md' : 'shadow-sm'}`}>
      <div className={`overflow-hidden bg-brand-50 ${person.bio ? '' : featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <PhotoSlot slot={person.image} person={person.name} alt={`${person.name} — ${labels.photo}`} />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-gold-600">{labels.role[person.role]}</p>
        <h3 className="mt-1 text-lg font-extrabold text-brand-900">{lang === 'hi' && person.hiName ? person.hiName : person.name}</h3>
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
  const t = leadership[lang];
  const msgOf = (person) => messages[lang][person.key] || messages.en[person.key] || '';
  const hasMsg = (person) => person.message || msgOf(person);
  const messagePeople = members.filter(hasMsg);
  const profilePeople = members.filter((person) => !hasMsg(person) && person.role !== 'chair' && person.role !== 'advisor');
  const advisors = members.filter((person) => person.role === 'advisor');

  return (
    <>
      <PageHero title={a.title} crumb={a.crumb} sub={a.sub} kind="centre" slot="cluster" />

      <Band>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-gold-600">{t.organisation}</p>
            <h2 className="font-display text-3xl font-extrabold text-brand-900 sm:text-4xl">{c.footer.about}</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-600">{a.sub}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-bold text-brand-800">{t.registered}</span>
              <span className="rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-bold text-brand-800">{t.cin}: U85197RJ2022NPL078943</span>
            </div>
          </div>
          <div className="border-l-2 border-gold-500 bg-brand-50 p-6">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-600">{t.motto}</p>
            <p className="mt-3 text-xl font-semibold leading-relaxed text-brand-900">{a.rows.find(([key]) => key.toLowerCase().includes('tagline') || key.toLowerCase().includes('टैगलाइन'))?.[1] || t.motto}</p>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[t.vision, t.mission].map((item) => (
            <article key={item.title} className="border border-brand-100 bg-white p-7 shadow-sm">
              <span className="mb-4 block h-1 w-12 bg-gold-500" />
              <h3 className="font-display text-2xl font-extrabold text-brand-900">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">{t.visionNote}</p>
      </Band>

      <Band className="bg-white">
        <SectionTitle sub={t.messagesSub}>{t.messagesTitle}</SectionTitle>
        <div className="mx-auto grid max-w-5xl gap-6">
          {messagePeople.map((person) => (
            <article key={person.key} className="grid overflow-hidden border border-brand-100 bg-paper sm:grid-cols-[260px_1fr]">
              <div className="min-h-56 bg-brand-50">
                <PhotoSlot slot={person.image} person={person.name} alt={`${person.name} — ${t.photo}`} />
              </div>
              <div className="flex flex-col justify-center p-6">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-gold-600">{t.role[person.role]}</p>
                <h3 className="mt-2 text-xl font-extrabold text-brand-900">{person.name}</h3>
                {person.detail && <p className="mt-1 text-xs leading-relaxed text-slate-500">{tx(person.detail, lang)}</p>}
                <p className="mt-4 whitespace-pre-line border-l-2 border-gold-500 pl-4 text-sm leading-7 text-slate-600">{msgOf(person) || <span className="italic">{t.messagePending}</span>}</p>
              </div>
            </article>
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