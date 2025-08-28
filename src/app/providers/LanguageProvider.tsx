// Dieser Provider ist durch next-intl ersetzt worden und bleibt als Stub erhalten,
// bis die alten Importe entfernt sind. Verhindert Build-Fehler während der Migration.
import type { PropsWithChildren, ReactElement } from "react";

export function LanguageProvider({ children }: PropsWithChildren): ReactElement {
  return <>{children}</>;
}
