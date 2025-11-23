import { Menu, X, Palmtree } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('accueil')}>
            <Palmtree className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">Madagascar Tours</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-emerald-600 transition">
              Accueil
            </button>
            <button onClick={() => scrollToSection('circuits')} className="text-gray-700 hover:text-emerald-600 transition">
              Nos Circuits
            </button>
            <button onClick={() => scrollToSection('blog')} className="text-gray-700 hover:text-emerald-600 transition">
              Blog
            </button>
            <button onClick={() => scrollToSection('temoignages')} className="text-gray-700 hover:text-emerald-600 transition">
              Témoignages
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-emerald-600 transition">
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              Réserver
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <button onClick={() => scrollToSection('accueil')} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition py-2">
              Accueil
            </button>
            <button onClick={() => scrollToSection('circuits')} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition py-2">
              Nos Circuits
            </button>
            <button onClick={() => scrollToSection('blog')} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition py-2">
              Blog
            </button>
            <button onClick={() => scrollToSection('temoignages')} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition py-2">
              Témoignages
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition py-2">
              Contact
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              Réserver
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
