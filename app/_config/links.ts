export const LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61559121600689",
  instagram: "https://www.instagram.com/am_rabbits_east_tennessee/",
  tiktok: "https://www.tiktok.com/@amrabbitseasttn",
  email: "amrabbitstn@gmail.com",
  phone: "423-540-6566",
  phoneHref: "tel:4235406566",
  cashapp: "https://cash.app/$amrabbits",
  /** Sister site — the rabbitry side of the same family homestead. */
  rabbitry: "https://amrabbits.com",
  /** Farm shop site. */
  farmstead: "https://firstfruitsfarmtn.com/",
  /** Public Flickr albums, scraped at build/ISR time by app/_lib/flickr.ts. */
  flickrAlbums: {
    eggs: {
      key: "eggs",
      title: "Hatching & Eating Eggs",
      url: "https://www.flickr.com/photos/204629165@N05/sets/72177720334623795/",
    },
    chickens: {
      key: "chickens",
      title: "Chickens & Chicks",
      url: "https://www.flickr.com/photos/204629165@N05/sets/72177720334623765/",
    },
    ducks: {
      key: "ducks",
      title: "Ducks & Ducklings",
      url: "https://www.flickr.com/photos/204629165@N05/sets/72177720336318657/",
    },
    quail: {
      key: "quail",
      title: "Quail",
      url: "https://www.flickr.com/photos/204629165@N05/sets/72177720334651269/",
    },
  },
} as const;
