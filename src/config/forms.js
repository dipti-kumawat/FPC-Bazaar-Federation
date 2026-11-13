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
};
