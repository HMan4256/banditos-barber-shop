# Banditos Barber Shop

Independent Czech-language portfolio redesign for Banditos Barber Shop in Vrchlabí. The design follows the storefront on Krkonošská Street into the real shop and its service menu. The gallery supports keyboard navigation. The booking and voucher links lead to the shop’s existing services.

[Desktop preview](docs/screenshots/desktop.webp) · [Mobile preview](docs/screenshots/mobile.webp)

## Run locally

Use Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Use `npm run typecheck` for TypeScript and `npm run build` for the static export in `out/`.

GSAP handles the masthead entrance, gallery transitions, section reveals, desktop photo movement, and price-list changes. The site follows the operating system’s reduced-motion preference and uses native scrolling. Images are served locally as responsive WebP files.

## Photography and business details

- The storefront, portraits, shop floor and detail photos come from the [official Banditos website](https://banditos-barber-shop.myfox.cz/). The site also supplies the logo and price list.
- The tall color photo of the shop interior comes from the [Vrchlabí business directory](https://www.vrchlabi.org/banditos-barber-shop/).
- The dated storefront portrait comes from [PULS, August 2025, page 24](https://www.muvrchlabi.cz/modules/file_storage/download.php?file=294b4fd9%7C2680&inline=1).
- Vouchers are available at the shop and through the [Banditos voucher store](https://poukazy.banditosbarbershop.cz/).
