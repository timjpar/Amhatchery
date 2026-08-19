import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * `script-src` carries 'unsafe-inline' deliberately. Next's App Router emits
 * ~30 inline `self.__next_f.push(...)` scripts per page carrying the RSC flight
 * data; their contents differ per page, so hashing them is impractical, and a
 * nonce would require dynamic rendering (per the Next CSP guide), which would
 * turn this fully-static site into a server-rendered one and raise Vercel
 * function usage. Note that adding any hash here would cause CSP3 browsers to
 * *ignore* 'unsafe-inline' and break hydration — so don't.
 *
 * The residual XSS risk is low: no route renders user-supplied data into HTML,
 * and the only two `dangerouslySetInnerHTML` call sites are a static theme
 * script and JSON-LD built from committed config. The directives that carry
 * real weight here are `object-src`, `base-uri`, `frame-ancestors`, and
 * `form-action`, plus limiting external scripts to PayPal's origins.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.paypal.com https://www.paypalobjects.com",
  // Nearly every component styles via inline `style={{…}}` props, which CSP
  // governs through style-src-attr falling back to style-src.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://live.staticflickr.com https://www.paypalobjects.com https://t.paypal.com",
  // next/font/google self-hosts at build time, so no font origin is needed.
  "font-src 'self' data:",
  // formsubmit.co receives the contact submission, which posts from the
  // browser rather than the server — FormSubmit answers 403 to requests from
  // cloud infrastructure.
  "connect-src 'self' https://formsubmit.co https://www.paypal.com https://www.sandbox.paypal.com https://api-m.paypal.com",
  "frame-src https://www.paypal.com https://www.sandbox.paypal.com",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** Applied to every route. */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self \"https://www.paypal.com\"), interest-cohort=()",
  },
  // Verified enforcing: the PayPal hosted button renders and both themes load
  // with zero violations. If a new third-party script is ever added, re-test
  // under `Content-Security-Policy-Report-Only` before enforcing it.
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  images: {
    /**
     * AVIF only, not AVIF + WebP. Next caches each format separately, so
     * listing both would double the billed Vercel transformations for the same
     * photos. Next 16's browser floor (Chrome 111+, Safari 16.4+, Firefox 111+)
     * supports AVIF everywhere; anything older falls back to the source JPEG.
     */
    formats: ["image/avif"],
    /**
     * Every distinct width is a separately billed transformation, so this list
     * is the single biggest lever on transformation count. Trimmed from the
     * default eight (640/750/828/1080/1200/1920/2048/3840); dropping 3840 also
     * stops 4K variants being generated for a site nobody views on a 4K panel.
     */
    deviceSizes: [640, 828, 1200, 1920],
    /** For `sizes`-constrained tiles: BirdCard (~180px) and GalleryGrid (25vw). */
    imageSizes: [128, 256, 384],
    /** Required in Next 16. One value stops ?q= being walked to mint transformations. */
    qualities: [75],
    /**
     * 30 days, up from the 4-hour default — otherwise the same photo is
     * re-optimized six times a day. There is no cache invalidation mechanism,
     * so replacing a photo means giving the file a new name.
     */
    minimumCacheTTL: 2592000,
    /** Confine the optimizer to real site images; without this any local path is fair game. */
    localPatterns: [{ pathname: "/images/**", search: "" }],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
        port: "",
        pathname: "/**",
        // Pinning `search` matters: omitting it implies `**`, which lets a
        // third party mint transformations on this account via query variants.
        search: "",
      },
    ],
    /** Remote redirects are followed WITHOUT re-checking remotePatterns. Don't follow any. */
    maximumRedirects: 0,
    /** Down from the 50MB default; no source image here is close to this. */
    maximumResponseBody: 5_000_000,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Photos in public/ are otherwise served revalidate-on-every-request,
        // so repeat visitors re-download them. Filenames aren't content-hashed,
        // hence no `immutable`: a replaced photo should still be given a new
        // name, or returning visitors can see the old one for up to 30 days.
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Inbound links from the AMRabbits farm section, which this site replaces.
      { source: "/farm/eggs", destination: "/hatching-eggs", permanent: true },
      { source: "/farm/chickens", destination: "/chickens", permanent: true },
      { source: "/farm/ducks", destination: "/ducks", permanent: true },
      { source: "/farm/quail", destination: "/quail", permanent: true },
      { source: "/farm/reserve", destination: "/reserve", permanent: true },
      { source: "/farm/available-livestock", destination: "/available", permanent: true },
      { source: "/farm/firstfruits-farmstead", destination: "/farm-shop", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
