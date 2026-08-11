/**
 * Public PayPal JS SDK client id and hosted button id for the reservation
 * deposit. These are the AMRabbits farm credentials, carried over so deposits
 * keep landing in the same account.
 *
 * To point deposits at a different PayPal account: create a hosted button in
 * that account (PayPal → Pay & Get Paid → PayPal Buttons), then replace both
 * values below. Both are public by design — safe to commit.
 */
export const PAYPAL_DEPOSIT_CLIENT_ID =
  "BAAN3diUi7W8ez-sF_IxMoZUWex_QLENDfmQPs0FO9cG-G6bJsW36FN-_GdfA-kAjn0advP8xqy7Wql9NI";

export const PAYPAL_HOSTED_DEPOSIT_BUTTON_ID = "3PZTUMN3ZRFXE";
