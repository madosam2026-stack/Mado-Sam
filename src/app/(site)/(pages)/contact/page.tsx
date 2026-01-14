import Contact from "@/components/Contact";

import { Metadata } from "next";
export const metadata: Metadata = {
 title: "Mado-Sam | Finest Sweets In Town",

  // other metadata
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
