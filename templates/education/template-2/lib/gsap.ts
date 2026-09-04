// Sumber tunggal registrasi plugin GSAP.
// Jangan panggil gsap.registerPlugin() di file lain — impor dari sini saja.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };