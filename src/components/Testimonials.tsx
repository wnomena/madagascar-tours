import { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../../personnalised_model/database_models';

export default function Testimonials() {
  const [testimonials] = useState<Testimonial[]>([]);



  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ils ont voyagé avec nous</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez les témoignages de nos voyageurs qui ont vécu l'aventure Madagascar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-gray-50 to-emerald-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <Quote className="h-10 w-10 text-emerald-600 mb-4 opacity-50" />

              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed italic">
                "{testimonial.comment}"
              </p>

              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.author_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
