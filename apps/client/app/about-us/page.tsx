import type { Metadata } from "next";
import { AboutPage } from "../../features/about/about-page";

export const metadata: Metadata = {
  title: "About WorkBridge | Jobs and Talent in Ethiopia",
  description:
    "Learn how WorkBridge connects job seekers and employers across Ethiopia.",
};

export default function AboutUsRoute() {
  return <AboutPage />;
}
