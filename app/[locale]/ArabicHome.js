import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import ScrollReveal from "@/components/ScrollReveal";
import {
  quartiersAr,
  biensAr,
  personasAr,
  funnelAr,
  temoignagesAr,
  contact,
} from "@/data/content";

const planSvgs = {
  apartment: (
    <svg viewBox="0 0 300 225" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="225" fill="#1B1F22" />
      <polygon points="0,180 90,90 160,150 230,60 300,150 300,225 0,225" fill="none" stroke="#3A3F44" />
      <circle cx="240" cy="40" r="18" fill="none" stroke="#A97C3F" />
    </svg>
  ),
  villa: (
    <svg viewBox="0 0 300 225" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="225" fill="#1B1F22" />
      <rect x="60" y="80" width="180" height="100" fill="none" stroke="#3A3F44" />
      <polygon points="60,80 150,40 240,80" fill="none" stroke="#3A3F44" />
      <line x1="150" y1="40" x2="150" y2="180" stroke="#3A3F44" />
    </svg>
  ),
  duplex: (
    <svg viewBox="0 0 300 225" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="225" fill="#1B1F22" />
      <rect x="40" y="60" width="90" height="120" fill="none" stroke="#3A3F44" />
      <rect x="150" y="90" width="110" height="90" fill="none" stroke="#3A3F44" />
    </svg>
  ),
};

