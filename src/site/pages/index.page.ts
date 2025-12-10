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
          id: "features-1",
          type: "featureGrid",
          props: {
            headline: "Why Static Kit?",
            subheadline:
              "Everything you need to build fast, maintainable static sites.",
            columns: "3",
            features: [
              {
                icon: "⚡",
                title: "Lightning Fast",
                description:
                  "Pre-rendered HTML with zero JavaScript by default. Your pages load instantly.",
              },
              {
                icon: "🧱",
                title: "Block-Based",
                description:
                  "Compose pages from reusable blocks with type-safe props and CMS-ready schemas.",
              },
              {
                icon: "🎨",
                title: "Design System Ready",
                description:
                  "Built-in layout primitives and design tokens. Customize everything with CSS.",
              },
              {
                icon: "📝",
                title: "CMS Compatible",
                description:
                  "Export your content schemas for use with any headless CMS.",
              },
              {
                icon: "🔧",
                title: "Developer Experience",
                description:
                  "Hot reload, TypeScript everywhere, and a simple mental model.",
              },
              {
                icon: "🚀",
                title: "Deploy Anywhere",
                description:
                  "Output is plain HTML/CSS/JS. Deploy to any static host.",
              },
            ],
          },
        },
        {
          id: "cta-1",
          type: "sectionHeader",
          props: {
            headline: "Jednokřídlá stavební pouzdra",
            body: "<p>Jednokřídlá stavební pouzdra jsou ideální pro domácnosti a malé firmy. Mají velkou vnitřní plochu a jsou velmi odolné.</p>",
            image: {
              src: "public/images/section-header.jpg",
              alt: "Section Header Image",
            },
          },
          layout: {
            contentAlign: "left",
          },
        },
      ],
    },
  },
};
