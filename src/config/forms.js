// Schema for every form. n = field name, t = input type, r = required, o = options key.
export const FORMS = {
  contact: [
    { n: 'name', t: 'text', r: 1 }, { n: 'phone', t: 'tel', r: 1 }, { n: 'email', t: 'email' },
    { n: 'state', t: 'text' }, { n: 'message', t: 'textarea', r: 1 },
  ],
  register: [
    { n: 'name', t: 'text', r: 1 }, { n: 'organisation', t: 'text' }, { n: 'village', t: 'text' },
    { n: 'district', t: 'text', r: 1 }, { n: 'state', t: 'text', r: 1 }, { n: 'phone', t: 'tel', r: 1 },
    { n: 'activity', t: 'select', o: 'activity', r: 1 }, { n: 'count', t: 'text' },
  ],
  eauto: [
    { n: 'name', t: 'text', r: 1 }, { n: 'age', t: 'number', r: 1, min: 18, max: 60 }, { n: 'phone', t: 'tel', r: 1 },
    { n: 'district', t: 'text', r: 1 }, { n: 'education', t: 'select', o: 'education' },
    { n: 'licence', t: 'select', o: 'licence', r: 1 }, { n: 'area', t: 'text' },
  ],
  amul: [
    { n: 'name', t: 'text', r: 1 }, { n: 'phone', t: 'tel', r: 1 }, { n: 'city', t: 'text', r: 1 },
    { n: 'space', t: 'text' }, { n: 'invest', t: 'text' }, { n: 'loan', t: 'select', o: 'loan' },
  ],
  investor: [
    { n: 'name', t: 'text', r: 1 }, { n: 'organisation', t: 'text' }, { n: 'interest', t: 'select', o: 'interest', r: 1 },
    { n: 'ticket', t: 'text' }, { n: 'phone', t: 'tel', r: 1 }, { n: 'email', t: 'email', r: 1 }, { n: 'message', t: 'textarea' },
  ],
  product: [
    { n: 'name', t: 'text', r: 1 }, { n: 'phone', t: 'tel', r: 1 }, { n: 'cattle', t: 'number', r: 1, min: 1, max: 100000 },
    { n: 'location', t: 'text', r: 1 },
  ],
  // Business Connect forms (new). Backend: see docs/BUSINESS_CONNECT_FORMS.md
  quote: [
    { n: 'subject', t: 'text', r: 1 }, { n: 'name', t: 'text', r: 1 }, { n: 'phone', t: 'tel', r: 1 },
    { n: 'organisation', t: 'text' }, { n: 'quantity', t: 'text' }, { n: 'state', t: 'text' }, { n: 'message', t: 'textarea' },
  ],
  supplier: [
    { n: 'organisation', t: 'text', r: 1 }, { n: 'name', t: 'text', r: 1 }, { n: 'phone', t: 'tel', r: 1 }, { n: 'email', t: 'email' },
    { n: 'supplierType', t: 'select', o: 'supplierType', r: 1 }, { n: 'state', t: 'text', r: 1 }, { n: 'district', t: 'text' },
    { n: 'categories', t: 'text', r: 1 }, { n: 'capacity', t: 'text' }, { n: 'message', t: 'textarea' },
  ],
  sourcing: [
    { n: 'need', t: 'text', r: 1 }, { n: 'quantity', t: 'text', r: 1 }, { n: 'frequency', t: 'select', o: 'frequency' },
    { n: 'destination', t: 'text' }, { n: 'spec', t: 'text' }, { n: 'name', t: 'text', r: 1 }, { n: 'organisation', t: 'text' },
    { n: 'phone', t: 'tel', r: 1 }, { n: 'email', t: 'email' }, { n: 'message', t: 'textarea' },
  ],
  connect: [
    { n: 'role', t: 'select', o: 'connectRole', r: 1 }, { n: 'name', t: 'text', r: 1 }, { n: 'organisation', t: 'text' },
    { n: 'phone', t: 'tel', r: 1 }, { n: 'email', t: 'email' }, { n: 'state', t: 'text', r: 1 }, { n: 'offer', t: 'textarea', r: 1 },
  ],
  // Registration forms (new). Files are sent as multipart/form-data. Backend: see docs/ADMIN_API.md
  fpo: [
    { n: 'fpoName', t: 'text', r: 1 }, { n: 'state', t: 'select', o: 'states', r: 1 }, { n: 'district', t: 'text', r: 1 },
    { n: 'cin', t: 'text', r: 1 }, { n: 'kisanCount', t: 'number', r: 1, min: 1, max: 1000000 }, { n: 'odop', t: 'text' },
    { n: 'name', t: 'text', r: 1 }, { n: 'phone', t: 'tel', r: 1 }, { n: 'email', t: 'email', r: 1 },
    { n: 'certificate', t: 'file', r: 1 }, { n: 'pan', t: 'file', r: 1 }, { n: 'boardResolution', t: 'file', r: 1 },
  ],
  vendor: [
    { n: 'companyName', t: 'text', r: 1 }, { n: 'gst', t: 'text', r: 1 }, { n: 'turnover', t: 'text', r: 1 },
    { n: 'productCategory', t: 'select', o: 'productCats', r: 1 }, { n: 'supplyState', t: 'select', o: 'states', r: 1 },
    { n: 'state', t: 'select', o: 'states', r: 1 }, { n: 'district', t: 'text' },
    { n: 'name', t: 'text', r: 1 }, { n: 'phone', t: 'tel', r: 1 }, { n: 'email', t: 'email', r: 1 },
    { n: 'about', t: 'textarea' }, { n: 'productList', t: 'textarea' }, { n: 'pastWork', t: 'textarea' },
    { n: 'logo', t: 'file' }, { n: 'certificate', t: 'file', r: 1 },
  ],
  ngo: [
    { n: 'ngoName', t: 'text', r: 1 }, { n: 'ngoType', t: 'select', o: 'ngoType', r: 1 },
    { n: 'regNumber', t: 'text', r: 1 }, { n: 'darpanId', t: 'text', r: 1 },
    { n: 'state', t: 'select', o: 'states', r: 1 }, { n: 'district', t: 'text', r: 1 },
    { n: 'yearEstablished', t: 'number', min: 1850, max: 2100 }, { n: 'focusArea', t: 'text', r: 1 },
    { n: 'name', t: 'text', r: 1 }, { n: 'designation', t: 'text' },
    { n: 'phone', t: 'tel', r: 1 }, { n: 'email', t: 'email', r: 1 }, { n: 'about', t: 'textarea' },
    { n: 'certificate', t: 'file', r: 1 }, { n: 'pan', t: 'file', r: 1 },
    { n: 'authorisation', t: 'file', r: 1 }, { n: 'idProof', t: 'file', r: 1 },
    { n: 'cert12ab', t: 'file' }, { n: 'cert80g', t: 'file' }, { n: 'csr1', t: 'file' },
    { n: 'fcra', t: 'file' }, { n: 'financials', t: 'file' },
  ],
  projecthead: [
    { n: 'name', t: 'text', r: 1 }, { n: 'phone', t: 'tel', r: 1 }, { n: 'email', t: 'email' },
    { n: 'experience', t: 'text', r: 1 }, { n: 'state', t: 'select', o: 'states', r: 1 }, { n: 'projectType', t: 'select', o: 'projectType', r: 1 },
    { n: 'message', t: 'textarea' },
  ],
  member: [
    { n: 'name', t: 'text', r: 1 }, { n: 'phone', t: 'tel', r: 1 }, { n: 'email', t: 'email' },
    { n: 'state', t: 'select', o: 'states', r: 1 }, { n: 'organisation', t: 'text' }, { n: 'feeSlip', t: 'file', r: 1 },
  ],
  job: [
    { n: 'name', t: 'text', r: 1 }, { n: 'phone', t: 'tel', r: 1 }, { n: 'email', t: 'email', r: 1 },
    { n: 'position', t: 'text', r: 1 }, { n: 'location', t: 'text', r: 1 }, { n: 'qualification', t: 'text' },
    { n: 'resume', t: 'file', r: 1 }, { n: 'message', t: 'textarea' },
  ],
};
// Labels of NGO form fields that are not in the translation files: { en, hi, mr, gu }.
export const EXTRA_LABELS = {
  ngoName: { en: 'Organisation name', hi: 'संस्था का नाम', mr: 'संस्थेचे नाव', gu: 'સંસ્થાનું નામ' },
  ngoType: { en: 'Organisation type', hi: 'संस्था का प्रकार', mr: 'संस्थेचा प्रकार', gu: 'સંસ્થાનો પ્રકાર' },
  regNumber: { en: 'Registration number', hi: 'पंजीकरण संख्या', mr: 'नोंदणी क्रमांक', gu: 'નોંધણી નંબર' },
  darpanId: { en: 'NGO Darpan ID', hi: 'NGO दर्पण आईडी', mr: 'NGO दर्पण आयडी', gu: 'NGO દર્પણ આઈડી' },
  yearEstablished: { en: 'Year established', hi: 'स्थापना वर्ष', mr: 'स्थापना वर्ष', gu: 'સ્થાપના વર્ષ' },
  focusArea: { en: 'Focus area', hi: 'कार्य क्षेत्र', mr: 'कार्यक्षेत्र', gu: 'કાર્યક્ષેત્ર' },
  designation: { en: 'Designation', hi: 'पद', mr: 'पद', gu: 'હોદ્દો' },
  authorisation: { en: 'Authorisation letter', hi: 'प्राधिकरण पत्र', mr: 'प्राधिकार पत्र', gu: 'અધિકૃતતા પત્ર' },
  idProof: { en: 'Representative ID proof', hi: 'प्रतिनिधि का पहचान पत्र', mr: 'प्रतिनिधीचा ओळख पुरावा', gu: 'પ્રતિનિધિનો ઓળખ પુરાવો' },
  cert12ab: { en: '12AB certificate', hi: '12AB प्रमाणपत्र', mr: '12AB प्रमाणपत्र', gu: '12AB પ્રમાણપત્ર' },
  cert80g: { en: '80G certificate', hi: '80G प्रमाणपत्र', mr: '80G प्रमाणपत्र', gu: '80G પ્રમાણપત્ર' },
  csr1: { en: 'CSR-1 certificate', hi: 'CSR-1 प्रमाणपत्र', mr: 'CSR-1 प्रमाणपत्र', gu: 'CSR-1 પ્રમાણપત્ર' },
  fcra: { en: 'FCRA certificate', hi: 'FCRA प्रमाणपत्र', mr: 'FCRA प्रमाणपत्र', gu: 'FCRA પ્રમાણપત્ર' },
  financials: { en: 'Financial statements', hi: 'वित्तीय विवरण', mr: 'आर्थिक विवरणपत्रे', gu: 'નાણાકીય પત્રકો' },
};
