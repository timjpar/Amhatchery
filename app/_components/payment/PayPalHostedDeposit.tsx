"use client";

import Script from "next/script";
import { useCallback, useEffect, useId, useRef } from "react";
import {
  PAYPAL_DEPOSIT_CLIENT_ID,
  PAYPAL_HOSTED_DEPOSIT_BUTTON_ID,
} from "@/app/_config/paypal";

type PaypalHosted = {
  HostedButtons: (opts: { hostedButtonId: string }) => { render: (selector: string) => void };
};

function getPaypal(): PaypalHosted | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { paypal?: PaypalHosted }).paypal;
}

/**
 * PayPal's hosted-button SDK logs a benign telemetry message
 * ("ncps_button_container_missing") via console.error when its button container
 * leaves the DOM during client-side navigation away from this page. It does not
 * affect payments, but Next's dev overlay surfaces every console.error. Filter
 * just that one message, app-wide and once; everything else passes through.
 */
let paypalNoiseSilenced = false;
function silencePaypalContainerNoise() {
  if (paypalNoiseSilenced || typeof window === "undefined") return;
  paypalNoiseSilenced = true;
  const original = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("ncps_button_container_missing")
    ) {
      return;
    }
    original(...args);
  };
}

export function PayPalHostedDeposit() {
  const reactId = useId().replace(/:/g, "");
  const containerId = `paypal-hosted-deposit-${reactId}`;
  const rendered = useRef(false);

  const tryRender = useCallback(() => {
    if (rendered.current) return;
    const el = document.getElementById(containerId);
    if (!el || el.childElementCount > 0) return;
    const paypal = getPaypal();
    if (!paypal?.HostedButtons) return;
    try {
      paypal.HostedButtons({ hostedButtonId: PAYPAL_HOSTED_DEPOSIT_BUTTON_ID }).render(
        `#${CSS.escape(containerId)}`,
      );
      rendered.current = true;
    } catch {
      /* hosted button already rendered */
    }
  }, [containerId]);

  useEffect(() => {
    silencePaypalContainerNoise();
    tryRender();
    return () => {
      // Drop the rendered iframe on unmount so we don't leave detached nodes.
      document.getElementById(containerId)?.replaceChildren();
    };
  }, [tryRender, containerId]);

  const sdkSrc = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL_DEPOSIT_CLIENT_ID)}&components=hosted-buttons&enable-funding=venmo&currency=USD`;

  return (
    <div className="w-full min-w-0 flex flex-col gap-2">
      <Script src={sdkSrc} strategy="lazyOnload" onLoad={tryRender} />
      <div id={containerId} className="w-full min-h-[52px] min-w-0" />
      <p className="text-xs text-center m-0 w-full" style={{ color: "var(--c-ink-2)" }}>
        Pay with PayPal, Venmo, or debit/credit card.
      </p>
    </div>
  );
}
