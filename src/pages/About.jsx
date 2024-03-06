import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex flex-col items-center justify-center">
        <div>
          <h1>Aktietävling</h1>

          <p className="text-center mt-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            facere quidem rem soluta vel libero ad incidunt dicta, dolore,
            dolorum, sequi laboriosam officia. Pariatur ut minus alias. Aliquam,
            aliquid esse!
          </p>
        </div>
      </main>
      <Footer/>
    </>
  );
}
