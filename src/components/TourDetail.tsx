import { X, Clock, TrendingUp, Euro, Check, MapPin, Calendar } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import BookingForm from './BookingForm';

import type { Circui_Model } from '../../personnalised_model/database_models';

interface TourDetailProps {
  tour: Circui_Model;
  onClose: () => void;
}

export default function TourDetail({ tour, onClose }: TourDetailProps) {
  const [showBooking, setShowBooking] = useState(false);
  const itinerary_order = useMemo(() => {
    return tour.itinerary.sort((a,b) => a.circuit_id - b.circuit_id)
},[tour.itinerary])
  useEffect(() => {
    console.log(tour)
  },[tour])
  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
            >
              <X className="h-6 w-6 text-gray-900" />
            </button>

            <div className="relative h-96 rounded-t-xl overflow-hidden">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{tour.title}</h1>
                <p className="text-xl text-gray-200">{tour.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="text-sm text-gray-600">Durée</div>
                  <div className="font-semibold">{tour.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="text-sm text-gray-600">Difficulté</div>
                  <div className="font-semibold">{tour.difficulty}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="text-sm text-gray-600">À partir de</div>
                  <div className="text-2xl font-bold text-emerald-600">{tour.price}€</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{tour.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Points forts</h2>
                <ul className="space-y-3">
                  {tour.adrenaline.map(({id, content}) => (
                    <li key={id} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-emerald-600" />
                Itinéraire détaillé
              </h2>
              <div className="space-y-4">
                {itinerary_order.map(({day, id,place,description}) => (
                  <div
                    key={id}
                    className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        {day}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{place}</h3>
                    </div>
                    <p className="text-gray-700 ml-13 leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Inclus dans le prix</h2>
                <ul className="space-y-2">
                  {tour.include_in_price.map(({id, content}) => (
                    <li key={id} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{content}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Équipement nécessaire</h2>
                <ul className="space-y-2">
                  {tour.equipment.map(({id, equipement}) => (
                    <li key={id} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{equipement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 rounded-xl text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Prêt pour l'aventure ?</h3>
                  <p className="text-emerald-100">Réservez maintenant ou demandez un devis personnalisé</p>
                </div>
                <button
                  onClick={() => setShowBooking(true)}
                  className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition flex items-center gap-2 whitespace-nowrap"
                >
                  <Calendar className="h-5 w-5" />
                  Réserver ce circuit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <BookingForm
          tour={tour}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}
