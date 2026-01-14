import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mado-Sam | Finest Sweets In Town",
 
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
