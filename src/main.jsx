import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  HeartPulse,
  MapPin,
  Menu,
  MoveRight,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react';
import './styles.css';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Conditions', path: '/conditions' },
  { label: 'About', path: '/about' },
  { label: 'Approach', path: '/approach' },
  { label: 'Fees', path: '/fees' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Contact', path: '/contact' },
];

const services = [
  {
    icon: HeartPulse,
    title: 'Physiotherapy assessment',
    text: 'Unhurried movement, strength and symptom review with a clear recovery plan before you leave.',
  },
  {
    icon: Activity,
    title: 'Sports injury rehab',
    text: 'Progressive loading, return-to-run planning and sport-specific milestones for confident return.',
  },
  {
    icon: Dumbbell,
    title: 'Strength and mobility',
    text: 'Practical programmes for desk posture, mobility restrictions, tendon pain and recurring niggles.',
  },
  {
    icon: ShieldCheck,
    title: 'Post-operative rehab',
    text: 'Stage-based rehabilitation after consultant-led treatment, surgery or immobilisation.',
  },
];

const conditions = [
  'Back and neck pain',
  'Shoulder pain',
  'Hip and groin pain',
  'Knee injuries',
  'Running injuries',
  'Tendon pain',
  'Posture and work strain',
  'Post-surgery rehab',
  'Ankle sprains',
  'General mobility loss',
];

const fees = [
  ['Initial assessment', '45-60 minutes', '£___'],
  ['Follow-up session', '30-45 minutes', '£___'],
  ['Online consultation', '30 minutes', '£___'],
  ['London home visit', 'Area dependent', 'From £___'],
];

const faqs = [
  ['Do I need a GP referral?', 'No. You can book directly. If your symptoms need medical review, you will be signposted appropriately.'],
  ['What should I wear?', 'Wear comfortable clothing that lets you move and allows the relevant area to be assessed respectfully.'],
  ['Can you help with long-term pain?', 'Physiotherapy may help you understand patterns, build capacity and manage symptoms with a realistic plan.'],
  ['Do you offer home visits in London?', 'Yes, the site is prepared for London home-visit availability. Final areas and fees can be added later.'],
  ['Can I claim through insurance?', 'Insurance details should be added once provider recognition and billing preferences are confirmed.'],
  ['How many sessions will I need?', 'That depends on the issue, goals and response to treatment. You should always have a clear review point.'],
];

const testimonials = [
  {
    quote:
      'The plan was simple, specific and easy to keep up with between sessions. I finally understood what to do and why.',
    name: 'Private client, Islington',
  },
  {
    quote:
      'Calm, thoughtful care. My shoulder rehab felt measured rather than rushed, and every session had a purpose.',
    name: 'Desk-based professional, Shoreditch',
  },
  {
    quote:
      'The return-to-running plan was the difference. Clear milestones, sensible load increases and no guesswork.',
    name: 'Runner, Clapham',
  },
];

const processSteps = [
  ['01', 'Listen and map the problem', 'A clear history, symptom pattern and movement screen shape the starting point.'],
  ['02', 'Treat what matters now', 'Hands-on care, education and targeted exercise are used where they add value.'],
  ['03', 'Build capacity', 'Strength, mobility and control are progressed with practical markers you can feel.'],
  ['04', 'Return with confidence', 'The plan ends with self-management, prevention and sport or work-specific progression.'],
];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  function navigate(nextPath) {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  React.useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return { path, navigate };
}