export default function ArabicHome() {
  return (
    <>
      <header>
        <nav>
          <a href="/ar" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image src="/logo.jpeg" alt="Domify" width={34} height={34} style={{ borderRadius: 4 }} />
            <span className="logo">دوميفي</span>
          </a>
          <div className="nav-links">
            <a href="#quartiers">الأحياء</a>
            <a href="#biens">العقارات</a>
            <a href="#tunnel">كيف يعمل الأمر</a>
            <a href="#contact">اتصل بنا</a>
            <a href="/" style={{ color: "var(--bronze-light)" }}>
              Français
            </a>
          </div>
          <a className="nav-cta" href="#contact">
            تحدث مع مستشار
          </a>
        </nav>
      </header>

      <section className="hero">
        <div className="wrap hero-inner">
          <div>
            <span className="eyebrow mono">الدار البيضاء — عقارات متوسطة وراقية</span>
            <h1>
              العنوان لا يُباع.
              <br />
              <em>إنه يُروى.</em>
            </h1>
            <p className="lead">
              دوميفي ترافقكم في بيع العقارات المتوسطة والراقية بالدار البيضاء، بتسويق مصمم
              لخلق انطباع راقٍ منذ أول زيارة.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#contact">
                تواصل عبر واتساب
              </a>
              <a className="btn btn-ghost" href="#biens">
                شاهد العقارات
              </a>
            </div>
          </div>
          <div className="hero-plan reveal">
            <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="20" width="360" height="460" stroke="#3A3F44" strokeWidth="1" />
              <line x1="20" y1="180" x2="380" y2="180" stroke="#3A3F44" strokeWidth="1" />
              <line x1="220" y1="20" x2="220" y2="180" stroke="#3A3F44" strokeWidth="1" />
              <line x1="20" y1="340" x2="380" y2="340" stroke="#3A3F44" strokeWidth="1" />
              <line x1="140" y1="180" x2="140" y2="480" stroke="#3A3F44" strokeWidth="1" />
              <line x1="260" y1="340" x2="260" y2="480" stroke="#3A3F44" strokeWidth="1" />
              <circle cx="60" cy="60" r="14" stroke="#A97C3F" strokeWidth="1.2" />
              <rect x="250" y="60" width="90" height="60" stroke="#A97C3F" strokeWidth="1" />
            </svg>
            <div className="hero-plan-label mono">مخطط توضيحي — 001</div>
          </div>
        </div>
      </section>

      <section className="pillars">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="tag">التموقع</span>
              <h2>ثلاث ركائز للبيع بما يتجاوز السعر بالمتر المربع.</h2>
            </div>
            <p>السوق العقاري بالدار البيضاء ما زال ضعيف الرقمنة. هذا هو الفارق الذي تسده دوميفي.</p>
          </div>
          <div className="pillar-grid reveal">
            <div className="pillar">
              <span className="num mono">01</span>
              <h3>تسويق عاطفي</h3>
              <p>كل عقار يُعرض كمكان للعيش، وليس كورقة تقنية — لتسريع قرار الشراء.</p>
            </div>
            <div className="pillar">
              <span className="num mono">02</span>
              <h3>فيديوهات غامرة</h3>
              <p>زيارات مصورة ومونتاج احترافي لإثارة الرغبة في الزيارة، تُنشر أولا على تيك توك وريلز.</p>
            </div>
            <div className="pillar">
              <span className="num mono">03</span>
              <h3>هوية بصرية راقية</h3>
              <p>عرض متناسق في كل الوسائط لترسيخ انطباع راقٍ منذ البداية.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="quartiers" id="quartiers">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="tag">الأحياء المستهدفة</span>
              <h2>سجل أحياء، لا خريطة عامة.</h2>
            </div>
            <p>ستة أحياء يشهد فيها الطلب الراقي أكبر نشاط بالدار البيضاء.</p>
          </div>
          <div className="registry reveal">
            {quartiersAr.map((q) => (
              <div className="reg-row" key={q.idx}>
                <span className="idx">{q.idx}</span>
                <span className="name">{q.name}</span>
                <span className="desc">{q.desc}</span>
                <span className="price">{q.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="biens" id="biens">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="tag">الاختيارات</span>
              <h2>عقارات مميزة.</h2>
            </div>
            <p>أمثلة توضيحية — يجب استبدالها بإعلاناتكم الحقيقية وصور فعلية.</p>
          </div>
          <span className="biens-note mono reveal">
            محتوى تجريبي — يُستبدل بإعلانات حقيقية قبل النشر
          </span>
          <div className="biens-grid reveal">
            {biensAr.map((b) => (
              <div className="biens-card" key={b.title}>
                <div className="biens-visual">
                  <span className="biens-tag">مثال</span>
                  {planSvgs[b.plan]}
                </div>
                <div className="biens-body">
                  <h3>{b.title}</h3>
                  <div className="loc mono">{b.loc}</div>
                  <div className="biens-meta">
                    <span>{b.surface}</span>
                    <span className="price">{b.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="personas">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="tag">لمن هذا العرض</span>
              <h2>ثلاث فئات، ثلاثة خطابات مختلفة.</h2>
            </div>
            <p>النبرة والقناة تتغيران حسب من يشاهد الإعلان.</p>
          </div>
          <div className="persona-grid reveal">
            {personasAr.map((p) => (
              <div className="persona" key={p.title}>
                <span className="range mono">{p.range}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="funnel" id="tunnel">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="tag">مسار البيع</span>
              <h2>من الفيديو المنتشر إلى التوقيع.</h2>
            </div>
          </div>
          <div className="funnel-track reveal">
            {funnelAr.map((f) => (
              <div className="funnel-step" key={f.n}>
                <span className="n mono">{f.n}</span>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="temoignages">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="tag">الثقة</span>
              <h2>ماذا يقول عملاؤنا.</h2>
            </div>
          </div>
          <div className="temoin-grid reveal">
            {temoignagesAr.map((tItem) => (
              <div className="temoin" key={tItem.who + tItem.role}>
                <span className="example-badge mono">مثال يُستبدل</span>
                <span className="quote-mark">"</span>
                <p className="txt">{tItem.txt}</p>
                <div className="who">{tItem.who}</div>
                <div className="role">{tItem.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="wrap contact-inner">
          <div className="reveal">
            <span className="eyebrow mono">اتصل بنا</span>
            <h2>لديك عقار للبيع أو مشروع شراء؟</h2>
            <p>دقيقتان لإخبارنا بما تبحثون عنه — سنرد عليكم عبر واتساب، من الاثنين إلى السبت.</p>
            <LeadForm lang="ar" />
          </div>
          <div className="contact-cards reveal">
            <div className="ccard">
              <span className="label">واتساب بيزنس</span>
              <span className="val">{contact.whatsapp}</span>
            </div>
            <div className="ccard">
              <span className="label">البريد الإلكتروني</span>
              <span className="val">{contact.email}</span>
            </div>
            <div className="ccard">
              <span className="label">المنطقة</span>
              <span className="val">الدار البيضاء — عين الذياب، المعاريف، الراسين…</span>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>© 2026 دوميفي — وكالة تسويق عقاري، الدار البيضاء.</span>
          <a href="/fr/mentions-legales" style={{ color: "var(--stone-dim)" }}>
            Mentions légales
          </a>
        </div>
      </footer>
      <ScrollReveal />
    </>
  );
}
