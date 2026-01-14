import "../css/euclid-circular-a-font.css";
import "../css/style.css";

import ClientShell from "../client-shell";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
