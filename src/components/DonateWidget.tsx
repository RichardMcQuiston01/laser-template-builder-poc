const DONATE_URL = 'https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800';

/**
 * A small floating card, fixed to the bottom-right, inviting donations.
 * The entire card is a link to the Stripe donation page and shows a QR code
 * that encodes the same URL.
 */
export function DonateWidget() {
  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Support this project by donating"
      className="fixed bottom-4 right-4 z-50 flex max-w-xs items-start gap-3 rounded-xl border border-brand-200 bg-white p-3 shadow-lg transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <img
        src="/donate-qr.svg"
        alt="QR code linking to the donation page"
        width={80}
        height={80}
        className="h-20 w-20 shrink-0 rounded"
      />
      <span className="text-xs leading-snug text-brand-900">
        <span className="mb-0.5 block font-semibold text-brand-700">Support this project</span>
        If this app, code, or repository has helped you or someone you know, please consider
        donating. I appreciate any help to offset the costs of development and/or AI Credits.
      </span>
    </a>
  );
}
