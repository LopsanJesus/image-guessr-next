import Level from "@/components/Level/Level";
import { getNumberOfLevels } from "@/data/cities";

// The level page is fully client-rendered (progress lives in localStorage), so
// prerender every level at build time. Without this the route is the only
// on-demand server-rendered page of the app and depends on a serverless
// function existing at runtime, which is what made every level 500 in
// production with INTERNAL_FUNCTION_NOT_FOUND.
export function generateStaticParams() {
  return Array.from({ length: getNumberOfLevels() }, (_, i) => ({
    level: String(i + 1),
  }));
}

// Any level outside the list is a 404 instead of an on-demand render.
export const dynamicParams = false;

export default function LevelPage() {
  return <Level />;
}
