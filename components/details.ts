export const bookingUrl = "https://banditos-barber-shop.myfox.cz/";
export const vouchersUrl = "https://poukazy.banditosbarbershop.cz/";
export const directionsUrl = "https://www.google.com/maps/search/?api=1&query=Banditos+Barber+Shop+Krkono%C5%A1sk%C3%A1+14+Vrchlab%C3%AD";
export const instagramUrl = "https://www.instagram.com/banditos_barber_shop/";
export const facebookUrl = "https://www.facebook.com/profile.php?id=100090997744170";
export const phone = "+420 739 781 458";
export const phoneUrl = "tel:+420739781458";
export const email = "skalicky3257@seznam.cz";

export const navigation = [
  { label: "O nás", href: "#o-nas" },
  { label: "Ceník", href: "#sluzby" },
  { label: "Poukazy", href: "#poukazy" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

type Service = {
  name: string;
  price: number;
  minutes: number;
  description: string;
};

const cut = "Střih nebo fade podle přání, začištění kontur, mytí vlasů a péče o detaily. Ke střihu káva a voda.";
const beard = "Vousy a kontury upravíme strojkem i břitvou. Součástí je horký ručník, masáž obličeje a závěrečný balzám.";
const cutAndBeard = "Střih s mytím vlasů a úpravou kontur, péče o vousy břitvou, horkým ručníkem a balzámem. Podáváme kávu a vodu.";
const fullService = "Kompletní střih a péče o vousy s horkým ručníkem, hloubkovým čištěním, masáží, pleťovou maskou a voskem. K pití káva, voda nebo něco ostřejšího.";
const child = "Klasický střih pro děti od čtyř do deseti let.";
const mask = "Doplňková pleťová maska.";
const wax = "Odstranění chloupků voskem.";

export const serviceGroups: { id: string; label: string; services: Service[] }[] = [
  {
    id: "barber",
    label: "Služby barber",
    services: [
      { name: "Klasický střih", price: 510, minutes: 60, description: cut },
      { name: "Úprava vousů", price: 340, minutes: 60, description: beard },
      { name: "Střih + vousy", price: 730, minutes: 60, description: cutAndBeard },
      { name: "Full Service", price: 990, minutes: 90, description: fullService },
      { name: "Dětský střih", price: 340, minutes: 60, description: child },
      { name: "Pleťová maska", price: 90, minutes: 30, description: mask },
      { name: "Barvení vousů", price: 200, minutes: 30, description: "Doplňková služba pro sjednocení barvy vousů." },
      { name: "Trhání chloupků voskem", price: 70, minutes: 30, description: wax },
    ],
  },
  {
    id: "tristan",
    label: "Tristan",
    services: [
      { name: "Klasický střih", price: 410, minutes: 60, description: "Pánský střih podle přání." },
      { name: "Dětský střih", price: 300, minutes: 60, description: child },
    ],
  },
];
