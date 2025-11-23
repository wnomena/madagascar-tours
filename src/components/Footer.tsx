import { Palmtree, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Palmtree className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">Madagascar Tours</span>
            </div>
            <p className="text-sm text-gray-400">
              Découvrez la beauté authentique de Madagascar avec des circuits responsables et éthiques.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#accueil" className="hover:text-emerald-500 transition">Accueil</a></li>
              <li><a href="#circuits" className="hover:text-emerald-500 transition">Nos Circuits</a></li>
              <li><a href="#blog" className="hover:text-emerald-500 transition">Blog</a></li>
              <li><a href="#temoignages" className="hover:text-emerald-500 transition">Témoignages</a></li>
              <li><a href="#contact" className="hover:text-emerald-500 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Antananarivo, Madagascar</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>+261 34 00 000 00</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>contact@madagascar-tours.mg</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-600 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-600 transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-white font-semibold mb-2 text-sm">Support 24/7</h4>
              <p className="text-xs text-gray-400">
                Notre équipe est disponible pour vous assister à tout moment de votre voyage.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Madagascar Tours. Tous droits réservés.</p>
          <p className="mt-2">Tourisme responsable et éthique à Madagascar</p>
        </div>
      </div>
    </footer>
  );
}
