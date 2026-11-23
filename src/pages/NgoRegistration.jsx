import { useLang } from '../i18n/hooks.jsx';
import { PageHero, Band } from '../components/ui.jsx';
import FormEngine from '../components/FormEngine.jsx';
export default function NgoRegistration() {
  const hi = useLang() === 'hi';
  const title = hi ? 'NGO पंजीकरण' : 'NGO registration';
  return <><PageHero title={title} crumb={title} sub={hi ? 'संस्था और अधिकृत प्रतिनिधि की जानकारी दें।' : 'Provide your organisation and authorised representative details.'} /><Band><div className="mx-auto max-w-3xl"><FormEngine formKey="ngo" title={title} /></div></Band></>;
}
