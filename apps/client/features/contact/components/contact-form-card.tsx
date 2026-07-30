import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";

export function ContactFormCard() {
  return (
    <section className="rounded-2xl bg-slate-200 px-6 py-7">
      <h2 className="text-center text-base font-black text-slate-950">
        Get in Touch with WorkBridg
      </h2>

      <form className="mt-5 space-y-6">
        <Input
          label="Full name"
          name="fullName"
          placeholder="Type your full name here"
          className="h-12 border-0 shadow-none"
        />
        <Input
          label="Email"
          name="email"
          placeholder="Type your email here"
          type="email"
          className="h-12 border-0 shadow-none"
        />
        <Textarea
          label="Message"
          name="message"
          placeholder="Type your message here"
          className="min-h-28 resize-none border-0 px-5 py-4 shadow-none"
        />
        <Button size="sm" variant="secondary" className="bg-[#02081d]">
          Send Message
        </Button>
      </form>
    </section>
  );
}
