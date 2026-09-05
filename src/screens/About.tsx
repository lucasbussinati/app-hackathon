import type { ReactNode } from "react";
import { JOURNEY_ICONS } from "../data/journey";
import { t } from "../i18n";
import photoFriderike from "../assets/team/friderike.jpeg";
import photoEdson from "../assets/team/edson.jpeg";
import photoLucas from "../assets/team/lucas.jpg";

const WHATSAPP_NUMBER = "5515991733040";
const WHATSAPP_DISPLAY = "+55 15 99173-3040";
const WHATSAPP_MESSAGE = encodeURIComponent(t.about.whatsappMessage);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const LINKEDIN_URL = "https://www.linkedin.com/in/lucas-hideki-bussinati/";
const LINKEDIN_DISPLAY = "in/lucas-hideki-bussinati";

const WHATSAPP_GREEN = "#25D366";
const LINKEDIN_BLUE = "#0A66C2";

export default function About() {
  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-2xl">{t.about.title}</h1>
        <p className="text-sm text-sage-700 mt-1">{t.about.subtitle}</p>
      </header>

      <section className="card p-4 space-y-3 text-sm text-sage-800 leading-relaxed">
        <h2 className="text-base font-semibold text-sage-900">{t.about.whatIsTitle}</h2>
        <p>{t.about.whatIsP1}</p>
        <p>{t.about.whatIsP2}</p>
      </section>

      <section className="card p-4">
        <h2 className="text-base font-semibold text-sage-900">{t.about.journeyTitle}</h2>
        <ol className="mt-3 space-y-3">
          {t.journey.map((step) => (
            <li key={step.id} className="flex items-start gap-3">
              <span className="text-2xl mt-0.5 shrink-0" aria-hidden>
                {JOURNEY_ICONS[step.id]}
              </span>
              <div>
                <span className="text-sm font-semibold text-sage-800">{step.label}</span>
                <p className="text-xs text-sage-600 leading-relaxed mt-1">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-base font-semibold text-sage-900">{t.about.teamTitle}</h2>
          <p className="text-sm text-sage-700 mt-0.5">{t.about.teamIntro}</p>
        </div>

        <MemberCard
          name={t.about.expertName}
          role={t.about.role}
          photo={photoFriderike}
          objectPosition="50% 18%"
          badge={<WhatsAppIcon className="w-3 h-3 text-white" />}
          badgeColor={WHATSAPP_GREEN}
        >
          {t.about.bio.map((p) => (
            <p key={p} className="text-sm text-sage-800 leading-relaxed">
              {p}
            </p>
          ))}

          <div className="rounded-2xl bg-sage-50 border border-sage-100 p-3">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-sage-500 mb-1.5">
              {t.about.questionsLead}
            </p>
            <ul className="space-y-1">
              {t.about.questions.map((q) => (
                <li key={q} className="text-sm text-sage-800 leading-relaxed italic">
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-sage-800 leading-relaxed">{t.about.proverbLead}</p>
          <blockquote className="border-l-4 border-sand-300 pl-3 py-0.5">
            <p className="text-sm font-display text-sage-900 leading-relaxed italic">
              “{t.about.proverb}”
            </p>
          </blockquote>

          {t.about.closing.map((p) => (
            <p key={p} className="text-sm text-sage-800 leading-relaxed">
              {p}
            </p>
          ))}

          <div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-white font-semibold shadow-soft hover:bg-[#1ebe5d] active:scale-[0.98] transition-all"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {t.about.cta}
            </a>
            <p className="mt-2 text-center text-[11px] text-sage-600">
              {t.about.opensWhatsapp}
              {WHATSAPP_DISPLAY}
            </p>
          </div>
        </MemberCard>

        <MemberCard
          name="Edson Fernandes Portella"
          role={t.about.edsonRole}
          photo={photoEdson}
          objectPosition="50% 15%"
        >
          <p className="text-sm text-sage-800 leading-relaxed">{t.about.edsonBio}</p>

          <div className="rounded-2xl bg-sage-50 border border-sage-100 p-3">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-sage-500 mb-1.5">
              {t.about.edsonFocusTitle}
            </p>
            <ul className="text-sm text-sage-700 leading-relaxed space-y-1">
              {t.about.edsonFocus.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-sage-400" aria-hidden>
                    ›
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </MemberCard>

        <MemberCard
          name="Lucas Hideki Bussinati"
          role={t.about.lucasRole}
          photo={photoLucas}
          badge={<LinkedInIcon className="w-3 h-3 text-white" />}
          badgeColor={LINKEDIN_BLUE}
        >
          <p className="text-sm text-sage-800 leading-relaxed">{t.about.lucasBio}</p>

          <div>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-white font-semibold shadow-soft hover:bg-[#08528f] active:scale-[0.98] transition-all"
            >
              <LinkedInIcon className="w-5 h-5" />
              {t.about.lucasCta}
            </a>
            <p className="mt-2 text-center text-[11px] text-sage-600">
              {t.about.opensLinkedin}
              {LINKEDIN_DISPLAY}
            </p>
          </div>
        </MemberCard>
      </section>
    </div>
  );
}

function MemberCard({
  name,
  role,
  initials,
  gradient,
  photo,
  objectPosition,
  badge,
  badgeColor,
  children,
}: {
  name: string;
  role: string;
  initials?: string;
  gradient?: string;
  photo?: string;
  objectPosition?: string;
  badge?: ReactNode;
  badgeColor?: string;
  children: ReactNode;
}) {
  return (
    <article className="card p-4">
      <div className="flex items-start gap-3">
        <Avatar
          initials={initials}
          gradient={gradient}
          photo={photo}
          alt={name}
          objectPosition={objectPosition}
          badge={badge}
          badgeColor={badgeColor}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-display leading-tight text-sage-900">{name}</h3>
          <p className="text-xs text-sage-600 mt-0.5">{role}</p>
        </div>
      </div>
      <div className="mt-3 space-y-2.5">{children}</div>
    </article>
  );
}

function Avatar({
  initials,
  gradient,
  photo,
  alt,
  objectPosition = "50% 20%",
  badge,
  badgeColor,
}: {
  initials?: string;
  gradient?: string;
  photo?: string;
  alt?: string;
  objectPosition?: string;
  badge?: ReactNode;
  badgeColor?: string;
}) {
  return (
    <div className="relative w-20 h-20 shrink-0">
      <div
        className="w-full h-full rounded-full overflow-hidden flex items-center justify-center text-white font-display shadow-soft ring-2 ring-white"
        style={photo ? undefined : { background: gradient }}
      >
        {photo ? (
          <img
            src={photo}
            alt={alt ?? ""}
            className="w-full h-full object-cover"
            style={{ objectPosition }}
          />
        ) : (
          <span
            className={
              (initials?.length ?? 0) > 2 ? "text-base tracking-tight" : "text-xl"
            }
            aria-hidden
          >
            {initials}
          </span>
        )}
      </div>
      {badge && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center z-10"
          style={{ backgroundColor: badgeColor }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
