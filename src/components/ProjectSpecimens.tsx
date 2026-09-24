import type { Specimen } from "../data/profile";

/* ─────────────────────────────────────────────────────────────
   Each project gets one visual that shows what it does, built
   from the project's real inputs and outputs. No stock photos.
   ───────────────────────────────────────────────────────────── */

const panel =
  "h-full rounded-[28px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] p-5 sm:p-6 flex flex-col";

const panelLabel = "text-[#D7E2EA]/55 text-xs sm:text-sm";

/* ── Minutely: three files in, one structured PDF out ── */
const MinutelySpecimen = () => {
  const inputs = ["my-context.md", "client-context.md", "transcript.docx"];
  const sections = [
    ["Executive summary", ""],
    ["Outcomes", "decided, pending, tabled"],
    ["Action items", "owner, due date, priority"],
    ["Key dates", ""],
    ["Risks and blockers", ""],
    ["Per-participant summary", ""],
  ];

  return (
    <figure className={panel}>
      <figcaption className={panelLabel}>Three files in</figcaption>
      <ul className="mt-3 flex flex-wrap gap-2">
        {inputs.map((name) => (
          <li
            key={name}
            className="rounded-full border border-[#D7E2EA]/25 px-3 py-1 font-mono text-[0.7rem] sm:text-xs text-[#D7E2EA]"
          >
            {name}
          </li>
        ))}
      </ul>

      <div className="flex items-stretch gap-3 my-4 pl-4">
        <span aria-hidden="true" className="w-px bg-[#D7E2EA]/30" />
        <p className="text-[#D7E2EA]/70 text-xs sm:text-sm leading-snug py-1">
          One Claude call, response validated against a Pydantic schema
        </p>
      </div>

      <div className="rounded-[18px] bg-[#D7E2EA] text-[#0C0C0C] p-4 sm:p-5 flex-1">
        <p className="font-mono text-[0.7rem] sm:text-xs text-[#0C0C0C]/60">report.pdf</p>
        <ul className="mt-2 divide-y divide-[#0C0C0C]/10">
          {sections.map(([title, note]) => (
            <li key={title} className="py-1.5 flex flex-wrap items-baseline justify-between gap-x-3">
              <span className="font-medium text-sm">{title}</span>
              {note && <span className="text-[#0C0C0C]/55 text-xs">{note}</span>}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
};

/* ── CITS: how two real-style reviews get routed ── */
const chip = "rounded-full px-2.5 py-0.5 text-[0.7rem] sm:text-xs font-medium";

const CitsSpecimen = () => {
  const reviews = [
    {
      text: "Box tuta hua aaya, return chahiye.",
      sentiment: "Negative",
      urgency: "HIGH",
      matched: ["tuta hua", "return"],
      route: "Sent to a person",
    },
    {
      text: "Bahut accha product, value for money.",
      sentiment: "Positive",
      urgency: "NORMAL",
      matched: [],
      route: "Handled automatically",
    },
  ];

  return (
    <figure className={panel}>
      <figcaption className={panelLabel}>Example: how two reviews are routed</figcaption>
      <ul className="mt-4 flex flex-col gap-4 flex-1">
        {reviews.map((r) => (
          <li key={r.text} className="rounded-[18px] border border-[#D7E2EA]/15 p-4">
            <p className="text-[#D7E2EA] text-base sm:text-lg font-light leading-snug">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`${chip} border border-[#D7E2EA]/30 text-[#D7E2EA]`}>
                {r.sentiment}
              </span>
              {r.urgency === "HIGH" ? (
                <span className={`${chip} bg-[#D7E2EA] text-[#0C0C0C]`}>Urgency: high</span>
              ) : (
                <span className={`${chip} border border-[#34d399]/60 text-[#34d399]`}>
                  Urgency: normal
                </span>
              )}
              <span className="text-[#D7E2EA]/60 text-xs sm:text-sm">{r.route}</span>
            </div>
            {r.matched.length > 0 && (
              <p className="mt-2 text-[#D7E2EA]/55 text-xs">
                Rule layer matched{" "}
                {r.matched.map((m, i) => (
                  <span key={m}>
                    {i > 0 && " and "}
                    <code className="font-mono text-[#D7E2EA]/80">{m}</code>
                  </span>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>
    </figure>
  );
};

/* ── ESP32: the real hardware, plus the numbers that mattered ── */
const Esp32Specimen = () => {
  const specs = [
    ["8 kHz", "sample rate"],
    ["100", "samples per packet"],
    ["80/s", "packets sent"],
    ["~95%", "packets delivered"],
  ];

  return (
    <figure className={`${panel} gap-4`}>
      <img
        src="/projects/esp32-walkie-talkie.webp"
        alt="The two hand-soldered walkie-talkie boards: an ESP32, a microphone module, an amplifier, and a speaker on each"
        width={1000}
        height={750}
        loading="lazy"
        decoding="async"
        className="w-full aspect-[16/10] object-cover rounded-[18px]"
      />
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3">
        {specs.map(([value, label]) => (
          <div key={label}>
            <dt className="sr-only">{label}</dt>
            <dd className="text-white font-black text-2xl lg:text-[1.7rem] leading-none">{value}</dd>
            <dd className="mt-1 text-[#D7E2EA]/60 text-xs sm:text-sm">{label}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
};

export const ProjectSpecimen = ({ type }: { type: Specimen }) => {
  switch (type) {
    case "minutely":
      return <MinutelySpecimen />;
    case "cits":
      return <CitsSpecimen />;
    case "esp32":
      return <Esp32Specimen />;
  }
};
