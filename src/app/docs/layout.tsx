import { PageFrame } from "@/components/page/PageFrame";
import { DocsShell } from "@/components/docs/DocsShell";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageFrame>
      <DocsShell>{children}</DocsShell>
    </PageFrame>
  );
}
