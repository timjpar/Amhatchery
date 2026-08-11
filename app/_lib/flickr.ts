import type { GalleryImage } from "@/app/_components/ui/GalleryGrid";

// Flickr embeds every album photo's static URL (server / id / secret) in the
// public album page. We parse those out and rebuild URLs at the size we want,
// which lets us show the album in our own gallery grid without a Flickr API key.
// Matches the base (500px) form `live.staticflickr.com/<server>/<id>_<secret>.jpg`,
// tolerating the JSON-escaped `\/` slashes Flickr uses inline. Sized variants
// (`_b`, `_c`, …) don't match because of their extra `_<suffix>` segment.
const PHOTO_URL_RE =
  /live\.staticflickr\.com(?:\\)?\/(\d+)(?:\\)?\/(\d+)_([0-9a-f]+)\.jpg/g;

/**
 * Fetches a public Flickr album and returns its photos in album order.
 * Revalidates every 10 min so new hatches appear without a redeploy. Returns an
 * empty array on any failure (network, markup change) so callers can show a
 * fallback link to the album itself.
 */
export async function getAlbumPhotos(
  albumUrl: string,
  alt = "Available birds at AM Hatchery",
): Promise<GalleryImage[]> {
  try {
    const res = await fetch(albumUrl, {
      headers: {
        // Flickr serves the lightweight markup to bots; a browser UA gets the
        // full page that includes the photo URLs we parse.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      },
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];

    const html = await res.text();
    const seen = new Set<string>();
    const photos: GalleryImage[] = [];

    for (const [, server, id, secret] of html.matchAll(PHOTO_URL_RE)) {
      if (seen.has(id)) continue;
      seen.add(id);
      photos.push({
        // `_b` = 1024px; next/image downscales it for the grid via `sizes`.
        src: `https://live.staticflickr.com/${server}/${id}_${secret}_b.jpg`,
        alt,
      });
    }

    return photos;
  } catch {
    return [];
  }
}
