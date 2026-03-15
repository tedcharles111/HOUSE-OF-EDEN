import { motion } from "motion/react";
import { Heart, Shield, Sparkles, Award, Clock, Users } from "lucide-react";

const TEAM = [
  {
    name: "Dr. Amina Bello",
    role: "Lead Aesthetician & Founder",
    image: "https://picsum.photos/seed/staff1/400/400",
    bio: "With over 15 years of experience in dermatology and aesthetic medicine, Dr. Bello founded House of Eden to bring world-class skincare to Lagos.",
  },
  {
    name: "Sarah Johnson",
    role: "Senior Massage Therapist",
    image: "https://picsum.photos/seed/staff2/400/400",
    bio: "Specializing in deep tissue and hot stone therapies, Sarah has a magic touch that melts away chronic tension and stress.",
  },
  {
    name: "David Okeke",
    role: "Skin Care Specialist",
    image: "https://picsum.photos/seed/staff3/400/400",
    bio: "David is our resident expert on non-invasive body contouring and advanced facial treatments, certified internationally.",
  },
  {
    name: "Grace Adeyemi",
    role: "Nail Technician",
    image: "https://picsum.photos/seed/staff4/400/400",
    bio: "Grace brings creativity and precision to every manicure and pedicure, ensuring your hands and feet look flawless.",
  },
];

const MILESTONES = [
  {
    year: "2020",
    title: "The Beginning",
    desc: "House of Eden opened its doors in Victoria Island with a small team of 3 dedicated therapists.",
  },
  {
    year: "2022",
    title: "Expansion",
    desc: "Introduced advanced aesthetic treatments including Lipo Cavitation and Laser therapies.",
  },
  {
    year: "2024",
    title: "Award Winning",
    desc: 'Voted "Best Luxury Spa in Lagos" by the West African Wellness Association.',
  },
  {
    year: "2026",
    title: "New Horizons",
    desc: "Launched our exclusive line of organic, locally sourced skincare products.",
  },
];

export function About() {
  return (
    <div className="pt-24 md:pt-32 pb-20 bg-paper-bg min-h-screen">
      {/* Hero / Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary-gold font-medium tracking-wider uppercase text-sm mb-4 block">
              Our Heritage
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-heading-brown mb-6">
              The Eden Story
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
                visit leaves you radiating confidence and tranquility. We don't
                just offer services; we curate experiences.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-primary-gold/20 mix-blend-overlay z-10" />
            <img
              src="https://picsum.photos/seed/about-spa-hero/800/1000"
              alt="Spa Environment"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg z-20 max-w-xs">
              <Award className="text-primary-gold mb-3" size={32} />
              <h4 className="font-serif font-bold text-heading-brown text-lg mb-1">
                Excellence Award
              </h4>
              <p className="text-sm text-body-brown/80">
                Recognized for outstanding service in wellness and aesthetics.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="bg-heading-brown text-paper-bg py-24 mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary-gold shrink-0 shadow-2xl">
              <img
                src="https://freepressnews.com.ng/wp-content/uploads/2026/03/ChatGPT_Image_Mar_15__2026__04_40_08_PM-removebg-preview.png"
                alt="Founder"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                A Note from Our Founder
              </h2>
              <p className="text-lg text-paper-bg/80 font-light leading-relaxed italic mb-8">
                "When I created House of Eden, my vision was to build more than
                just a spa. I wanted to create a haven where the stress of the
                city melts away the moment you walk through our doors. Every
                detail, from the scent in the air to the texture of our towels,
                has been chosen with your ultimate comfort in mind. Welcome to
                your personal paradise."
              </p>
              <div>
                <p className="font-serif font-bold text-primary-gold text-xl">
                  Dr. Amina Bello
                </p>
                <p className="text-sm text-paper-bg/60 uppercase tracking-wider mt-1">
                  Founder & Lead Aesthetician
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Values */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <span className="text-primary-gold font-medium tracking-wider uppercase text-sm mb-4 block">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-heading-brown mb-6">
              Core Values
            </h2>
            <p className="text-body-brown/80 max-w-2xl mx-auto text-lg leading-relaxed">
              The principles that guide every treatment, interaction, and
              decision at House Of Eden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Compassionate Care",
                desc: "We listen intently to your needs and tailor every experience to ensure your absolute comfort and satisfaction.",
              },
              {
                icon: Sparkles,
                title: "Uncompromising Excellence",
                desc: "From our premium organic products to our advanced techniques, we settle for nothing less than the absolute best.",
              },
              {
                icon: Shield,
                title: "Integrity & Trust",
                desc: "Transparent pricing, honest professional advice, and a steadfast commitment to your long-term wellness.",
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-light-gray/20 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-20 h-20 mx-auto bg-peach-accent/30 rounded-full flex items-center justify-center mb-8 text-primary-gold group-hover:scale-110 group-hover:bg-primary-gold group-hover:text-white transition-all duration-300">
                  <value.icon size={36} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-heading-brown mb-4">
                  {value.title}
                </h3>
                <p className="text-body-brown/70 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-32">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-sm border border-light-gray/20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading-brown mb-4">
                Our Journey
              </h2>
              <p className="text-body-brown/80">
                Milestones that shaped who we are today.
              </p>
            </div>

            <div className="relative border-l-2 border-primary-gold/30 ml-4 md:ml-8 space-y-12">
              {MILESTONES.map((milestone, idx) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-10 md:pl-16"
                >
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary-gold shadow-[0_0_0_4px_rgba(207,166,74,0.2)]" />
                  <span className="text-primary-gold font-bold text-xl md:text-2xl mb-2 block">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-heading-brown mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-body-brown/70 leading-relaxed max-w-2xl">
                    {milestone.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="text-center mb-16">
            <span className="text-primary-gold font-medium tracking-wider uppercase text-sm mb-4 block">
              The Hands That Heal
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-heading-brown mb-6">
              Meet Our Experts
            </h2>
            <p className="text-body-brown/80 max-w-2xl mx-auto text-lg leading-relaxed">
              Highly trained, certified professionals dedicated to providing you
              with an unforgettable experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-light-gray/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-heading-brown/90 via-heading-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white/90 text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {member.bio}
                    </p>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-serif font-bold text-heading-brown mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-gold font-medium text-sm uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
