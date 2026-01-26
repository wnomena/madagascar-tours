import { useEffect, useState } from 'react';
import {type Circui_Model} from "../../personnalised_model/database_models"
import { _Axios } from "../../personnalised_model/fetch_class"
import TourCard from './TourCard';

interface ToursProps {
  onTourSelect: (tour: Circui_Model) => void;
}

export default function Tours({ onTourSelect }: ToursProps) {
  const [tours, setTours] = useState<Circui_Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
    console.log(tours)
  },[]);

  async function fetchTours() {
    try {
      await _Axios.Get_Circuit().then((element) => {
        console.log(element.data.data)
        const list_of_modelised = element.data.data
        list_of_modelised.circuit.forEach((element) => {
            setTours([...tours,{id : element.id,description: element.description,title:element.title,duration: element.duration,difficulty : element.difficulty,image : element.image,price : element.price,subtitle: element.subtitle,equipment: [...list_of_modelised.equipment.filter((element2) => element2.circuit_id == element.id)],itinerary: [...list_of_modelised.itinerary.filter((element3) => element3.circuit_id == element.id)],adrenaline : [...list_of_modelised.adrenaline.filter((element4) => element4.circuit_id == element.id)],include_in_price : [...list_of_modelised.adrenaline.filter((element4) => element4.circuit_id == element.id)]}])
        })
      });
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