function App() {
  const { path, navigate } = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const activePage = useMemo(() => {
    if (path === '/about') return <AboutPage navigate={navigate} />;
    if (path === '/services') return <ServicesPage navigate={navigate} />;
    if (path === '/conditions') return <ConditionsPage navigate={navigate} />;
    if (path === '/approach') return <ApproachPage navigate={navigate} />;
    if (path === '/fees') return <FeesPage navigate={navigate} />;
    if (path === '/faqs') return <FaqPage navigate={navigate} />;
    if (path === '/contact') return <ContactPage />;
    return <HomePage navigate={navigate} />;
  }, [path, navigate]);

  return (
    <div className="site-shell">
      <Header
        path={path}
        navigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>{activePage}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({ path, navigate, menuOpen, setMenuOpen }) {
  return (
    <header className="header">
      <button className="brand" onClick={() => navigate('/')} aria-label="Go to home">
        <img className="brand-logo" src="/brand/bodynetics-logo.png" alt="Bodynetics Physiotherapy Clinic London" />
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={path === item.path ? 'nav-link active' : 'nav-link'}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button className="header-cta" onClick={() => navigate('/contact')}>
        Book a consultation
        <ArrowRight size={17} />
      </button>
      <button
        className="mobile-menu-button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      {menuOpen && (
        <div className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={path === item.path ? 'mobile-link active' : 'mobile-link'}
              onClick={() => {
                navigate(item.path);
                setMenuOpen(false);
              }}
            >
              {item.label}
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <h1>London physio care for movement and recovery.</h1>
          <p>
            Bodynetics blends careful assessment, modern rehabilitation and calm clinical guidance
            for pain, injury and performance goals.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => navigate('/contact')}>
              Request an appointment
              <MoveRight size={18} />
            </button>
            <button className="secondary-button" onClick={() => navigate('/services')}>
              Explore services
            </button>
          </div>
        </div>
        <div className="hero-media" aria-label="Physiotherapy treatment room">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=84"
            alt="Physiotherapist guiding a mobility exercise"
          />
          <div className="hero-card">
            <img src="/brand/bodynetics-mark.png" alt="" />
            <span>Assessment-led care, practical plans, London-based appointments.</span>
          </div>
        </div>
      </section>
      <TrustStrip />
      <ServicesPreview navigate={navigate} />
      <ApproachBand navigate={navigate} />
      <Testimonials />
      <ContactBand navigate={navigate} />
    </>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Practice highlights">
      <div>
        <strong>HCPC</strong>
        <span>registered with HCPC</span>
      </div>
      <div>
        <strong>CSP</strong>
        <span>registered with CSP</span>
      </div>
      <div>
        <strong>London</strong>
        <span>clinic, home visit and online options</span>
      </div>
    </section>
  );
}

function ServicesPreview({ navigate }) {
  return (
    <section className="section">
      <SectionIntro
        title="Care that feels considered, not templated."
        text="Each session is shaped around your injury history, lifestyle and return goals, with enough structure to know what progress should look like."
      />
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <service.icon size={26} />
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
      <div className="centered-action">
        <button className="secondary-button dark" onClick={() => navigate('/services')}>
          View all services
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}

function ApproachBand({ navigate }) {
  return (
    <section className="approach-band">
      <div className="approach-image">
        <img
          src="https://images.unsplash.com/photo-1600881333168-2ef49b341f30?auto=format&fit=crop&w=1200&q=82"
          alt="Quiet physiotherapy studio with exercise equipment"
        />
      </div>
      <div className="approach-copy">
        <h2>A quieter, more precise way to recover.</h2>
        <p>
          The experience is built to reduce uncertainty. You get a diagnosis-informed explanation,
          a manageable home plan and review points that show whether treatment is working.
        </p>
        <ul className="check-list">
          <li><Check size={18} /> Calm assessment and clear clinical reasoning</li>
          <li><Check size={18} /> Progressive rehab matched to your week</li>
          <li><Check size={18} /> Return-to-sport, work and daily-life planning</li>
        </ul>
        <button className="primary-button compact" onClick={() => navigate('/approach')}>
          See the approach
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section muted">
      <SectionIntro
        title="Clients come for clarity as much as treatment."
        text="Bodynetics is designed for people who want the why, the plan and the next step to be obvious."
      />
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <article className="testimonial-card" key={item.name}>
            <div className="stars" aria-label="Five star review">
              {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={16} fill="currentColor" />)}
            </div>
            <p>“{item.quote}”</p>
            <strong>{item.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactBand({ navigate }) {
  return (
    <section className="contact-band">
      <div>
        <h2>Ready to plan your recovery?</h2>
        <p>Send an enquiry now, then add your Calendly booking link when it is ready.</p>
      </div>
      <button className="primary-button light" onClick={() => navigate('/contact')}>
        Contact Bodynetics
        <ArrowRight size={18} />
      </button>
    </section>
  );
}

function AboutPage({ navigate }) {
  return (
    <PageFrame
      title="A London physiotherapy practice built around better movement decisions."
      text="Bodynetics is a personal portfolio site for a private physiotherapist focused on pain, injury rehabilitation and active long-term confidence."
      image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=82"
      imageAlt="Physiotherapist guiding a mobility exercise"
    >
      <section className="split-section">
        <div>
          <h2>Clinical care with room to breathe.</h2>
          <p>
            The practice is intentionally personal. Sessions are not built around rushed protocols;
            they are built around listening well, testing what matters and giving you a route that
            works in the real world.
          </p>
          <p>
            The tone is calm, direct and evidence-informed, with practical guidance for people
            balancing busy London work, sport, travel and family life.
          </p>
        </div>
        <div className="profile-panel">
          <h3>What to expect</h3>
          <ul className="stack-list">
            <li>Detailed assessment and plain-English explanation</li>
            <li>Hands-on treatment where clinically useful</li>
            <li>Exercise plans designed for actual adherence</li>
            <li>Review points for progress, confidence and independence</li>
          </ul>
        </div>
      </section>
      <ContactBand navigate={navigate} />
    </PageFrame>
  );
}

function ServicesPage({ navigate }) {
  return (
    <PageFrame
      title="Physiotherapy services for recovery, resilience and performance."
      text="Choose the support you need now, then progress into a plan that keeps you moving beyond the first pain-free week."
      image="https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=1400&q=82"
      imageAlt="Physiotherapy rehabilitation with resistance band"
    >
      <section className="service-detail-list">
        {services.map((service) => (
          <article key={service.title} className="service-detail">
            <div className="service-icon"><service.icon size={24} /></div>
            <div>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="wide-panel">
        <h2>Appointments can support</h2>
        <div className="condition-cloud">
          {conditions.map((condition) => <span key={condition}>{condition}</span>)}
        </div>
      </section>
      <ContactBand navigate={navigate} />
    </PageFrame>
  );
}

function ConditionsPage({ navigate }) {
  return (
    <PageFrame
      title="Common conditions treated with calm, structured rehabilitation."
      text="Every condition starts with assessment. The list below is a guide, not a diagnosis, and urgent symptoms should always be assessed by appropriate medical services."
      image="https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=1400&q=82"
      imageAlt="Person stretching in a rehabilitation studio"
    >
      <section className="condition-grid">
        {conditions.map((condition) => (
          <article key={condition} className="condition-card">
            <Check size={18} />
            <h2>{condition}</h2>
            <p>Assessment-led support with a clear plan for symptoms, strength and return goals.</p>
          </article>
        ))}
      </section>
      <ContactBand navigate={navigate} />
    </PageFrame>
  );
}

function ApproachPage({ navigate }) {
  return (
    <PageFrame
      title="A four-stage approach to understanding, treating and progressing."
      text="The aim is not just to feel better in the clinic. The aim is to know what is changing and how to keep improving."
      image="https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1400&q=82"
      imageAlt="Rehabilitation space with training equipment"
    >
      <section className="process-list">
        {processSteps.map(([number, title, text]) => (
          <article key={number} className="process-card">
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="wide-panel two-column-panel">
        <div>
          <h2>Designed for busy London weeks.</h2>
          <p>
            Home plans are concise and progressive, so they can fit around work, training and
            travel instead of becoming another source of stress.
          </p>
        </div>
        <button className="primary-button compact" onClick={() => navigate('/contact')}>
          Start with an enquiry
          <ArrowRight size={17} />
        </button>
      </section>
    </PageFrame>
  );
}

function FeesPage({ navigate }) {
  return (
    <PageFrame
      title="Transparent session options, ready for your final fee structure."
      text="Add exact prices when confirmed. The page is designed to make appointment types, session lengths and booking routes easy to compare."
      image="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1400&q=82"
      imageAlt="Physiotherapy notes and appointment planning"
    >
      <section className="fees-grid">
        {fees.map(([title, duration, price]) => (
          <article className="fee-card" key={title}>
            <h2>{title}</h2>
            <p>{duration}</p>
            <strong>{price}</strong>
          </article>
        ))}
      </section>
      <section className="wide-panel two-column-panel">
        <div>
          <h2>Booking notes</h2>
          <p>
            Add your cancellation policy, insurance position and payment preferences here once
            confirmed. Keep the wording plain and visible before clients book.
          </p>
        </div>
        <button className="primary-button compact" onClick={() => navigate('/contact')}>
          Book via Calendly
          <ArrowRight size={17} />
        </button>
      </section>
    </PageFrame>
  );
}

function FaqPage({ navigate }) {
  return (
    <PageFrame
      title="Useful answers before your first physiotherapy appointment."
      text="Practical details for London appointments, referrals, clothing, insurance and what treatment may involve."
      image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=82"
      imageAlt="Clinician discussing a care plan"
    >
      <section className="faq-list">
        {faqs.map(([question, answer]) => (
          <article className="faq-item" key={question}>
            <h2>{question}</h2>
            <p>{answer}</p>
          </article>
        ))}
      </section>
      <ContactBand navigate={navigate} />
    </PageFrame>
  );
}

function ContactPage() {
  return (
    <PageFrame
      title="Contact Bodynetics and request an appointment."
      text="Use the enquiry form now. When your Calendly link is ready, it can replace the booking placeholder below."
      image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=82"
      imageAlt="Physiotherapist guiding a mobility exercise"
    >
      <section className="contact-layout">
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Full name
            <input type="text" name="name" autoComplete="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label>
            Phone
            <input type="tel" name="phone" autoComplete="tel" placeholder="+44" />
          </label>
          <label>
            Preferred appointment type
            <select name="appointmentType" defaultValue="">
              <option value="" disabled>Select an option</option>
              <option>Clinic appointment</option>
              <option>London home visit</option>
              <option>Online consultation</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label>
            Reason for visit
            <textarea name="message" rows="5" placeholder="Tell me about the injury, pain or goal." required />
          </label>
          <button className="primary-button" type="submit">
            Send enquiry
            <ArrowRight size={18} />
          </button>
          <p className="form-note">Please avoid sending urgent or highly sensitive medical details through this placeholder form.</p>
        </form>
        <aside className="booking-panel">
          <CalendarDays size={30} />
          <h2>Calendly booking</h2>
          <p>
            Add your Calendly URL here when available. The current button is a safe placeholder
            so the layout is already built.
          </p>
          <a className="secondary-button dark full" href="https://calendly.com/" target="_blank" rel="noreferrer">
            Calendly placeholder
            <ArrowRight size={17} />
          </a>
          <div className="contact-details">
            <span><MapPin size={17} /> London, United Kingdom</span>
            <span><Clock3 size={17} /> Weekday appointments</span>
            <span><ShieldCheck size={17} /> Confidential clinical enquiry route to be connected</span>
          </div>
        </aside>
      </section>
    </PageFrame>
  );
}

function PageFrame({ title, text, image, imageAlt, children }) {
  return (
    <>
      <section className="page-hero">
        <div>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <img src={image} alt={imageAlt} />
      </section>
      {children}
    </>
  );
}

function SectionIntro({ title, text }) {
  return (
    <div className="section-intro">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img className="footer-logo" src="/brand/bodynetics-logo.png" alt="Bodynetics Physiotherapy Clinic London" />
        <div>
          <p>London physiotherapy for injury, recovery and movement confidence.</p>
        </div>
      </div>
      <div className="footer-links">
        {navItems.map((item) => (
          <button key={item.path} onClick={() => navigate(item.path)}>{item.label}</button>
        ))}
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
