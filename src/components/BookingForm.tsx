import  { useState } from 'react';
import { X, Calendar, Users, Mail, Phone, User, MessageSquare } from 'lucide-react';
import React from 'react';
import { type Circui_Model } from '../../personnalised_model/database_models';
import { _Axios } from '../../personnalised_model/fetch_class';

interface BookingFormProps {
  tour: Circui_Model;
  onClose: () => void;
}

export default function BookingForm({ tour, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    travelers: 1,
    start_date: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      _Axios.Set_Contact({circuit_id:tour.id,name:formData.full_name,mail:formData.email,number:formData.phone,number_of_person:formData.travelers,begining:formData.start_date,total_price:tour.price * formData.travelers,subject:undefined,body:formData.message}).then(() => {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      }).catch(function(err) {
        throw Error(err)
      })
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = tour.price * formData.travelers;

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
          <p className="text-gray-600 leading-relaxed">
            Nous avons bien reçu votre demande de réservation. Notre équipe vous contactera dans les plus brefs délais.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] overflow-y-auto">
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-t-xl relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">Réserver votre voyage</h2>
            <p className="text-emerald-100">{tour.title}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                Nom complet *
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Votre nom et prénom"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Téléphone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="+33 6 00 00 00 00"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date de départ souhaitée *
                </label>
                <input
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  Nombre de voyageurs *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="20"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MessageSquare className="inline h-4 w-4 mr-1" />
                Message ou demandes particulières
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Questions, besoins spécifiques, régimes alimentaires..."
              />
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Prix total estimé :</span>
                <span className="text-2xl font-bold text-emerald-600">{totalPrice}€</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Prix pour {formData.travelers} voyageur{formData.travelers > 1 ? 's' : ''} × {tour.duration}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Cette demande ne constitue pas une réservation définitive. Notre équipe reviendra vers vous pour confirmer les disponibilités.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
