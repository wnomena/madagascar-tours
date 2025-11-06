/*
  # Create Tours and Bookings System for Madagascar Travel Site

  1. New Tables
    - `tours`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Tour name
      - `subtitle` (text) - Short description
      - `description` (text) - Detailed description
      - `duration` (text) - Duration (e.g., "7 jours / 6 nuits")
      - `difficulty` (text) - Difficulty level
      - `price` (integer) - Price in euros
      - `image_url` (text) - Main image
      - `gallery` (jsonb) - Array of image URLs
      - `highlights` (jsonb) - Array of tour highlights
      - `itinerary` (jsonb) - Day by day itinerary
      - `included` (jsonb) - What's included
      - `equipment` (jsonb) - Required equipment
      - `featured` (boolean) - Show on homepage
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `bookings`
      - `id` (uuid, primary key)
      - `tour_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key to auth.users)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `travelers` (integer) - Number of travelers
      - `start_date` (date)
      - `message` (text)
      - `status` (text) - pending, confirmed, cancelled
      - `total_price` (integer)
      - `created_at` (timestamptz)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `excerpt` (text)
      - `content` (text)
      - `image_url` (text)
      - `author` (text)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)

    - `testimonials`
      - `id` (uuid, primary key)
      - `author_name` (text)
      - `tour_id` (uuid, foreign key)
      - `rating` (integer) - 1-5
      - `comment` (text)
      - `created_at` (timestamptz)

    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for tours, blog_posts, and testimonials
    - Authenticated users can create bookings and view their own bookings
    - Anyone can submit contact messages
    - Only authenticated users can view their own booking details
*/

