import { useEffect, useRef } from "react";

/** A vector interpretation of the supplied graduate badge, with a separate cap. */
export function GraduateLogo({ position }: { position: "start" | "end" }) {
  return (
    <div className={`graduate-logo graduate-logo-${position}`} role="img" aria-label="Elite Study Point graduate logo">
      <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden="true">
        <path className="graduate-paper" d="M53 20 Q95 35 150 15 Q205 35 247 20 L279 55 Q253 120 282 207 Q291 255 244 284 L56 284 Q9 255 18 207 Q47 120 21 55Z" />
        <g className="graduate-doodles" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M43 69l23-9 10 28-23 9z M47 71l19 18 M229 66l22 7-8 27-22-7z M229 72l13 4 M225 81l13 4 M45 174v-24h17v24l12 20q4 9-5 9H39q-9 0-5-9z M37 191h34 M240 151v18l-11 17q-6 10 5 10h25q11 0 5-10l-11-17v-18z M235 151h23 M231 186h30 M58 231l-13 13m0-13 13 13 M225 226l23-9 10 28-23 9z" />
          <ellipse cx="88" cy="53" rx="16" ry="6" transform="rotate(40 88 53)" /><ellipse cx="88" cy="53" rx="16" ry="6" transform="rotate(-40 88 53)" />
          <path d="M204 48v19m-9-9h19 M42 115h23m-12-11v23 M239 115l7-12 7 12-7 12z M78 124l-7 12m-4-9 15 6 M210 124l10 12m-12-2 14-7" />
        </g>
        <path className="graduate-ink" d="M69 253l8-57q5-24 47-35h52q42 11 47 35l8 57z" />
        <path className="graduate-skin" d="M134 145h32v30h-32z M104 99q1-25 46-25t46 25l-9 39q-14 24-37 24t-37-24z" />
        <path className="graduate-ink" d="M103 111q-4-43 47-43t47 43l-18-20q-23 13-61 9l-12 18z" />
        <path className="graduate-shirt" d="M124 170l26 24 26-24 13 83h-78z" />
        <path className="graduate-ink" d="M150 194l10 12-6 11 9 27-13 17-13-17 9-27-6-11z" />
        <path className="graduate-outline" fill="none" strokeWidth="3" d="M88 210l-4 43m128-43 4 43" />
        <text x="150" y="278" textAnchor="middle" className="graduate-name">ELITE STUDY POINT</text>
      </svg>
      <span data-cap-slot={position} className="graduate-cap-slot" />
    </div>
  );
}

export function ScrollGraduationCap() {
  const cap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = document.querySelector<HTMLElement>('[data-cap-slot="start"]');
    const end = document.querySelector<HTMLElement>('[data-cap-slot="end"]');
    const element = cap.current;
    if (!start || !end || !element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const draw = () => {
      frame = 0;
      const a = start.getBoundingClientRect();
      const b = end.getBoundingClientRect();
      const landingScroll = Math.max(1, b.top + window.scrollY - window.innerHeight * 0.65);
      const progress = Math.min(1, Math.max(0, window.scrollY / landingScroll));
      const mix = (from: number, to: number) => from + (to - from) * progress;
      const width = mix(a.width, b.width);
      const amplitude = Math.min(window.innerWidth * 0.22, 240);
      const zigzag = Math.sin(progress * Math.PI * 6) * Math.sin(progress * Math.PI) * amplitude;
      const center = mix(a.left + a.width / 2, b.left + b.width / 2) + zigzag;
      const x = Math.max(8, Math.min(window.innerWidth - width - 8, center - width / 2));
      const y = mix(a.top, b.top);
      const rotation = Math.sin(progress * Math.PI * 6) * Math.sin(progress * Math.PI) * 18;
      element.style.width = `${width}px`;
      element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      element.style.visibility = reducedMotion.matches ? "hidden" : "visible";
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(draw); };
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={cap} className="scroll-graduation-cap" aria-hidden="true">
      <svg viewBox="0 0 200 100" className="h-full w-full">
        <path className="graduate-ink graduate-outline" strokeWidth="3" strokeLinejoin="round" d="M49 41v37q51-21 102 0V41z" />
        <path className="graduate-ink graduate-cap-edge" strokeWidth="3" strokeLinejoin="round" d="M3 34L100 3l97 31-97 34z" />
        <path className="graduate-cap-edge" fill="none" strokeWidth="3" strokeLinecap="round" d="M100 34H23v47" />
        <path className="graduate-ink graduate-cap-edge" strokeWidth="2" d="M23 76l-5 18h10z" />
      </svg>
    </div>
  );
}