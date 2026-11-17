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
    imageAlt: { en: 'Meeting with the BVG chairman in Pune', hi: 'पुणे में बीवीजी के चेयरमैन के साथ बैठक' },
    category: { en: 'Gaushala initiative', hi: 'गौशाला पहल' },
    location: { en: 'Pune, Maharashtra', hi: 'पुणे, महाराष्ट्र' },
    title: { en: 'Gaushala project approved in meeting with BVG chairman', hi: 'बीवीजी के चेयरमैन के साथ बैठक में गौशाला परियोजना को स्वीकृति' },
    description: { en: 'A meeting was held today in Pune with Mr. Gaikwad, Chairman of BVG. The Gaushala project received approval in the meeting.', hi: 'आज पुणे में बीवीजी के चेयरमैन श्री गायकवाड़ जी के साथ बैठक हुई। बैठक में गौशाला परियोजना पर स्वीकृति बनी।' },
  },
  {
    id: 'sardar-patel-multi-state-women-loan', date: '2026-11-16', image: '/images/events/sardar-patel-women-cooperative.jpeg',
    imageAlt: { en: 'Federation team members at a meeting', hi: 'बैठक में फेडरेशन की टीम के सदस्य' },
    category: { en: 'Women empowerment', hi: 'महिला सशक्तिकरण' },
    location: { en: '', hi: '' },
    title: { en: '60,000 women join through Sardar Patel Multi State Cooperative', hi: 'सरदार पटेल मल्टी स्टेट कोऑपरेटिव से जुड़ीं 60,000 महिलाएँ' },
    description: { en: 'A group of 60,000 women has joined through Sardar Patel Multi State Cooperative. Of them, 20,000 women will be given a loan of Rs 30,000 each.', hi: 'सरदार पटेल मल्टी स्टेट कोऑपरेटिव के माध्यम से 60,000 महिलाओं का समूह जुड़ा है। इनमें से 20,000 महिलाओं को प्रति महिला 30,000 रुपये का ऋण दिया जाएगा।' },
  },
  {
    id: 'amul-organic-fertilizer-launch-jaipur', date: '', image: '/images/events/amul-organic-launch-jaipur.jpg',
    imageAlt: { en: 'Newspaper report on the Amul Organic Fertilizer launch at Panjrapol Gaushala, Jaipur', hi: 'जयपुर की पिंजरापोल गौशाला में अमूल ऑर्गेनिक फर्टिलाइज़र लॉन्चिंग की अखबार की खबर' },
    category: { en: 'Gaushala initiative', hi: 'गौशाला पहल' },
    location: { en: 'Jaipur, Rajasthan', hi: 'जयपुर, राजस्थान' },
    title: { en: 'Amul Organic Fertilizer launched at Panjrapol Gaushala, Jaipur', hi: 'जयपुर की पिंजरापोल गौशाला में अमूल ऑर्गेनिक फर्टिलाइज़र का भव्य लॉन्चिंग' },
    description: {
      en: 'Rajasthan Governor Shri Haribhau Kisanrao Bagde launched Amul Organic Fertilizer at Panjrapol Gaushala (Surabhi Sadan), Jaipur, to make it available to farmers. The event was organised jointly by the Gaushala family, FPC Bazar Federation and partner organisations, with Amul as sponsor. All products were displayed and an outlet was set up for the public.',
      hi: 'राजस्थान के राज्यपाल श्री हरिभाऊ किशनराव बागड़े ने जयपुर की पिंजरापोल गौशाला (सुरभि सदन) में किसानों के लिए अमूल ऑर्गेनिक फर्टिलाइज़र का लॉन्चिंग किया। कार्यक्रम गौशाला परिवार, एफपीसी बाज़ार फेडरेशन और सहयोगी संस्थाओं ने मिलकर आयोजित किया, जिसमें अमूल स्पॉन्सर के रूप में शामिल रहा। सभी उत्पाद प्रदर्शित किए गए और आम जनता के लिए आउटलेट भी लगाया गया।',
    },
    clipping: true,
  },
  {
    id: "recognition-for-tribal-family-developmen", date: '', image: "/images/events/nandurbar-felicitation.jpg", imageAlt: { en: "FPC representatives being felicitated during a community engagement in Nandurbar", hi: "नंदुरबार में सामुदायिक कार्यक्रम के दौरान सम्मान" },
    category: { en: "Community engagement", hi: "सामुदायिक सहभागिता" },
    location: { en: "Nandurbar, Maharashtra", hi: "नंदुरबार, महाराष्ट्र" },
    title: { en: "Recognition for Tribal Family Development Initiative", hi: "आदिवासी परिवार विकास पहल के लिए सम्मान" },
    description: { en: "Felicitation and blessings received from senior local RSS and BJP representatives for work undertaken under the Samriddh Adivasi Parivar project.", hi: "समृद्ध आदिवासी परिवार परियोजना के अंतर्गत किए गए कार्यों के लिए वरिष्ठ स्थानीय आरएसएस और बीजेपी पदाधिकारियों से सम्मान एवं आशीर्वाद प्राप्त हुआ।" },
  },
  {
    id: "abcd-project-memorandum-of-understanding", date: '', image: "/images/events/abcd-mou-gujarat.jpg", imageAlt: { en: "Agricultural collaboration meeting", hi: "कृषि सहयोग बैठक" },
    category: { en: "Agricultural collaboration", hi: "कृषि सहयोग" },
    location: { en: "Gujarat", hi: "गुजरात" },
    title: { en: "ABCD Project – Memorandum of Understanding", hi: "ABCD परियोजना – समझौता ज्ञापन" },
    description: { en: "An MoU initiative involving Bharatiya Kisan Sangh and Agro Unity, intended to strengthen collaboration around agricultural development.", hi: "भारतीय किसान संघ और Agro Unity की भागीदारी वाली एमओयू पहल, जिसका उद्देश्य कृषि विकास में सहयोग को मजबूत करना है।" },
  },
  {
    id: "participation-in-sri-lakshmi-narayani-go", date: '', image: "/images/events/vellore-gaushala-programme.jpg", imageAlt: { en: "Programme participation in Vellore", hi: "वेल्लोर कार्यक्रम में सहभागिता" },
    category: { en: "Gaushala initiative", hi: "गौशाला पहल" },
    location: { en: "Vellore, Tamil Nadu", hi: "वेल्लोर, तमिलनाडु" },
    title: { en: "Participation in Sri Lakshmi Narayani Golden Temple Programme", hi: "श्री लक्ष्मी नारायणी स्वर्ण मंदिर कार्यक्रम में सहभागिता" },
    description: { en: "Participation in a programme at Sri Lakshmi Narayani Golden Temple, Sripuram, and an opportunity associated with the Gaushala Project.", hi: "श्रीपुरम स्थित श्री लक्ष्मी नारायणी स्वर्ण मंदिर के कार्यक्रम में शामिल होने और गौशाला परियोजना से जुड़ा अवसर प्राप्त हुआ।" },
  },
  {
    id: "action-on-encroachments-from-village-gau", date: '', image: "/images/events/gauchar-land-initiative.jpg", imageAlt: { en: "Federation delegation meeting", hi: "फेडरेशन प्रतिनिधिमंडल की बैठक" },
    category: { en: "Federation update", hi: "फेडरेशन अपडेट" },
    location: { en: "Rajasthan", hi: "राजस्थान" },
    title: { en: "Action on Encroachments from Village Gauchar Land", hi: "गाँवों की गौचर भूमि से अतिक्रमण हटाने की पहल" },
    description: { en: "Acknowledgement to Cabinet Minister Shri Hemant Meena Ji for the departmental order concerning removal of encroachments from village grazing lands across Rajasthan.", hi: "राजस्थान में गाँवों की चारागाह एवं गौचर भूमि से अतिक्रमण हटाने संबंधी विभागीय आदेश के लिए कैबिनेट मंत्री श्री हेमंत मीणा जी का आभार।" },
  },
];

/** Newest first: dated items sorted by date, undated items keep the order written above. */
export const sortedUpdates = () => [...UPDATES].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
export const HOME_COUNT = 4;