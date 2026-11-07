import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { BookOpen, Calculator, FlaskConical, GraduationCap, Users, Trophy, Clock, CheckCircle2, Phone, MapPin, Mail, ArrowRight, Menu, X, Lightbulb, PenLine, ClipboardCheck, LineChart } from "lucide-react";
import hero from "@/assets/hero-students.jpg";
import { GraduateLogo, ScrollGraduationCap } from "@/components/scroll-graduation-cap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elite Study Point | Coaching for Classes 6–12" },
      { name: "description", content: "Elite Study Point offers focused coaching for Classes 6–12 with small batches, expert teachers and regular tests." },
      { property: "og:title", content: "Elite Study Point | Coaching for Classes 6–12" },
      { property: "og:description", content: "Small batches, expert teachers and a proven four-step learning approach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const nav = [["Classes", "#classes"], ["Approach", "#approach"], ["Why us", "#why"], ["Contact", "#enquiry"]];

const classes = [
  { icon: BookOpen, title: "Classes 6–8", desc: "Strong foundations in Maths, Science and English.", tags: ["All subjects", "Weekly tests"] },
  { icon: Calculator, title: "Classes 9–10", desc: "Board-focused preparation with full syllabus coverage.", tags: ["CBSE / State", "Mock boards"] },
  { icon: FlaskConical, title: "Classes 11–12 Science", desc: "Physics, Chemistry, Maths and Biology in depth.", tags: ["PCM / PCB", "Practicals"] },
  { icon: GraduationCap, title: "Classes 11–12 Commerce", desc: "Accounts, Economics and Business Studies made clear.", tags: ["Concept-led", "Case studies"] },
];

const steps = [
  { icon: Lightbulb, title: "Understand", desc: "Concepts explained simply, with real examples." },
  { icon: PenLine, title: "Practise", desc: "Guided worksheets and daily homework." },
  { icon: ClipboardCheck, title: "Test", desc: "Weekly tests that mirror exam patterns." },
  { icon: LineChart, title: "Improve", desc: "Personal feedback and parent progress reports." },
];

function Index() {
  useReveal();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; klass?: string }>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const err: { name?: string; phone?: string; klass?: string } = {};
    if (!String(f.get("name")).trim()) err.name = "Please enter the student's name.";
    if (!/^[0-9+\s-]{10,15}$/.test(String(f.get("phone")).trim())) err.phone = "Enter a valid 10-digit phone number.";
    if (!f.get("klass")) err.klass = "Please choose a class.";
    setErrors(err);
    if (Object.keys(err).length === 0) { setSent(true); e.currentTarget.reset(); }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollGraduationCap />
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><GraduationCap className="size-5" /></span>
            <span className="font-display text-lg font-bold text-primary-deep">Elite Study Point</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map(([l, h]) => <a key={h} href={h} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{l}</a>)}
            <a href="#enquiry" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">Enquire now</a>
          </nav>
          <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <div className="border-t border-border bg-background px-5 py-4 md:hidden">
            {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block py-2 font-medium">{l}</a>)}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-40 -top-40 size-[520px] rounded-full bg-secondary blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-rise">
            <GraduateLogo position="start" />
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground">
              <span className="size-2 rounded-full bg-primary" /> Admissions open for 2026–27
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-primary-deep md:text-6xl">
              Where steady effort becomes <span className="text-primary">top results.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">Focused coaching for Classes 6–12 with small batches, caring teachers and a clear plan for every student.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#enquiry" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-lift transition hover:-translate-y-0.5">Book a free demo <ArrowRight className="size-4" /></a>
              <a href="#classes" className="rounded-full border border-border bg-card px-7 py-3.5 font-semibold text-primary transition hover:border-primary">View classes</a>
            </div>
          </div>
          <div className="relative animate-rise" style={{ animationDelay: ".15s" }}>
            <img src={hero} alt="Students learning with their teacher at Elite Study Point" width={1280} height={1024} className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-lift" />
            <div className="absolute -left-4 bottom-8 flex animate-float items-center gap-3 rounded-2xl bg-card p-4 shadow-lift md:-left-10">
              <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary"><Trophy className="size-5" /></span>
              <div><p className="font-display text-xl font-bold text-primary-deep">95%</p><p className="text-xs text-muted-foreground">Board pass rate</p></div>
            </div>
            <div className="absolute -right-3 top-8 flex animate-float items-center gap-3 rounded-2xl bg-card p-4 shadow-lift md:-right-8" style={{ animationDelay: "1.5s" }}>
              <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary"><Users className="size-5" /></span>
              <div><p className="font-display text-xl font-bold text-primary-deep">15</p><p className="text-xs text-muted-foreground">Students per batch</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section id="classes" className="mx-auto max-w-6xl px-5 py-20">
        <div className="reveal max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our classes</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary-deep md:text-4xl">The right batch for every stage</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((c, i) => (
            <article key={c.title} className="reveal group flex flex-col rounded-3xl border border-border bg-card p-7 transition duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><c.icon className="size-6" /></span>
              <h3 className="mt-6 text-lg font-bold">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">{c.tags.map((t) => <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-secondary-foreground">{t}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="bg-gradient-deep py-20 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5">
          <div className="reveal max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Teaching approach</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">A four-step learning journey</h2>
          </div>
          <div className="relative mt-14 grid gap-10 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-primary-foreground/20 md:block" />
            {steps.map((s, i) => (
              <div key={s.title} className="reveal relative" style={{ transitionDelay: `${i * 150}ms` }}>
                <span className="relative grid size-14 place-items-center rounded-full bg-primary-foreground text-primary shadow-lift"><s.icon className="size-6" /></span>
                <p className="mt-6 text-xs font-semibold text-accent">STEP 0{i + 1}</p>
                <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/75">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="mx-auto grid max-w-6xl gap-6 px-5 py-20 sm:grid-cols-2 lg:grid-cols-4">
        {[[Users, "Small batches", "Every student gets noticed."], [GraduationCap, "Expert teachers", "Experienced, subject specialists."], [Clock, "Flexible timings", "Morning and evening batches."], [Trophy, "Proven results", "Toppers every single year."]].map(([I, t, d], i) => {
          const Icon = I as typeof Users;
          return (
            <div key={t as string} className="reveal rounded-3xl bg-muted p-7" style={{ transitionDelay: `${i * 80}ms` }}>
              <Icon className="size-7 text-primary" />
              <h3 className="mt-4 font-bold">{t as string}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
            </div>
          );
        })}
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="mx-auto max-w-6xl px-5 pb-24">
        <div className="reveal grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift md:grid-cols-5">
          <div className="bg-gradient-primary p-10 text-primary-foreground md:col-span-2">
            <h2 className="font-display text-3xl font-bold">Book a free demo class</h2>
            <p className="mt-3 text-primary-foreground/80">Tell us a little about the student and we'll call you back within a day.</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex gap-3"><Phone className="size-5" /> +91 98765 43210</li>
              <li className="flex gap-3"><Mail className="size-5" /> hello@elitestudypoint.in</li>
              <li className="flex gap-3"><MapPin className="size-5" /> Main Road, Your City</li>
            </ul>
          </div>
          <div className="p-8 md:col-span-3 md:p-10">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 className="size-14 text-primary" />
                <h3 className="mt-4 text-2xl font-bold">Thank you!</h3>
                <p className="mt-2 text-muted-foreground">We've received your enquiry and will call you soon.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline">Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                <Field label="Student name" name="name" error={errors.name} />
                <Field label="Phone number" name="phone" type="tel" error={errors.phone} />
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium">Class</span>
                  <select name="klass" defaultValue="" aria-invalid={!!errors.klass} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/20 aria-invalid:border-destructive">
                    <option value="" disabled>Select a class</option>
                    {["6", "7", "8", "9", "10", "11 Science", "11 Commerce", "12 Science", "12 Commerce"].map((c) => <option key={c}>Class {c}</option>)}
                  </select>
                  {errors.klass && <span className="mt-1 block text-xs text-destructive">{errors.klass}</span>}
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium">Message (optional)</span>
                  <textarea name="msg" rows={3} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/20" />
                </label>
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift sm:col-span-2">Send enquiry <ArrowRight className="size-4" /></button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <GraduateLogo position="end" />
        <p className="mt-5">© 2026 Elite Study Point. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string | undefined }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input name={name} type={type} aria-invalid={!!error} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/20 aria-invalid:border-destructive" />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
