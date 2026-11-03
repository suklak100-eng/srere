import React, { useState } from 'react';
import { useJewelry } from '../context/JewelryContext';
import {
  Calendar,
  Clock,
  Video,
  User,
  Phone,
  Crown,
  CheckCircle2,
  MessageCircle,
  MapPin,
  Sparkles
} from 'lucide-react';

export const VIPAppointmentSection: React.FC = () => {
  const { bookAppointment, settings } = useJewelry();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('02:00 PM - 03:30 PM');
  const [experienceType, setExperienceType] = useState<
    'Bridal Vault VIP Lounge' | 'WhatsApp Live Video Shopping' | 'Old Gold Exchange Valuation' | 'Bespoke Custom Joaillerie'
  >('Bridal Vault VIP Lounge');
  const [notes, setNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [lastBookingId, setLastBookingId] = useState('');

  const timeSlots = [
    '11:00 AM - 12:30 PM',
    '02:00 PM - 03:30 PM',
    '04:30 PM - 06:00 PM',
    '06:30 PM - 08:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const aptId = 'ARJ-VIP-' + Math.floor(100000 + Math.random() * 900000);
    setLastBookingId(aptId);

    bookAppointment({
      customerName: name,
      phone,
      email: email || 'Not provided',
      date: date || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      timeSlot,
      experienceType,
      notes
    });

    setBookingConfirmed(true);
  };

  const handleOpenWhatsAppConfirmation = () => {
    const cleanPhone = settings.whatsapp.replace(/\D/g, '');
    const msg = `*👑 VIP APPOINTMENT CONFIRMATION - AURELIA ROYAL JEWELS*
  
*Booking ID:* ${lastBookingId}
*Guest:* ${name}
*Contact:* ${phone}
*Experience:* ${experienceType}
*Preferred Date:* ${date}
*Time Slot:* ${timeSlot}
*Special Notes:* ${notes || 'None'}

_Please confirm my private suite reservation at the showroom or send the live video call invitation link._`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="vip-visit" className="py-24 bg-[#08090A] relative overflow-hidden text-neutral-100 border-t border-[#C5A880]/15">
      
      {/* Golden Radial Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A880]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Editorial Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[10px] font-cinzel uppercase tracking-[0.25em]">
              <Crown className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>White-Glove Salon Concierge</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-royal font-light text-white leading-tight">
              Reserve a Private Bridal Salon or HD Video Showing
            </h2>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
              Experience the Aurelia royal hospitality. Savor Darjeeling artisanal tea in our private high-jewelry bridal salon, or inspect masterworks live via HD video with our chief gemologist from anywhere across the globe.
            </p>

            {/* 3 VIP Privileges */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0D0E11] border border-[#C5A880]/20">
                <div className="p-2 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel font-bold text-sm text-[#FFF3B0]">Exclusive Private Bridal Vault</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Uninterrupted one-on-one bridal styling with curated trousseau pairings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0D0E11] border border-[#C5A880]/20">
                <div className="p-2 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex-shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel font-bold text-sm text-[#FFF3B0]">HD WhatsApp Live Video Tour</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Inspect gemstone clarities, flexibility, and weight directly on video with high-magnification lenses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0D0E11] border border-[#C5A880]/20">
                <div className="p-2 rounded-xl bg-[#C5A880]/15 text-[#C5A880] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel font-bold text-sm text-[#FFF3B0]">Valet Parking & Champagne Welcome</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Complimentary VIP valet parking at our flagship Heritage Boulevard showroom.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Booking Card */}
          <div className="lg:col-span-7">
            
            <div className="p-6 sm:p-9 rounded-3xl bg-[#0D0E11] border border-[#C5A880]/35 shadow-2xl relative">
              
              {bookingConfirmed ? (
                <div className="text-center py-8 space-y-5 animate-scale">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-[#C5A880] tracking-widest uppercase">
                      Passcode: {lastBookingId}
                    </span>
                    <h3 className="font-royal text-3xl font-normal text-white">
                      Your VIP Suite is Reserved
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto pt-1 font-sans">
                      Thank you, <strong>{name}</strong>. Our Senior Bridal Director has been notified for your {experienceType} on <strong>{date || 'Upcoming Date'}</strong> ({timeSlot}).
                    </p>
                  </div>

                  {/* Confirmation Details Pill */}
                  <div className="p-4 rounded-2xl bg-[#14171A] border border-[#C5A880]/25 max-w-md mx-auto text-left text-xs space-y-2">
                    <div className="flex justify-between text-neutral-400">
                      <span>Experience:</span>
                      <span className="text-white font-semibold">{experienceType}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Showroom Location:</span>
                      <span className="text-[#FFF3B0] font-semibold">{settings.address}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Phone:</span>
                      <span className="text-white font-mono">{phone}</span>
                    </div>
                  </div>

                  {/* WhatsApp Quick Link */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleOpenWhatsAppConfirmation}
                      className="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirm via WhatsApp Concierge</span>
                    </button>

                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-neutral-300 text-xs font-semibold"
                    >
                      Book Another Session
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="font-cinzel text-xl font-bold text-white">
                      Reserve Your Private Session
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Complimentary consultation with zero commitment required.
                    </p>
                  </div>

                  {/* Experience Type Radio Buttons */}
                  <div>
                    <label className="block text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider mb-2">
                      Select Preferred Experience
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'Bridal Vault VIP Lounge', label: 'Bridal Lounge (Showroom)' },
                        { id: 'WhatsApp Live Video Shopping', label: 'Live Video Call (Home)' },
                        { id: 'Old Gold Exchange Valuation', label: '0% Old Gold Valuation' },
                        { id: 'Bespoke Custom Joaillerie', label: 'Bespoke Custom Design' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setExperienceType(item.id as any)}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                            experienceType === item.id
                              ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-sm'
                              : 'bg-[#14171A] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <div className="font-semibold text-neutral-200">{item.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Radhika Merchant"
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#14171A] border border-[#C5A880]/25 text-white text-xs placeholder-neutral-500 focus:border-[#C5A880] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider mb-1.5">
                        WhatsApp / Mobile *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#14171A] border border-[#C5A880]/25 text-white text-xs placeholder-neutral-500 focus:border-[#C5A880] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider mb-1.5">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#14171A] border border-[#C5A880]/25 text-white text-xs focus:border-[#C5A880] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider mb-1.5">
                        Time Slot
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#14171A] border border-[#C5A880]/25 text-white text-xs focus:border-[#C5A880] outline-none"
                        >
                          {timeSlots.map((ts) => (
                            <option key={ts} value={ts} className="bg-[#08090A] text-white">
                              {ts}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Specific notes */}
                  <div>
                    <label className="block text-xs font-cinzel text-[#FFF3B0] uppercase tracking-wider mb-1.5">
                      Jewelry Focus / Wedding Date / Preferences (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Looking for Kundan Rani Haar with emerald accents for December sangeet..."
                      className="w-full p-3 rounded-xl bg-[#14171A] border border-[#C5A880]/25 text-white text-xs placeholder-neutral-500 focus:border-[#C5A880] outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-luxury-gold w-full py-4 rounded-full text-xs sm:text-sm font-cinzel font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2"
                  >
                    <Crown className="w-4 h-4 text-[#08090A]" />
                    <span>Confirm VIP Reservation</span>
                  </button>

                  <div className="text-center text-[10px] text-neutral-400">
                    🔒 Strictly confidential. Your details are reserved solely for showroom hospitality.
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
