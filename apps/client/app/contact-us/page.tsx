import type { Metadata } from "next";
import { ContactPage } from "../../features/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact WorkBridge | Support and Hiring Help",
  description:
    "Contact WorkBridge for job support, hiring assistance, payments, and account questions.",
};

export default function ContactUsRoute() {
  return <ContactPage />;
}
