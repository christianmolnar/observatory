import { observatoryConfig } from '@/config/observatory';
import Navigation from '@/components/Navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Maple Valley Observatory',
  description: 'Learn about Christian Molnar and his journey in astrophotography and astronomy from Maple Valley, Washington.',
};

export default function AboutPage() {
  const { owner, location, mission, primaryEquipment, equipmentDescription } = observatoryConfig;

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black text-white pt-32">
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light mb-6">
              About <span className="text-yellow-400">Maple Valley Observatory</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {mission}
            </p>
          </div>

          {/* Observatory Owner Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-light mb-8 text-center">The Astronomer</h2>
            <div className="bg-gray-900/50 rounded-lg p-8">
              <h3 className="text-2xl font-medium mb-4 text-yellow-400">{owner.name}</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Based in {location.city}, {location.state}, I have been passionate about astronomy and astrophotography 
                since childhood. What started as a fascination with the night sky has evolved into a dedicated pursuit 
                of capturing the beauty of celestial objects and preserving them for others to enjoy.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                My approach combines traditional astronomical knowledge with modern smart telescope technology, 
                making astrophotography more accessible while maintaining the wonder and precision that drew me 
                to this field in the first place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={owner.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Facebook Profile
                </a>
                <a 
                  href={owner.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <h2 className="text-3xl font-light mb-8">Get In Touch</h2>
            <p className="text-gray-300 mb-6">
              Interested in astrophotography, have questions about equipment, or want to discuss the night sky?
            </p>
            <a 
              href="/contact"
              className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg hover:bg-yellow-300 transition-colors font-medium"
            >
              Contact Me
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
