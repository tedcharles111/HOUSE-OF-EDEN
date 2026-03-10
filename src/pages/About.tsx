import { motion } from "motion/react";
import { Heart, Shield, Sparkles } from "lucide-react";

const TEAM = [
  {
    name: "Dr. Amina Bello",
    role: "Lead Aesthetician",
    image: "https://picsum.photos/seed/staff1/400/400",
  },
  {
    name: "Sarah Johnson",
    role: "Senior Massage Therapist",
    image: "https://picsum.photos/seed/staff2/400/400",
  },
  {
    name: "David Okeke",
    role: "Skin Care Specialist",
    image: "https://picsum.photos/seed/staff3/400/400",
  },
];

export function About() {
  return (
    <div className="pt-24 md:pt-32 pb-20 bg-paper-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-heading-brown mb-6">
              Our Story
            </h1>
            <div className="w-20 h-1 bg-primary-gold mb-8 rounded-full" />
            <div className="space-y-6 text-lg text-body-brown/80 font-light leading-relaxed">
              <p>
                Founded in 2020, House Of Eden was born from a simple belief:
                everyone deserves a sanctuary where they can escape the hustle
                of daily life and reconnect with their inner peace.
              </p>
              <p>
                We combine ancient wellness traditions with cutting-edge
                aesthetic technology to provide treatments that not only make
                you look beautiful but feel profoundly rejuvenated.
              </p>
              <p>
                Our commitment is to your holistic well-being, ensuring every
                visit leaves you radiating confidence and tranquility.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-primary-gold/20 mix-blend-overlay z-10" />
            <img
              src="https://picsum.photos/seed/about-spa/800/1000"
              alt="Spa Environment"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading-brown mb-4">
              Our Core Values
            </h2>
            <p className="text-body-brown/80 max-w-2xl mx-auto">
              The principles that guide every treatment and interaction at House
              Of Eden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Compassionate Care",
                desc: "We listen to your needs and tailor every experience to ensure your absolute comfort.",
              },
              {
                icon: Sparkles,
                title: "Excellence",
                desc: "From our products to our techniques, we settle for nothing less than the best.",
              },
              {
                icon: Shield,
                title: "Integrity",
                desc: "Transparent pricing, honest advice, and a commitment to your long-term wellness.",
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-light-gray/20 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto bg-peach-accent/30 rounded-full flex items-center justify-center mb-6 text-primary-gold">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-heading-brown mb-3">
                  {value.title}
                </h3>
                <p className="text-body-brown/70">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading-brown mb-4">
              Meet Our Experts
            </h2>
            <p className="text-body-brown/80 max-w-2xl mx-auto">
              Highly trained professionals dedicated to your care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-heading-brown/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-heading-brown mb-1 text-center">
                  {member.name}
                </h3>
                <p className="text-primary-gold font-medium text-center">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
