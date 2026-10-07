import type { Content } from "./types";

export const en: Content = {
  name: "Ilyas Adambekov",
  title: "Frontend Developer",
  city: "Almaty",
  pitch:
    "I build payment and e-commerce products in React, Next.js and TypeScript — with the money logic right and interfaces that stay fast on every device.",
  meta: ["4+ years", "React · Next.js · TypeScript"],
  about: [
    "Frontend developer with 4+ years of commercial experience building payment and e-commerce products in React, Next.js and TypeScript.",
    "Currently at Nimble, building QR-code ordering and payment flows for restaurants across the Middle East. Before that, I built e-commerce storefronts that are live in the UAE and Kazakhstan, and a digital invitation platform for the Kazakhstan market. I started in fintech, on the frontend of an online brokerage platform.",
    "I care about getting money logic right, interfaces that stay fast on every device, and codebases the next developer can work in comfortably.",
  ],
  roles: [
    {
      title: "Frontend Developer",
      product: "QR-code dining web app for restaurants in the Middle East.",
      highlights: [
        "Payment flows and money logic: tips, fees, VAT",
        "Kiosk mode",
        "Arabic RTL localization",
        "Per-restaurant theming",
        "Performance work",
      ],
    },
    {
      title: "Frontend Developer",
      product: "Client web products across e-commerce and consumer apps.",
      highlights: [
        "Built interfaces for 5 projects from scratch (2 Next.js, 3 Vite + React), 3 of them live: infinityflowers.ae, zakazbuketov.kz and priglos.kz",
        "Lead frontend developer on two Next.js 16 e-commerce stores: App Router, server components, statically generated product pages",
        "Checkout with map-based delivery, zone pricing, time slots, promo codes and bonus points",
        "Payments across three regions: Stripe, PayPal, FreedomPay with Kaspi and Halyk",
        "Hardened auth: httpOnly cookie sessions, CSRF protection and server-side API proxies that keep keys off the client",
        "Storefronts localized for new markets (Russian, Kazakh)",
        "GA4 ecommerce tracking and Google Merchant feeds",
      ],
    },
    {
      title: "Frontend Developer",
      product: "Online brokerage platform.",
      highlights: [
        "Migrated 10,000+ lines of JS to TypeScript",
        "Built a shared Storybook component library",
        "Moved data logic into MobX stores",
      ],
    },
  ],
  projects: {
    nimble: {
      summary:
        "QR-code web app that restaurant guests open at the table to view the menu, see their bill, pay all of it or a share, tip, and leave feedback.",
      market: "Middle East",
      kind: "Restaurant payments",
      roleTitle: "Frontend developer",
      company: "Nimble",
      problem:
        "Restaurant bills combine tips, service and processing fees, and VAT, and guests can pay all of it or just a share, so the math has to be exact on every screen. The same app also had to work in Arabic right-to-left, match each restaurant’s brand, and run both on guests’ phones and on in-store kiosks.",
      role: "Frontend developer. Owned the guest payment flows and much of the money logic.",
      features: [
        "Guest payment flows: standalone tips page, full-bill payment, prepayment, service fees, failed and concurrent payments",
        "Money logic for tips, processing fees, fees on tips, VAT and totals",
        "Self-service kiosk mode with a Paymob payment QR code that refreshes every 90 seconds",
        "Arabic and Russian with full RTL layout and per-restaurant language settings",
        "Per-restaurant theming system with 3 branded themes delivered",
        "Foodics POS integration pages",
        "Digital receipts, loyalty sign-up, promo banners and dynamic surveys",
        "Performance work: re-renders, lazy images, deferred Sentry, lighter dependencies, nginx caching and gzip",
      ],
      coverAlt: "Nimble menus for three restaurants, each in its own theme",
      mediaAlt: [
        "Nimble at Harat’s Republic: draft beer menu with prices in AED",
        "Nimble at Coffeemania GCC: breakfast menu with a bonus card button",
        "Nimble at El Primo Taquería: tacos menu in the restaurant’s red theme",
      ],
    },
    "infinity-flowers": {
      summary: "Flower and cake delivery store in Dubai.",
      market: "UAE",
      kind: "E-commerce",
      roleTitle: "Lead frontend developer",
      company: "Client project · Miracalyze",
      problem:
        "Delivery pricing depends on where and when: zones, time slots, express and exact-time delivery, plus promo codes and bonus points, all inside one checkout that has to work on a phone and take payments in two currencies.",
      role: "Lead frontend developer. Built the storefront from scratch.",
      related: {
        slug: "zakazbuketov",
        text: "The same codebase also powers ZakazBuketov.kz",
      },
      featuresIntro:
        "Built on the Next.js 16 App Router with server components and statically generated product pages.",
      features: [
        "Checkout with map-based delivery, zone pricing, time slots, express and exact-time delivery, promo codes and bonus points",
        "Stripe and PayPal payments with a currency selector",
        "httpOnly cookie sessions with CSRF protection and server-side API proxies",
        "GA4 ecommerce events, Google Merchant feed and structured data",
      ],
      coverAlt: "Infinity Flowers home page",
      mediaAlt: [
        "Infinity Flowers home page on desktop: gift categories and a cake promo",
        "Infinity Flowers home page on a phone",
      ],
    },
    zakazbuketov: {
      summary: "Flower delivery store in Almaty.",
      market: "Almaty, Kazakhstan",
      kind: "E-commerce",
      roleTitle: "Lead frontend developer",
      company: "Client project · Miracalyze",
      problem:
        "The Infinity Flowers storefront had to launch in a second market, Almaty, with a different language, brand, currency, backend and local payment methods, without forking into a separate product to maintain from scratch.",
      role: "Adapted the shared storefront for a new brand and market.",
      related: {
        slug: "infinity-flowers",
        text: "Built on the Infinity Flowers storefront",
      },
      features: [
        "Full Russian localization, rebrand and tenge price formatting",
        "Moved the store to a separate backend and API",
        "FreedomPay payments with Kaspi, Halyk, Freedom and Forte, plus a payment-method selector",
        "Phone + one-time-code login (OTP v2) with an anti-fraud session",
        "Custom delivery calendar",
        "Unavailable cart items listed in a collapsible section",
      ],
      coverAlt: "ZakazBuketov.kz home page",
      mediaAlt: [
        "ZakazBuketov.kz home page on desktop: bestsellers with prices in tenge",
        "ZakazBuketov.kz home page on a phone",
      ],
    },
    priglos: {
      summary:
        "Mobile-first web app for digital event invitations in Kazakhstan.",
      market: "Kazakhstan",
      kind: "Consumer app",
      roleTitle: "Frontend developer",
      company: "Client project · Miracalyze",
      problem:
        "Guests arrive from a WhatsApp or Telegram link on their phone, so the whole flow (viewing the invitation, registering by phone, RSVPing) has to work in the browser, in Russian, Kazakh or English.",
      role: "Set up the project from scratch and built the first version of the app; core frontend developer through launch.",
      features: [
        "Event-creation flows: event-type picker, birthday events, organizer and guest roles, guest list, registration flow",
        "Guest comments with status and timestamps",
        "2GIS map previews and city detection by IP",
        "Custom event backgrounds",
        "Event pages connected to live WebSocket updates",
        "Kazakh localization (~1,500 lines, including legal pages), making the app available in Russian, English and Kazakh",
      ],
      coverAlt: "Priglos.kz screens on a phone",
      mediaAlt: [
        "Priglos.kz landing page with RU, EN and KZ language switcher and invitation examples",
        "Priglos.kz event type picker: kids’ birthday or any occasion",
        "Priglos.kz organizer view: upcoming event with a countdown",
      ],
    },
  },
  skills: [
    {
      title: "Frontend",
      items: [
        "React",
        "Next.js (App Router, server components)",
        "TypeScript",
        "Tailwind CSS",
        "SCSS modules",
        "Responsive & cross-browser UI",
      ],
    },
    {
      title: "State & data",
      items: [
        "TanStack Query",
        "Zustand",
        "MobX",
        "Valtio",
        "React Hook Form + Zod",
        "WebSockets",
      ],
    },
    {
      title: "Product experience",
      items: [
        "Checkout & payment flows",
        "Money logic (fees, tips, VAT, split bills)",
        "Third-party payment & POS integrations",
        "Internationalization & RTL layouts",
        "Multi-tenant theming & configuration",
        "Auth & API security (cookie sessions, CSRF, server proxies)",
      ],
    },
    {
      title: "Quality & tooling",
      items: [
        "Vite",
        "Vitest + MSW",
        "Storybook",
        "Sentry",
        "Web performance (Core Web Vitals, bundle size)",
        "SEO & analytics (GA4, structured data)",
      ],
    },
  ],
  contactLabels: {
    linkedin: "LinkedIn",
    github: "GitHub",
    telegram: "Telegram",
    email: "Email",
    cv: "CV",
  },
  sections: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Payments",
    "E-commerce",
    "Internationalization",
  ],
};
