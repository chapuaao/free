// Avatares ilustrados locais — sem fotografias nem dependências externas.
// Retratos vetoriais fictícios concebidos para representar jogadores negros
// com diferentes tons de pele e estilos de cabelo, mantendo o visual lúdico do jogo.
const ILLUSTRATED_AVATAR_SVGS = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="Avatar ilustrado 1">
    <rect width="160" height="160" rx="32" fill="#F3C743"/>
    <circle cx="80" cy="72" r="39" fill="#7A4A2E"/>
    <path d="M40 67c2-29 19-45 40-45s39 16 41 45c-9-8-17-12-25-14-12 11-31 17-56 14Z" fill="#1F1714"/>
    <circle cx="55" cy="80" r="5" fill="#1E1512"/><circle cx="105" cy="80" r="5" fill="#1E1512"/>
    <path d="M78 83c-2 7-4 12-1 15 3 2 7 2 11 0" fill="none" stroke="#4B2A1D" stroke-width="4" stroke-linecap="round"/>
    <path d="M64 106c10 8 22 8 32 0" fill="none" stroke="#F3D1B9" stroke-width="5" stroke-linecap="round"/>
    <path d="M33 160c5-30 23-47 47-47s43 17 48 47" fill="#B41020"/>
    <path d="M57 123c7 7 15 11 23 11s16-4 23-11" fill="none" stroke="#F6E9D0" stroke-width="6" stroke-linecap="round"/>
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="Avatar ilustrado 2">
    <rect width="160" height="160" rx="32" fill="#DCE6D1"/>
    <circle cx="80" cy="74" r="38" fill="#5A341F"/>
    <path d="M45 59c3-23 17-37 35-37 19 0 34 13 37 35-7-4-14-7-21-8-9 9-24 15-51 10Z" fill="#17110F"/>
    <path d="M47 50c-8-13-3-24 6-28 7 2 11 9 9 18M63 39c-4-16 4-25 14-26 7 5 8 13 4 23M87 36c1-17 10-23 20-20 6 7 3 16-2 23" fill="none" stroke="#17110F" stroke-width="9" stroke-linecap="round"/>
    <circle cx="57" cy="81" r="5" fill="#17110F"/><circle cx="102" cy="81" r="5" fill="#17110F"/>
    <path d="M80 85c-2 7-3 11 0 14 3 2 7 2 10 0" fill="none" stroke="#3D2117" stroke-width="4" stroke-linecap="round"/>
    <path d="M66 108c8 6 19 6 28 0" fill="none" stroke="#D9AD96" stroke-width="5" stroke-linecap="round"/>
    <path d="M30 160c5-31 23-48 50-48s45 17 50 48" fill="#20283E"/>
    <path d="M63 120h34l-5 17H68Z" fill="#E9C65B"/>
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="Avatar ilustrado 3">
    <rect width="160" height="160" rx="32" fill="#EBCBD8"/>
    <circle cx="80" cy="76" r="38" fill="#8B5535"/>
    <circle cx="80" cy="26" r="20" fill="#211713"/>
    <path d="M42 67c2-30 18-45 38-45 21 0 37 15 39 45-9-7-19-11-29-12-13 9-28 13-48 12Z" fill="#211713"/>
    <path d="M41 61c-7 19-3 42 7 56M119 61c7 19 3 42-7 56" fill="none" stroke="#211713" stroke-width="7" stroke-linecap="round"/>
    <circle cx="57" cy="82" r="5" fill="#201512"/><circle cx="103" cy="82" r="5" fill="#201512"/>
    <path d="M78 86c-2 7-4 12-1 15 3 2 7 2 11 0" fill="none" stroke="#56311F" stroke-width="4" stroke-linecap="round"/>
    <path d="M64 109c9 8 23 8 32 0" fill="none" stroke="#F0C0BD" stroke-width="5" stroke-linecap="round"/>
    <circle cx="43" cy="90" r="4" fill="#E8B835"/><circle cx="117" cy="90" r="4" fill="#E8B835"/>
    <path d="M29 160c7-30 24-46 51-46s45 16 51 46" fill="#B41020"/>
    <path d="M65 122c5 6 10 9 15 9s11-3 16-9" fill="none" stroke="#F7E5C8" stroke-width="6" stroke-linecap="round"/>
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="Avatar ilustrado 4">
    <rect width="160" height="160" rx="32" fill="#C8DCEF"/>
    <circle cx="80" cy="75" r="38" fill="#6B3F28"/>
    <path d="M40 61c0-25 17-43 40-43 24 0 41 18 41 43-8-6-16-10-24-12-8 8-22 13-40 14-6 0-12-1-17-2Z" fill="#191210"/>
    <circle cx="45" cy="44" r="12" fill="#191210"/><circle cx="61" cy="31" r="13" fill="#191210"/><circle cx="80" cy="27" r="14" fill="#191210"/><circle cx="100" cy="31" r="13" fill="#191210"/><circle cx="116" cy="45" r="12" fill="#191210"/>
    <circle cx="57" cy="81" r="5" fill="#191210"/><circle cx="103" cy="81" r="5" fill="#191210"/>
    <path d="M79 85c-1 7-3 12 0 15 3 2 7 2 10 0" fill="none" stroke="#47271A" stroke-width="4" stroke-linecap="round"/>
    <path d="M65 108c8 6 21 6 30 0" fill="none" stroke="#D8AA8C" stroke-width="5" stroke-linecap="round"/>
    <path d="M31 160c5-30 23-47 49-47s44 17 49 47" fill="#2E7A5A"/>
    <path d="M60 121c6 8 13 12 20 12s15-4 21-12" fill="none" stroke="#F1DFC4" stroke-width="6" stroke-linecap="round"/>
  </svg>`
];

const ILLUSTRATED_AVATARS = ILLUSTRATED_AVATAR_SVGS.map(
  svg => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
);

if (typeof PATCH_AVATARS !== 'undefined' && Array.isArray(PATCH_AVATARS)) {
  PATCH_AVATARS.splice(0, PATCH_AVATARS.length, ...ILLUSTRATED_AVATARS);
}
