
// /infinity-coin (Hidden Route)
import { useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function InfinityCoinPage() {
  useEffect(() => {
    if (!window?.CodexActive) {
      window.location.href = '/'; // Redirect unless Codex is active
    }
  }, []);
  const link = "https://www.infinityxos.com/x1-predict";
  return (
    <div className="hidden-codex-ui">
      <h1>Infinity Coin QR Access</h1>
      <QRCodeCanvas value={link} size={256} />
    </div>
  );
}
