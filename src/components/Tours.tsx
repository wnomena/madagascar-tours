import { useEffect, useState } from 'react';
import { supabase, Tour } from '../lib/supabase';
import TourCard from './TourCard';

interface ToursProps {
  onTourSelect: (tour: Tour) => void;
}

export default function Tours({ onTourSelect }: ToursProps) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  async function fetchTours() {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTours(data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="circuits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-gray-400">Chargement des circuits...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="circuits" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Circuits Phares</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos circuits soigneusement élaborés pour vous faire vivre une expérience inoubliable à Madagascar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onSelect={onTourSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}
