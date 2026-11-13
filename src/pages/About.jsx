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
    },
    committeeTitle: 'Advisory Committee',
    committeeSub: 'The committee members and affiliations will be added from the approved committee list in the Federation profile.',
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
    },
    committeeTitle: 'सलाहकार समिति',
    committeeSub: 'समिति के सदस्यों और संबद्धताओं को महासंघ की स्वीकृत प्रोफ़ाइल सूची से जोड़ा जाएगा।',
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
    chairperson: '',
    naveen: '',
    sourabh: '',
    ashok: '',
    narendra: '',
    shyam: '',
    mittal: '',
    nilesh: '',
    rajendra: '',
  },
};

function PersonCard({ person, labels, featured = false }) {
  return (
    <article className={`overflow-hidden rounded-sm border border-brand-100 bg-white ${featured ? 'shadow-md' : 'shadow-sm'}`}>
      <div className={`overflow-hidden bg-brand-50 ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <PhotoSlot slot={person.image} person={person.name} alt={`${person.name} — ${labels.photo}`} />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-gold-600">{labels.role[person.role]}</p>
        <h3 className="mt-1 text-lg font-extrabold text-brand-900">{person.name}</h3>
        {person.detail && <p className="mt-1 text-xs leading-relaxed text-slate-500">{person.detail}</p>}
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
  const profilePeople = members.filter((person) => !hasMsg(person) && person.role !== 'chair');

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
              <span className="rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-bold text-brand-800">{t.cin}: U01100RJ2022NPL078043</span>
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
                {person.detail && <p className="mt-1 text-xs leading-relaxed text-slate-500">{person.detail}</p>}
                <p className="mt-4 whitespace-pre-line border-l-2 border-gold-500 pl-4 text-sm leading-7 text-slate-600">{msgOf(person) || <span className="italic">{t.messagePending}</span>}</p>
              </div>
            </article>
          ))}
        </div>
      </Band>

      {profilePeople.length > 0 && <Band>
        <SectionTitle sub={t.profileSub}>{t.profileTitle}</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profilePeople.map((person) => <PersonCard key={person.key} person={person} labels={t} />)}
        </div>
      </Band>}

      <Band className="bg-brand-50">
        <SectionTitle sub={t.committeeSub}>{t.committeeTitle}</SectionTitle>
        <div className="mx-auto max-w-3xl border border-brand-200 bg-white p-7 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6m3-3h-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <p className="text-sm leading-7 text-slate-600">{t.committeePending}</p>
        </div>
      </Band>

      <Band className="bg-white">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-brand-900">{t.docsTitle}</h2>
            <dl className="divide-y divide-brand-100 border-y border-brand-100">
              <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr]"><dt className="font-bold text-brand-800">{t.cin}</dt><dd>U01100RJ2022NPL078043</dd></div>
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
