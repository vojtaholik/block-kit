import type { PageConfig } from "@static-block-kit/core";

export const indexPage: PageConfig = {
  id: "index",
  path: "/",
  title: "JAP",
  template: "base.html",
  density: "comfortable",
  regions: {
    main: {
      blocks: [
        {
          id: "hero-1",
          type: "hero",
          props: {
            title: "Jednokřídlá stavební pouzdra",
            links: [
              {
                href: "/poptavka",
                label: "Nezávazně poptejte",
              },
              {
                href: "/showroom",
                label: "Navštivte showrooom",
              },
              {
                href: "/prodejce",
                label: "Najděte prodejce",
              },
            ],
            backgroundImage: {
              src: "public/images/hero.jpg",
              alt: "Hero Background",
            },
          },
          layout: {
            tone: "accent",
            contentAlign: "center",
            contentWidth: "narrow",
          },
        },
        {
          id: "section-header-1",
          type: "sectionHeader",
          props: {
            headline: "Elegantní řešení",
            body: "<p>Jednokřídlé stavební pouzdro uplatníte při nové výstavbě či rekonstrukci. Je vhodné do obývacího pokoje, ložnice, kuchyně, komory, šatny, koupelny, toalety nebo pracovny.</p>",
          },
          layout: {
            contentAlign: "left",
          },
        },
        {
          id: "grid-1",
          type: "grid",
          props: {
            itemBlock: "teaser",
            columns: "5",
            items: [
              {
                title: "Stavební pouzdra",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser1.jpg",
                  alt: "Stavební pouzdra",
                },
                link: {
                  href: "/stavebni-pouzdra",
                  label: "Stavební pouzdra",
                },
              },
              {
                title: "Půdní schody",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser2.jpg",
                  alt: "Půdní schody",
                },
                link: {
                  href: "/pudni-schody",
                  label: "Půdní schody",
                },
              },
              {
                title: "Zárubně",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser3.jpg",
                  alt: "Zárubně",
                },
                link: {
                  href: "/zarubne",
                  label: "Zárubně",
                },
              },
              {
                title: "Dveře",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser4.jpg",
                  alt: "Dveře",
                },
                link: {
                  href: "/dvere",
                  label: "Dveře",
                },
              },
              {
                title: "Posuvy",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser5.jpg",
                  alt: "Posuvy",
                },
                link: {
                  href: "/posuvy",
                  label: "Posuvy",
                },
              },
              {
                title: "Skleněné stěny",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser6.jpg",
                  alt: "Skleněné stěny",
                },
                link: {
                  href: "/sklenene-steny",
                  label: "Skleněné stěny",
                },
              },
              {
                title: "Grafosklo",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser7.jpg",
                  alt: "Grafosklo",
                },
                link: {
                  href: "/grafosklo",
                  label: "Grafosklo",
                },
              },
              {
                title: "Obkladové systémy",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser8.jpg",
                  alt: "Obkladové systémy",
                },
                link: {
                  href: "/obkladove-systemy",
                  label: "Obkladové systémy",
                },
              },
              {
                title: "Schodiště",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser9.jpg",
                  alt: "Schodiště",
                },
                link: {
                  href: "/schodiste",
                  label: "Schodiště",
                },
              },
              {
                title: "Soklové lišty",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser10.jpg",
                  alt: "Soklové lišty",
                },
                link: {
                  href: "/soklove-listy",
                  label: "Soklové lišty",
                },
              },
              {
                title: "Zábradlí",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser11.jpg",
                  alt: "Zábradlí",
                },
                link: {
                  href: "/zabradli",
                  label: "Zábradlí",
                },
              },
              {
                title: "Stříšky",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser12.jpg",
                  alt: "Stříšky",
                },
                link: {
                  href: "/strisky",
                  label: "Stříšky",
                },
              },
              {
                title: "Vchodový systém",
                subtitle: "Lorem ipsum",
                image: {
                  src: "public/images/teaser1.jpg",
                  alt: "Vchodový systém",
                },
                link: {
                  href: "/vchodovy-system",
                  label: "Vchodový systém",
                },
              },
            ],
          },
        },
        {
          id: "business-card-1",
          type: "businessCard",
          props: {
            headline: "Rádi vám s výběrem pomůžeme",
            body: "Naše řešení najdete v domku mladé rodiny, ale i v realizacích zvučných architektů, nebo třeba u dubajských šejků.",
            primaryCta: {
              href: "/poptavka",
              label: "Poslat poptávku",
            },
            contactLinks: [
              {
                href: "mailto:ales.vyskocil@japcz.cz",
                label: "ales.vyskocil@japcz.cz",
              },
              {
                href: "tel:+420724996673",
                label: "+420 724 996 673",
              },
            ],
            contactPerson: {
              name: "Aleš Vyskočil",
              title: "Obchodně-technický poradce",
              regions:
                "Moravskoslezský kraj, Olomoucký kraj, Zlínský kraj (Vsetín)",
              image: {
                src: "public/images/ales-vyskocil.jpg",
                alt: "Aleš Vyskočil",
              },
            },
          },
        },
        {
          id: "cta-1",
          type: "sectionHeader",
          props: {
            headline: "Vlastnosti dané kategorie",
            body: "<p>Rychlé rozložení i složení žebříku a jednoduchá manipulace zajišťují komfortní používání. Dbáme na kvalitu použitých materiálů a důmyslné zpracování, proto se půdní schody JAP vyznačují dlouhou životností a vysokou odolností.</p>",
            image: {
              src: "public/images/1.jpg",
              alt: "Section Image",
            },
          },
          layout: {
            contentAlign: "split-start",
          },
        },
        {
          id: "cta-1",
          type: "sectionHeader",
          props: {
            headline: "Vlastnosti dané kategorie",
            body: "<p>Rychlé rozložení i složení žebříku a jednoduchá manipulace zajišťují komfortní používání. Dbáme na kvalitu použitých materiálů a důmyslné zpracování, proto se půdní schody JAP vyznačují dlouhou životností a vysokou odolností.</p>",
            image: {
              src: "public/images/2.jpg",
              alt: "Section Image",
            },
          },
          layout: {
            contentAlign: "split-end",
          },
        },
      ],
    },
  },
};