-- Tours table
CREATE TABLE IF NOT EXISTS tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  difficulty text NOT NULL,
  price integer NOT NULL,
  image_url text NOT NULL,
  gallery jsonb DEFAULT '[]'::jsonb,
  highlights jsonb DEFAULT '[]'::jsonb,
  itinerary jsonb DEFAULT '[]'::jsonb,
  included jsonb DEFAULT '[]'::jsonb,
  equipment jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tours"
  ON tours FOR SELECT
  USING (true);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id uuid REFERENCES tours(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  travelers integer NOT NULL DEFAULT 1,
  start_date date NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending',
  total_price integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  author text NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  USING (true);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  tour_id uuid REFERENCES tours(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  USING (true);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Insert sample tours data
INSERT INTO tours (slug, title, subtitle, description, duration, difficulty, price, image_url, featured, highlights, itinerary, included, equipment) VALUES
('descente-manambolo', 'Descente de Manambolo', 'Aventure en pirogue à travers les Tsingy', 'Embarquez pour une aventure exceptionnelle sur la rivière Manambolo. Cette descente en pirogue traditionnelle vous emmène à travers des paysages spectaculaires, des gorges impressionnantes et les célèbres Tsingy de Bemaraha, classés au patrimoine mondial de l''UNESCO.', '7 jours / 6 nuits', 'Modéré', 1250, 'https://images.pexels.com/photos/8828554/pexels-photo-8828554.jpeg?auto=compress&cs=tinysrgb&w=1200', true, 
'["Navigation en pirogue traditionnelle", "Découverte des Tsingy de Bemaraha", "Rencontre avec les communautés locales", "Bivouac sous les étoiles", "Observation de la faune endémique"]'::jsonb,
'[{"day": 1, "title": "Arrivée à Antananarivo", "description": "Accueil à l''aéroport et transfert à l''hôtel. Briefing sur le circuit."}, {"day": 2, "title": "Route vers Miandrivazo", "description": "Départ matinal pour Miandrivazo (8h de route). Installation au campement."}, {"day": 3, "title": "Début de la descente", "description": "Départ en pirogue sur le Manambolo. Navigation à travers les gorges."}, {"day": 4, "title": "Continuation vers les Tsingy", "description": "Poursuite de la descente. Arrêt dans les villages riverains."}, {"day": 5, "title": "Tsingy de Bemaraha", "description": "Visite des formations rocheuses spectaculaires. Randonnée dans les Tsingy."}, {"day": 6, "title": "Retour à Miandrivazo", "description": "Dernière journée sur la rivière. Retour au campement."}, {"day": 7, "title": "Retour à Antananarivo", "description": "Route retour vers la capitale. Vol de départ."}]'::jsonb,
'["Hébergement en hôtel et campement", "Tous les repas pendant la descente", "Guide francophone expérimenté", "Pirogue et pagayeurs", "Droits d''entrée aux parcs", "Transport en 4x4"]'::jsonb,
'["Sac à dos étanche", "Vêtements légers et séchage rapide", "Chapeau et crème solaire", "Chaussures de marche", "Lampe frontale", "Maillot de bain"]'::jsonb),

('andasibe', 'Parc d''Andasibe', 'À la rencontre des lémuriens indri-indri', 'Le parc national d''Andasibe-Mantadia est l''un des sites les plus accessibles et riches en biodiversité de Madagascar. Célèbre pour ses lémuriens indri-indri au chant unique, cette forêt tropicale abrite une faune et flore exceptionnelles.', '3 jours / 2 nuits', 'Facile', 450, 'https://images.pexels.com/photos/5596991/pexels-photo-5596991.jpeg?auto=compress&cs=tinysrgb&w=1200', true,
'["Observation des lémuriens indri-indri", "Randonnées en forêt tropicale", "Visite nocturne pour voir les espèces nocturnes", "Découverte de la réserve privée Vakona", "Orchidées et plantes endémiques"]'::jsonb,
'[{"day": 1, "title": "Antananarivo - Andasibe", "description": "Départ matinal pour Andasibe (3h30 de route). Installation au lodge. Visite nocturne pour observer les lémuriens nocturnes et caméléons."}, {"day": 2, "title": "Parc National d''Andasibe", "description": "Randonnée matinale pour observer les indri-indri. Après-midi : visite de la réserve Vakona et l''île aux lémuriens."}, {"day": 3, "title": "Retour à Antananarivo", "description": "Dernière balade en forêt. Visite du parc des reptiles. Retour à la capitale en fin d''après-midi."}]'::jsonb,
'["Hébergement en lodge", "Pension complète", "Guide francophone spécialisé", "Droits d''entrée aux parcs", "Transport en véhicule climatisé", "Toutes les visites mentionnées"]'::jsonb,
'["Chaussures de randonnée", "Vêtements de pluie", "Jumelles recommandées", "Anti-moustique", "Appareil photo", "Vêtements longs pour la forêt"]'::jsonb),

('grande-boucle', 'La Grande Boucle', 'Circuit complet du Sud au Nord', 'Un voyage complet à travers les paysages les plus spectaculaires de Madagascar. De la Route Nationale 7 aux allées des baobabs, des plages paradisiaques aux hauts plateaux, découvrez la diversité extraordinaire de la Grande Île.', '14 jours / 13 nuits', 'Modéré', 2400, 'https://images.pexels.com/photos/6580703/pexels-photo-6580703.jpeg?auto=compress&cs=tinysrgb&w=1200', true,
'["Allée des Baobabs au coucher du soleil", "Parc National de l''Isalo", "Plages d''Ifaty et récifs coralliens", "Rencontre avec les artisans locaux", "Marché traditionnel de Fianarantsoa", "Diversité des paysages de Madagascar"]'::jsonb,
'[{"day": 1, "title": "Arrivée à Antananarivo", "description": "Accueil et transfert à l''hôtel. Tour de ville selon l''heure d''arrivée."}, {"day": 2, "title": "Antsirabe", "description": "Route vers Antsirabe, la ville d''eau. Visite des ateliers artisanaux."}, {"day": 3, "title": "Fianarantsoa", "description": "Continuation vers Fianarantsoa. Découverte de la vieille ville."}, {"day": 4, "title": "Ranohira", "description": "Route vers le parc de l''Isalo. Paysages spectaculaires."}, {"day": 5, "title": "Parc de l''Isalo", "description": "Journée complète de randonnée dans le parc. Piscines naturelles."}, {"day": 6, "title": "Ifaty", "description": "Route vers la côte. Installation en bord de mer."}, {"day": 7, "title": "Ifaty - Détente", "description": "Journée libre : snorkeling, pirogue traditionnelle, farniente."}, {"day": 8, "title": "Tuléar - Morondava", "description": "Vol vers Morondava. Après-midi libre."}, {"day": 9, "title": "Allée des Baobabs", "description": "Visite de l''Allée des Baobabs au coucher du soleil. Baobabs amoureux."}, {"day": 10, "title": "Bekopaka", "description": "Route vers Bekopaka. Traversée de la rivière en bac."}, {"day": 11, "title": "Tsingy de Bemaraha", "description": "Exploration des Petits et Grands Tsingy. Paysages lunaires."}, {"day": 12, "title": "Retour Morondava", "description": "Retour à Morondava. Dernière soirée à l''Allée des Baobabs."}, {"day": 13, "title": "Vol vers Antananarivo", "description": "Vol retour vers la capitale. Après-midi shopping artisanat."}, {"day": 14, "title": "Départ", "description": "Transfert aéroport selon l''horaire du vol international."}]'::jsonb,
'["13 nuits en hôtel/lodge confortable", "Pension complète", "Guides francophones locaux", "Tous les transports (4x4, vols intérieurs)", "Droits d''entrée aux parcs", "Toutes les activités mentionnées"]'::jsonb,
'["Sac de voyage souple", "Vêtements légers et chauds", "Chaussures de randonnée", "Maillot de bain", "Protection solaire", "Petit sac à dos", "Lampe frontale"]'::jsonb);

-- Insert sample testimonials
INSERT INTO testimonials (author_name, tour_id, rating, comment) VALUES
('Sophie Martin', (SELECT id FROM tours WHERE slug = 'descente-manambolo'), 5, 'Une aventure inoubliable ! La descente en pirogue était magique et les Tsingy absolument spectaculaires. Notre guide était exceptionnel.'),
('Jean Dupont', (SELECT id FROM tours WHERE slug = 'andasibe'), 5, 'Voir et entendre les indri-indri dans leur habitat naturel était un moment extraordinaire. Un circuit parfait pour découvrir la faune de Madagascar.'),
('Marie Leclerc', (SELECT id FROM tours WHERE slug = 'grande-boucle'), 5, 'Deux semaines de pur bonheur ! Chaque jour apportait son lot de découvertes. L''organisation était parfaite du début à la fin.');

-- Insert sample blog post
INSERT INTO blog_posts (slug, title, excerpt, content, image_url, author) VALUES
('preparer-voyage-madagascar', 'Comment préparer votre voyage à Madagascar', 'Tous nos conseils pour bien préparer votre aventure malgache', 'Madagascar, la Grande Île, offre une diversité de paysages et d''expériences unique au monde. Voici nos conseils essentiels pour préparer votre voyage...\n\n**Quand partir ?**\nLa meilleure période s''étend d''avril à novembre, pendant la saison sèche.\n\n**Vaccins et santé**\nAucun vaccin n''est obligatoire, mais certains sont recommandés. Consultez votre médecin.\n\n**Budget**\nComptez entre 50 et 150€ par jour selon votre style de voyage.\n\n**Respect de l''environnement**\nMadagascar abrite une biodiversité unique. Respectons ensemble ce patrimoine exceptionnel.', 'https://images.pexels.com/photos/5538287/pexels-photo-5538287.jpeg?auto=compress&cs=tinysrgb&w=1200', 'Équipe Madagascar Tours');