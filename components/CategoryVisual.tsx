import { useId } from 'react';
import type { VisualKind } from '@/lib/site';

const AMP = '#8B0000';
const BONE = '#ece8e1';

/**
 * Abstract, editorial line-and-metal artwork for each category.
 * Deliberately not product photography (none exists yet): each piece is a
 * simplified object with a single amber detail.
 */
export default function CategoryVisual({
  kind,
  className,
}: {
  kind: VisualKind;
  className?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const metal = `${uid}m`;
  const glare = `${uid}g`;

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b3e45" />
          <stop offset="0.45" stopColor="#17181c" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
        <linearGradient id={glare} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={BONE} stopOpacity="0.18" />
          <stop offset="1" stopColor={BONE} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* shared measuring-grid backdrop */}
      <circle cx="200" cy="250" r="170" stroke={BONE} strokeOpacity="0.06" />
      <circle cx="200" cy="250" r="118" stroke={BONE} strokeOpacity="0.05" />
      <line x1="0" y1="250" x2="400" y2="250" stroke={BONE} strokeOpacity="0.05" />
      <line x1="200" y1="0" x2="200" y2="500" stroke={BONE} strokeOpacity="0.05" />

      {kind === 'phone' && (
        <g>
          <ellipse cx="200" cy="412" rx="86" ry="9" fill="#000" fillOpacity="0.55" />
          <rect x="128" y="78" width="144" height="300" rx="26" fill={`url(#${metal})`} stroke={BONE} strokeOpacity="0.16" />
          <rect x="136" y="86" width="128" height="284" rx="19" fill="#060607" />
          <circle cx="200" cy="228" r="52" stroke={AMP} strokeWidth="1.5" />
          <circle cx="200" cy="228" r="36" stroke={AMP} strokeOpacity="0.6" />
          <circle cx="200" cy="228" r="20" stroke={AMP} strokeOpacity="0.35" />
          <circle cx="200" cy="228" r="5" fill={AMP} />
          <rect x="178" y="98" width="44" height="8" rx="4" fill="#15161a" />
          <rect x="180" y="356" width="40" height="3" rx="1.5" fill={BONE} fillOpacity="0.4" />
          <path d="M136 86 H210 L136 214 Z" fill={`url(#${glare})`} />
        </g>
      )}

      {kind === 'tv' && (
        <g>
          <ellipse cx="200" cy="388" rx="120" ry="8" fill="#000" fillOpacity="0.55" />
          <rect x="36" y="146" width="328" height="196" rx="3" fill={`url(#${metal})`} stroke={BONE} strokeOpacity="0.16" />
          <rect x="44" y="154" width="312" height="180" fill="#060607" />
          <path d="M44 154 H262 L150 334 H44 Z" fill={`url(#${glare})`} />
          <line x1="44" y1="246" x2="356" y2="246" stroke={BONE} strokeOpacity="0.08" />
          <rect x="44" y="326" width="312" height="3" fill={BONE} fillOpacity="0.1" />
          <rect x="44" y="326" width="128" height="3" fill={AMP} />
          <rect x="176" y="342" width="48" height="28" fill={`url(#${metal})`} />
          <rect x="126" y="370" width="148" height="7" rx="2" fill={`url(#${metal})`} stroke={BONE} strokeOpacity="0.12" />
        </g>
      )}

      {kind === 'appliance' && (
        <g>
          <ellipse cx="200" cy="412" rx="100" ry="9" fill="#000" fillOpacity="0.55" />
          <rect x="108" y="64" width="184" height="340" rx="12" fill={`url(#${metal})`} stroke={BONE} strokeOpacity="0.16" />
          <line x1="108" y1="124" x2="292" y2="124" stroke={BONE} strokeOpacity="0.12" />
          <circle cx="140" cy="94" r="9" fill="#060607" stroke={BONE} strokeOpacity="0.25" />
          <rect x="178" y="86" width="64" height="16" fill="#060607" />
          <circle cx="266" cy="94" r="4" fill={AMP} />
          <circle cx="200" cy="268" r="72" fill="#0a0a0c" stroke={BONE} strokeOpacity="0.3" strokeWidth="6" />
          <circle cx="200" cy="268" r="56" fill="#060607" />
          <path d="M146 268 A54 54 0 0 1 254 268" stroke={AMP} strokeWidth="1.5" />
          <path d="M156 298 A54 54 0 0 0 244 298" stroke={AMP} strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M160 226 L196 214 L172 252 Z" fill={`url(#${glare})`} />
        </g>
      )}

      {kind === 'accessory' && (
        <g>
          <rect x="172" y="82" width="10" height="38" fill="#9a9ea6" />
          <rect x="218" y="82" width="10" height="38" fill="#9a9ea6" />
          <rect x="146" y="118" width="108" height="126" rx="14" fill={`url(#${metal})`} stroke={BONE} strokeOpacity="0.16" />
          <circle cx="200" cy="186" r="5" fill={AMP} />
          <path
            d="M200 244 C 200 330, 116 326, 122 388 S 190 452, 280 438"
            stroke={AMP}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <rect x="278" y="424" width="48" height="28" rx="5" fill={`url(#${metal})`} stroke={BONE} strokeOpacity="0.2" />
          <path d="M146 118 H210 L146 200 Z" fill={`url(#${glare})`} />
        </g>
      )}

      {kind === 'speaker' && (
        <g>
          <ellipse cx="200" cy="414" rx="92" ry="9" fill="#000" fillOpacity="0.55" />
          <rect x="116" y="62" width="168" height="348" rx="14" fill={`url(#${metal})`} stroke={BONE} strokeOpacity="0.16" />
          <circle cx="200" cy="124" r="26" fill="#060607" stroke={BONE} strokeOpacity="0.25" />
          <circle cx="200" cy="124" r="10" fill={`url(#${metal})`} />
          <circle cx="200" cy="288" r="74" fill="#060607" stroke={BONE} strokeOpacity="0.25" strokeWidth="3" />
          <circle cx="200" cy="288" r="56" stroke={BONE} strokeOpacity="0.12" />
          <circle cx="200" cy="288" r="30" fill={`url(#${metal})`} />
          <circle cx="200" cy="288" r="8" fill={AMP} />
          <path d="M310 240 A60 60 0 0 1 310 336" stroke={AMP} strokeOpacity="0.6" strokeWidth="1.5" />
          <path d="M332 214 A90 90 0 0 1 332 362" stroke={AMP} strokeOpacity="0.35" strokeWidth="1.5" />
          <path d="M354 188 A120 120 0 0 1 354 388" stroke={AMP} strokeOpacity="0.18" strokeWidth="1.5" />
        </g>
      )}

      {kind === 'audio' && (
        <g>
          <path
            d="M112 300 C 112 118, 288 118, 288 300"
            stroke={`url(#${metal})`}
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M112 300 C 112 118, 288 118, 288 300"
            stroke={BONE}
            strokeOpacity="0.14"
            strokeWidth="17"
            strokeLinecap="round"
          />
          <rect x="88" y="262" width="48" height="110" rx="24" fill={`url(#${metal})`} stroke={BONE} strokeOpacity="0.2" />
          <rect x="264" y="262" width="48" height="110" rx="24" fill={`url(#${metal})`} stroke={BONE} strokeOpacity="0.2" />
          <rect x="99" y="278" width="26" height="78" rx="13" stroke={AMP} strokeOpacity="0.8" />
          <rect x="275" y="278" width="26" height="78" rx="13" stroke={AMP} strokeOpacity="0.8" />
          <circle cx="172" cy="430" r="11" fill={`url(#${metal})`} stroke={BONE} strokeOpacity="0.25" />
          <circle cx="228" cy="430" r="11" fill={`url(#${metal})`} stroke={BONE} strokeOpacity="0.25" />
          <path d="M172 441 C 172 458, 186 462, 200 462 C 214 462, 228 458, 228 441" stroke={BONE} strokeOpacity="0.4" />
        </g>
      )}
    </svg>
  );
}
