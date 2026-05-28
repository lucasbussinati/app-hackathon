const WHATSAPP_NUMBER = "5515991733040";
const WHATSAPP_DISPLAY = "+55 15 99173-3040";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Friederike! I tried Sole, the reflexology app, and I'd love to schedule a session with you.",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function About() {
  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-2xl">About Sole</h1>
        <p className="text-sm text-sage-700 mt-1">
          A small, calm companion for everyday self-care.
        </p>
      </header>

      {/* ----------------- Featured: the expert behind Sole ----------------- */}
      <section className="card p-5 relative overflow-hidden bg-gradient-to-br from-sage-50 to-sand-100 border-sage-200">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-sage-200/40 blur-2xl" />
        <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-sand-200/60 blur-2xl" />

        <div className="relative">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-sage-600 mb-2">
            The brain behind Sole
          </p>

          <div className="flex items-start gap-3 mb-3">
            <Avatar initials="FP" />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-display leading-tight text-sage-900">
                Friederike Portella
              </h2>
              <p className="text-xs text-sage-600 mt-0.5">
                Certified Reflexology Specialist
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="chip">Feet</span>
                <span className="chip">Hands</span>
                <span className="chip">Ears</span>
                <span className="chip">Holistic care</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-sage-800 leading-relaxed">
            Every point, every instruction, and every connection between body and emotion in
            Sole comes from <span className="font-semibold">Friederike's</span> hands-on
            practice. The app is a small window into her work — for the real depth, the
            personalized touch, and the listening, you'll want a session with her.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-white font-semibold shadow-soft hover:bg-[#1ebe5d] active:scale-[0.98] transition-all"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Enjoyed the content? Schedule a session
          </a>

          <p className="mt-2 text-center text-[11px] text-sage-600">
            Opens WhatsApp · {WHATSAPP_DISPLAY}
          </p>
        </div>
      </section>

      <section className="card p-4 space-y-3 text-sm text-sage-800 leading-relaxed">
        <h2 className="text-base font-semibold text-sage-900">What Sole is</h2>
        <p>
          Reflexology is a touch practice based on the idea that points on the feet, hands and
          ears correspond to other parts of the body. Sole helps you find a few points to try
          based on how you say you feel — physically and emotionally — right now.
        </p>
        <p>
          The point catalogue, instructions, and the connections between body areas and
          emotional states were curated by Friederike Portella. The app is a digital companion;
          the practice itself is hers.
        </p>
      </section>

      <section className="card p-4 space-y-2 text-sm text-sage-800 leading-relaxed">
        <h2 className="text-base font-semibold text-sage-900">How recommendations work</h2>
        <p>
          When you complete an assessment, each saved point is scored by how many of its tags
          overlap with what you selected (body regions, discomfort types, emotions). Intensity,
          duration and emotional presence give a small extra weight. The top matches are what
          you see.
        </p>
        <p className="text-sage-600 text-xs">
          Built as a hackathon MVP — the engine is intentionally transparent so you can see why
          a point appeared.
        </p>
      </section>
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="relative w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-white font-display text-xl shadow-soft"
      style={{
        background: "linear-gradient(135deg, #7ea077 0%, #496944 100%)",
      }}
      aria-hidden
    >
      {initials}
      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#25D366] border-2 border-white flex items-center justify-center">
        <WhatsAppIcon className="w-3 h-3 text-white" />
      </span>
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
