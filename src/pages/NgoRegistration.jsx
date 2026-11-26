import { useLang } from '../i18n/hooks.jsx';
import { pick } from '../i18n/langs.js';
import { PageHero, Band } from '../components/ui.jsx';
import FormEngine from '../components/FormEngine.jsx';

const TEXT = {
  title: { en: 'NGO registration', hi: 'NGO पंजीकरण', mr: 'NGO नोंदणी', gu: 'NGO નોંધણી' },
  sub: {
    en: 'Provide your organisation and authorised representative details.',
    hi: 'संस्था और अधिकृत प्रतिनिधि की जानकारी दें।',
    mr: 'संस्था आणि अधिकृत प्रतिनिधीची माहिती द्या.',
    gu: 'સંસ્થા અને અધિકૃત પ્રતિનિધિની માહિતી આપો.',
  },
};

export default function NgoRegistration() {
  const lang = useLang();
  const title = pick(TEXT.title, lang);
  return <><PageHero title={title} crumb={title} sub={pick(TEXT.sub, lang)} /><Band><div className="mx-auto max-w-3xl"><FormEngine formKey="ngo" title={title} /></div></Band></>;
}
