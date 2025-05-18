'use client';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Casa Vacanza nel Salento', href: '#salento' },
  { label: 'Villa Donna Ester', href: '#ester' },
  { label: 'Prezzi e Prenotazioni', href: '#prenotazioni' },
  { label: 'Contatti', href: '#contatti' },
];

const scrollToSection = (id) => {
  const section = document.querySelector(id);
  if (section) section.scrollIntoView({ behavior: 'smooth' });
};

const Gallery = ({ bgColor, images }) => {
  const scrollRef = useRef(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const scrollGallery = () => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pr-6">
        {images.map((url, i) => (
          <motion.div
            key={i}
            onClick={() => setZoomedImage(url)}
            className={\`min-w-[300px] h-64 \${bgColor} rounded shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer\`}
            style={{ backgroundImage: \`url(\${url})\`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        ))}
      </div>
      <div onClick={scrollGallery} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-sky-100 cursor-pointer px-2 py-1 rounded-l shadow">➤</div>
      {zoomedImage && (
        <div onClick={() => setZoomedImage(null)} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center cursor-pointer">
          <img src={zoomedImage} alt="Zoom" className="max-w-full max-h-full rounded shadow-lg" />
        </div>
      )}
    </div>
  );
};

const CheckoutSection = ({ id, title, description, bgColor, pricePerPerson, guests, images }) => {
  const [selectedDates, setSelectedDates] = useState(null);
  const [numGuests, setNumGuests] = useState(guests[0]);

  return (
    <section id={id} className="max-w-7xl mx-auto">
      <h2 className="text-4xl mb-4 text-center text-sky-700">{title}</h2>
      <p className="text-lg text-neutral-700 mb-6 text-center">{description}</p>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-2/3"><Gallery bgColor={bgColor} images={images} /></div>
        <div className="w-full md:w-1/3 space-y-4">
          <Calendar mode="range" selected={selectedDates} onSelect={setSelectedDates} className="rounded border shadow-sm" />
          <select value={numGuests} onChange={(e) => setNumGuests(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-4 py-2">
            {guests.map((n) => <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'persone'}</option>)}
          </select>
          <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full">Prenota Ora</Button>
        </div>
      </div>
    </section>
  );
};

const App = () => (
  <div className="font-light font-serif bg-beige text-neutral-900 min-h-screen scroll-smooth" style={{ backgroundColor: '#f5f5dc' }}>
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-sky-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl tracking-tight font-bold text-sky-600">Ester Apartments</div>
        <nav className="flex flex-1 justify-evenly ml-8">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => scrollToSection(item.href)} className="text-sm text-neutral-800 hover:text-sky-600 bg-transparent border-0 cursor-pointer">
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>

    <main className="px-6 pt-32 pb-24 space-y-24">
      <CheckoutSection id="salento" title="Casa Vacanza nel Salento" description="Una residenza elegante a pochi passi dal mare..." bgColor="bg-sky-200" pricePerPerson={45} guests={[2, 3, 4]} images={["https://cf.bstatic.com/xdata/images/hotel/max1280x900/377832522.jpg?k=...", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/377832579.jpg?k=..."]} />
      <CheckoutSection id="ester" title="Villa Donna Ester" description="Una villa immersa nella natura con interni moderni..." bgColor="bg-sky-300" pricePerPerson={70} guests={[1, 2]} images={["https://cf.bstatic.com/xdata/images/hotel/max1280x900/683886003.jpg?k=...", "https://cf.bstatic.com/xdata/images/hotel/max1280x900/683889130.jpg?k=..."]} />
      <section id="prenotazioni" className="max-w-2xl mx-auto text-center space-y-6">
        <h3 className="text-2xl text-sky-700">Prezzi e Prenotazioni</h3>
        <p className="text-neutral-700">Contattaci per disponibilità e offerte su misura.</p>
        <Button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full" onClick={() => scrollToSection('#salento')}>Prenota Ora</Button>
      </section>
      <section id="contatti" className="max-w-xl mx-auto text-center space-y-4">
        <h3 className="text-2xl text-sky-700">Contatti</h3>
        <p>Email: <a href="mailto:itay.rutigliano@gmail.com" className="underline">itay.rutigliano@gmail.com</a></p>
        <p>Telefono: +39 3277426854</p>
      </section>
    </main>
    <footer className="text-center py-4 text-sm text-neutral-600 border-t border-sky-200">
      © {new Date().getFullYear()} Ester Apartments. Tutti i diritti riservati.
    </footer>
  </div>
);

export default App;
