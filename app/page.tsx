import { BrandMark } from "../components/brand";
import {
  bookingUrl, directionsUrl, email, facebookUrl, instagramUrl, phone, phoneUrl, vouchersUrl,
} from "../components/details";
import { Gallery } from "../components/gallery";
import { Header } from "../components/header";
import { Motion } from "../components/motion";
import { ServiceMenu } from "../components/service-menu";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#obsah">Přejít na obsah</a>
      <Header />
      <main id="obsah">
        <section className="hero shell" id="nahoru" aria-labelledby="hero-title">
          <div className="masthead">
            <h1 id="hero-title"><span data-masthead-name>Banditos</span></h1>
            <div className="masthead-aside" data-masthead-aside>
              <p>Barber Shop</p>
              <span>Vrchlabí, Krkonoše</span>
            </div>
          </div>
          <Gallery />
        </section>

        <section className="story section-block" id="o-nas" aria-labelledby="story-title">
          <div className="shell story-grid">
            <div className="story-copy" data-section-reveal>
              <p className="word-label">O nás</p>
              <h2 className="section-title" id="story-title">Holičství<br /> v podloubí.</h2>
              <p>Banditos najdete na Krkonošské ulici v centru Vrchlabí. Děláme klasické střihy, fade i úpravu vousů břitvou. Na místě si můžete dát kávu nebo whisky a vybrat si kosmetiku pro domácí péči.</p>
              <a className="text-link" href="#sluzby">Prohlédnout ceník</a>
            </div>
            <figure className="story-figure" data-story-figure>
              <div className="image-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/puls-2025.webp" alt="Dobová fotografie týmu před vchodem do Banditos" width="353" height="409" loading="lazy" decoding="async" />
              </div>
              <figcaption>Banditos před holičstvím <span>PULS, srpen 2025</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="services section-block" id="sluzby" aria-labelledby="services-title">
          <div className="shell">
            <div className="section-heading" data-section-reveal>
              <h2 className="section-title" id="services-title">Ceník</h2>
              <p>Ceny a délky jednotlivých služeb podle barbera. Volné termíny najdete v MyFoxu.</p>
            </div>
            <div className="services-grid">
              <figure className="services-figure" data-photo-reveal>
                <div className="image-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/shop-floor.webp" alt="Holičská křesla v Banditos" width="400" height="267" loading="lazy" decoding="async" />
                </div>
              </figure>
              <div className="services-content">
                <ServiceMenu />
                <div className="services-action">
                  <a className="button button-primary" href={bookingUrl}>Rezervovat termín</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="voucher section-block" id="poukazy" aria-labelledby="voucher-title">
          <div className="shell voucher-grid" data-section-reveal>
            <h2 className="section-title" id="voucher-title">Dárkové<br /> poukazy</h2>
            <div className="voucher-details">
              <p>Vyberte konkrétní službu nebo částku. Poukaz pořídíte online i přímo u nás.</p>
              <a className="button button-dark" href={vouchersUrl}>Vybrat poukaz</a>
            </div>
          </div>
        </section>

        <footer className="visit section-block" id="kontakt" aria-labelledby="visit-title">
          <div className="shell">
            <div className="visit-intro" data-section-reveal>
              <p className="word-label">Kde nás najdete</p>
              <h2 className="section-title" id="visit-title">Krkonošská 14</h2>
            </div>
            <div className="contact-grid">
              <div>
                <h3 className="word-label">Adresa</h3>
                <address>Krkonošská 14<br />543 01 Vrchlabí</address>
                <a className="text-link" href={directionsUrl}>Otevřít mapu</a>
              </div>
              <div>
                <h3 className="word-label">Kontakt</h3>
                <a className="contact-line" href={phoneUrl}>{phone}</a>
                <a className="contact-line" href={`mailto:${email}`}>{email}</a>
              </div>
              <div>
                <h3 className="word-label">Provozní doba</h3>
                <p>Dle objednávek</p>
                <a className="text-link" href={bookingUrl}>Zobrazit termíny</a>
              </div>
            </div>
            <div className="footer-bottom">
              <a href="#nahoru" aria-label="Banditos Barber Shop, zpět nahoru"><BrandMark /></a>
              <div className="socials flex flex-wrap gap-x-5 gap-y-3">
                <a href={instagramUrl}>Instagram</a>
                <a href={facebookUrl}>Facebook</a>
              </div>
              <p>Neoficiální redesign pro portfolio</p>
            </div>
          </div>
        </footer>
      </main>
      <Motion />
    </>
  );
}
