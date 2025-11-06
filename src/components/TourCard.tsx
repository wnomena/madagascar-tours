import { Clock, TrendingUp, Euro } from 'lucide-react';
import { Tour } from '../lib/supabase';

interface TourCardProps {
  tour: Tour;
  onSelect: (tour: Tour) => void;
}

export default function TourCard({ tour, onSelect }: TourCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.image_url}
          alt={tour.title}
          className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {tour.featured ? 'Populaire' : 'Nouveau'}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tour.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{tour.subtitle}</p>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-emerald-600" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span>{tour.difficulty}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-1">
            <Euro className="h-5 w-5 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">{tour.price}</span>
            <span className="text-gray-600 text-sm">/pers</span>
          </div>
          <button
            onClick={() => onSelect(tour)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition font-semibold"
          >
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );
}
