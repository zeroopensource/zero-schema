import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { ZeroSupportButton } from "@/components/ui/zero-support-button";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{
        banner: <ZeroSupportButton />,
      }}
      themeSwitch={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}
