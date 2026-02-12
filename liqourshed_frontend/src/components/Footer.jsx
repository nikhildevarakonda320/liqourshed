import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="w-full">
      {/* Newsletter Section */}
      <div className="bg-[#E8E6E3] py-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6">Subscribe to our newsletter!</h2>
          
          <div className="flex flex-col sm:flex-row gap-0 max-w-2xl mx-auto mb-4">
            <input 
              type="email" 
              placeholder="Your e-mail address" 
              className="flex-grow px-4 py-3 text-slate-700 bg-white border-none focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <button className="bg-[#2F5E24] hover:bg-[#244a1c] text-white font-bold px-8 py-3 transition duration-300">
              SUBSCRIBE
            </button>
          </div>
          
          <p className="text-slate-500 text-sm mt-4">
            Subscribe to our email newsletter to receive early discount offers, latest news, sales and promo information!
          </p>
        </div>
      </div>

      {/* Main Footer Info */}
      <footer className="bg-[#221F1D] text-white pt-16 pb-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Column 1: Main Store Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 uppercase tracking-wider">LiquorShed & Wine</h3>
              <div className="space-y-4 text-gray-300 text-sm">
                <p><span className="block text-white mb-1">Toll-Free:</span> (877) 779-4631</p>
                <p><span className="block text-white mb-1">Local:</span> (518) 694-8503</p>
                
                <div className="mt-4">
                  <p className="text-white font-semibold">Monday - Saturday:</p>
                  <p>9am - 9pm</p>
                </div>
                
                <div className="mt-2">
                  <p className="text-white font-semibold">Sunday:</p>
                  <p>10am - 7pm</p>
                </div>
                
                <div className="flex flex-col gap-2 mt-4 underline decoration-gray-500 underline-offset-4">
                  <a href="#" className="hover:text-white">Regular/Holiday Hours</a>
                  <a href="#" className="hover:text-white">Contact Us</a>
                </div>

                <address className="not-italic mt-4 text-gray-400">
                  1440 Central Ave, Albany, NY 12205
                </address>

                <div className="flex gap-4 mt-6">
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-[#221F1D] transition"><FaFacebookF /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-[#221F1D] transition"><FaTwitter /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-[#221F1D] transition"><FaInstagram /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-[#221F1D] transition"><FaPinterestP /></a>
                </div>
              </div>
            </div>

            {/* Column 2: Secondary Store Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 uppercase tracking-wider">LiquorShed Too</h3>
              <div className="space-y-4 text-gray-300 text-sm">
                <p><span className="block text-white mb-1">Local:</span> (518) 226-8700</p>
                
                <div className="mt-4">
                  <p className="text-white font-semibold">Monday:</p>
                  <p>closed</p>
                </div>
                
                <div className="mt-2">
                  <p className="text-white font-semibold">Tuesday - Friday:</p>
                  <p>11am - 7pm</p>
                </div>

                <div className="mt-2">
                  <p className="text-white font-semibold">Saturday:</p>
                  <p>9am - 5pm</p>
                </div>

                <div className="mt-2">
                  <p className="text-white font-semibold">Sunday:</p>
                  <p>closed</p>
                </div>
                
                <div className="mt-4 underline decoration-gray-500 underline-offset-4">
                  <a href="#" className="hover:text-white">Contact Us</a>
                </div>

                <address className="not-italic mt-4 text-gray-400">
                  48 A Railroad Ave, Albany, NY 12205
                </address>
                
                <div className="flex gap-4 mt-6">
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-white hover:text-[#221F1D] transition"><FaInstagram /></a>
                </div>
              </div>
            </div>

            {/* Column 3: About Us */}
            <div>
              <h3 className="text-xl font-bold mb-6 uppercase tracking-wider">About Us</h3>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">Wine</a></li>
                <li><a href="#" className="hover:text-white transition">Liquor</a></li>
                <li><a href="#" className="hover:text-white transition">Corporate Gifts</a></li>
                <li><a href="#" className="hover:text-white transition">The LiquorShed Blog</a></li>
                <li><a href="#" className="hover:text-white transition">In-Store Events</a></li>
              </ul>
            </div>

            {/* Column 4: Account & Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 uppercase tracking-wider">Account & Info</h3>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-white transition">Your Account</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition">Accessibility</a></li>
              </ul>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
