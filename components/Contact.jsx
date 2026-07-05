import { contact } from "@/data/content";
import LeadForm from "@/components/LeadForm";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner">
        <div className="reveal">
          <span className="eyebrow mono">Contact</span>
          <h2>Un bien à vendre ou un projet d&apos;achat ?</h2>
          <p>
            Deux minutes pour nous dire ce que vous cherchez — on vous répond ensuite sur
            WhatsApp, du lundi au samedi.
          </p>
          <LeadForm />
        </div>
        <div className="contact-cards reveal">
          <div className="ccard">
            <span className="label">WhatsApp Business</span>
            <span className="val">{contact.whatsapp}</span>
          </div>
          <div className="ccard">
            <span className="label">Email</span>
            <span className="val">{contact.email}</span>
          </div>
          <div className="ccard">
            <span className="label">Zone</span>
            <span className="val">{contact.zone}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
