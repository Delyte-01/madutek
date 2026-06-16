
import { Footer } from "@/components/footer";
import { About } from "@/features/about";
import { Contact } from "@/features/contact";
import { Hero } from "@/features/hero";
import { Process } from "@/features/process";
import { Projects } from "@/features/projects";
import { Services } from "@/features/services";
import { Testimonials } from "@/features/testimonials";



export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Services />
      <Projects />
      <Process />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
