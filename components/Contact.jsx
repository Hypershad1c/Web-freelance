import { contact } from "@/data/content";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner">
        <div className="reveal">
          <span className="eyebrow mono">Contact</span>
          <h2>Un bien à vendre ou un projet d&apos;achat ?</h2>
          <p>Écrivez-nous sur WhatsApp — réponse en moins de 24h, du lundi au samedi.</p>
          <a className="btn btn-primary" href={contact.whatsappLink}>
            Discuter sur WhatsApp
          </a>
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
