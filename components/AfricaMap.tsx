/**
 * Decorative dotted map of Africa (simplified equirectangular outline,
 * 1 unit = 0.1° of longitude/latitude) with Douala highlighted and faint
 * arcs out to the continent's main business hubs. Purely ornamental —
 * the arcs illustrate reach, not specific named partnerships.
 */
const continent =
  "M-59,-358 L-10,-351 L30,-368 L102,-372 L110,-352 L101,-342 L115,-331 L152,-323 L199,-309 L201,-321 L231,-326 L252,-316 L299,-312 L323,-313 L325,-299 L339,-270 L356,-239 L372,-210 L386,-180 L397,-155 L417,-134 L433,-119 L445,-104 L512,-118 L510,-104 L498,-76 L479,-45 L450,-17 L422,5 L402,28 L393,50 L395,80 L404,105 L406,145 L391,170 L348,198 L355,225 L355,240 L329,259 L326,285 L310,299 L280,330 L256,340 L220,342 L200,348 L184,342 L182,320 L165,286 L152,266 L145,229 L132,195 L118,172 L123,135 L132,105 L132,88 L122,60 L118,48 L94,5 L94,-4 L96,-29 L97,-40 L85,-46 L70,-44 L55,-55 L34,-64 L12,-61 L-20,-48 L-45,-52 L-75,-44 L-95,-55 L-108,-63 L-132,-85 L-150,-109 L-167,-125 L-175,-147 L-165,-195 L-170,-210 L-160,-237 L-145,-261 L-130,-277 L-98,-299 L-98,-315 L-85,-333 L-68,-340 Z";

const madagascar =
  "M493,120 L504,155 L495,175 L480,215 L471,249 L452,255 L437,235 L441,205 L444,163 L470,150 Z";

const douala = { x: 97, y: -40 };
const hubs = [
  { x: 34, y: -65 }, // Lagos
  { x: -40, y: -53 }, // Abidjan
  { x: -174, y: -147 }, // Dakar
  { x: 312, y: -300 }, // Cairo
  { x: 368, y: 13 }, // Nairobi
  { x: 280, y: 262 }, // Johannesburg
  { x: 153, y: 43 }, // Kinshasa
];

export default function AfricaMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-190 -390 720 760" className={className} aria-hidden="true">
      <defs>
        <pattern id="africa-dots" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="5.5" cy="5.5" r="1.9" fill="var(--gold)" />
        </pattern>
        <radialGradient id="africa-glow">
          <stop offset="0%" stopColor="var(--gold-light)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--gold-light)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g opacity="0.55">
        <path d={continent} fill="url(#africa-dots)" />
        <path d={madagascar} fill="url(#africa-dots)" />
      </g>
      <path d={continent} fill="none" stroke="var(--gold)" strokeOpacity="0.25" strokeWidth="1.5" />

      {hubs.map((hub) => {
        const mx = (douala.x + hub.x) / 2;
        const my = (douala.y + hub.y) / 2 - 60;
        return (
          <g key={`${hub.x},${hub.y}`}>
            <path
              d={`M${douala.x},${douala.y} Q${mx},${my} ${hub.x},${hub.y}`}
              fill="none"
              stroke="var(--gold-light)"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <circle cx={hub.x} cy={hub.y} r="4" fill="var(--gold-light)" />
            <circle cx={hub.x} cy={hub.y} r="14" fill="url(#africa-glow)" opacity="0.6" />
          </g>
        );
      })}

      <circle cx={douala.x} cy={douala.y} r="40" fill="url(#africa-glow)" />
      <circle cx={douala.x} cy={douala.y} r="7" fill="var(--gold-light)" />
      <circle cx={douala.x} cy={douala.y} r="7" fill="none" stroke="var(--gold-light)" strokeWidth="2">
        <animate attributeName="r" from="7" to="26" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.9" to="0" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
