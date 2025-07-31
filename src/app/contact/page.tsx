import { observatoryConfig } from '@/config/observatory';
import Navigation from '@/components/Navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Maple Valley Observatory',
  description: 'Get in touch with Christian Molnar about astrophotography, equipment questions, or collaboration opportunities.',
};

export default function ContactPage() {
  const { owner, location } = observatoryConfig;

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black text-white pt-32">
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-light mb-6">
              <span className="text-yellow-400">Contact</span> Me
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have questions about astrophotography, equipment recommendations, or want to discuss the night sky? 
              I&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-gray-900/50 rounded-lg p-8">
              <h2 className="text-2xl font-light mb-6 text-yellow-400">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
                  >
                    <option value="">Select a topic</option>
                    <option value="equipment">Equipment Questions</option>
                    <option value="astrophotography">Astrophotography Tips</option>
                    <option value="collaboration">Collaboration Opportunity</option>
                    <option value="prints">Print Sales Inquiry</option>
                    <option value="general">General Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400 resize-vertical"
                    placeholder="Tell me about your question or how I can help..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors font-medium text-lg"
                >
                  Send Message
                </button>
              </form>
              
              <p className="text-sm text-gray-400 mt-4">
                * Required fields. I typically respond within 24-48 hours.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Social Media */}
              <div className="bg-gray-900/50 rounded-lg p-8">
                <h2 className="text-2xl font-light mb-6 text-yellow-400">Connect Online</h2>
                <div className="space-y-4">
                  <a 
                    href={owner.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span className="mr-2">📘</span>
                    Facebook Profile
                  </a>
                  <a 
                    href={owner.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span className="mr-2">💼</span>
                    LinkedIn Profile
                  </a>
                </div>
              </div>

              {/* Inquiry Types */}
              <div className="bg-gray-900/50 rounded-lg p-8">
                <h2 className="text-2xl font-light mb-6 text-yellow-400">What I Can Help With</h2>
                <ul className="space-y-3 text-gray-300">
                  <li>• Equipment recommendations and reviews</li>
                  <li>• Astrophotography techniques and tips</li>
                  <li>• Processing workflow guidance</li>
                  <li>• Location scouting advice</li>
                  <li>• Smart telescope setup and operation</li>
                  <li>• Print sales and licensing inquiries</li>
                  <li>• Collaboration opportunities</li>
                  <li>• General astronomy questions</li>
                </ul>
              </div>

              {/* Response Time */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-3 text-yellow-400">Response Time</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  I aim to respond to all inquiries within 24-48 hours. For urgent equipment questions 
                  or time-sensitive opportunities, please mention this in your subject line.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
