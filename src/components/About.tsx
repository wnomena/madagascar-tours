import { Heart, Users, Leaf, Award } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Passion du voyage',
      description: 'Notre amour pour Madagascar guide chacune de nos actions',
    },
    {
      icon: Users,
      title: 'Tourisme responsable',
      description: 'Respect des communautés locales et partage équitable',
    },
    {
      icon: Leaf,
      title: 'Préservation',
      description: 'Protection de l\'environnement et de la biodiversité unique',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Service de qualité et expériences authentiques garanties',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Qui sommes-nous ?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Madagascar Tours est une agence spécialisée dans l'organisation de voyages authentiques et responsables à Madagascar.
            Depuis plus de 10 ans, nous partageons notre passion pour cette île extraordinaire avec des voyageurs du monde entier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-emerald-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-emerald-100">Années d'expérience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2000+</div>
              <div className="text-emerald-100">Voyageurs satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-emerald-100">Circuits proposés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
