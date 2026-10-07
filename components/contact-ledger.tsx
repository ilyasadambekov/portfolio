import { facts, getContent, isTodo } from "@/content";
import type { ContactLink } from "@/content";
import type { Locale } from "@/i18n/routing";
import { LedgerRow } from "./ledger-row";

type ContactLedgerProps = {
  locale: Locale;
  auto?: boolean;
  startIndex?: number;
  exclude?: ContactLink["id"];
};

export function ContactLedger({
  locale,
  auto = false,
  startIndex = 0,
  exclude,
}: ContactLedgerProps) {
  const { contactLabels, contactValues } = getContent(locale);
  const links = facts.links.filter((link) => link.id !== exclude);

  return (
    <ul className="font-mono text-xs sm:text-sm">
      {links.map((link: ContactLink, index) => (
        <li key={link.id} className="border-b border-line last:border-b-0">
          <LedgerRow
            auto={auto}
            index={startIndex + index}
            className="py-2.5"
            label={<span className="text-muted">{contactLabels[link.id]}</span>}
            value={
              <ContactValue
                link={link}
                text={link.display ?? contactValues[link.id] ?? link.href}
              />
            }
          />
        </li>
      ))}
    </ul>
  );
}

function ContactValue({ link, text }: { link: ContactLink; text: string }) {
  if (isTodo(link.href)) {
    return (
      <span className="text-muted" title={link.href}>
        {text}
      </span>
    );
  }

  const newTab = !link.href.startsWith("mailto:");

  return (
    <a
      href={link.href}
      className="link-draw inline-flex items-baseline gap-1 text-fg"
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {text}
      <span aria-hidden="true" className="arrow text-muted">
        ↗
      </span>
    </a>
  );
}
