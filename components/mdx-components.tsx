import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import Layman from "./Layman";
import Standard from "./Standard";
import Mermaid from "./Mermaid";

/**
 * Component map passed to <MDXRemote />. Custom block components power the
 * layman/standard toggle and diagrams; the rest inherit `prose` styling.
 */
export const mdxComponents: MDXRemoteProps["components"] = {
  Layman,
  Standard,
  Mermaid,
};
