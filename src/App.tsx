import  {  useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Tours from './components/Tours';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TourDetail from './components/TourDetail';
import type { Circui_Model } from '../personnalised_model/database_models';



function App() {
  const [selectedTour, setSelectedTour] = useState<Circui_Model | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Tours onTourSelect={setSelectedTour} />
      <Testimonials />
{/*      <Blog /> */}
      <Contact />
      <Footer />

      {selectedTour && (
        <TourDetail
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </div>
  );
}

export default App;
