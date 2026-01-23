import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaSuitcase,
} from "react-icons/fa";
import { BlurFade } from "../ui/blur-fade";
import { FaMapLocation } from "react-icons/fa6";

const ContactSection = () => {
  return (
    <section className="bg-transparent py-16 sm:py-20" id="contact">
      <BlurFade inView delay={0.5}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mt-12 mb-12">
            <h2 className="text-5xl font-extrabold text-primary sm:text-6xl">
              Contact Us
            </h2>
            <p className="mt-4 text-lg leading-6 text-white">
              Please don&apos;t hesitate to contact us!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <p className="text-purple-100 mb-8">
                For any further questions and informations, you can contact our
                contact person below here.
              </p>
              <div className="space-y-6">
                <div className="flex  items-start space-x-4">
                  <div className="flex-shrink-0 bg-transparent p-3 rounded-full">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold ">Our Address</h4>
                    <p className="text-purple-100">
                      Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan Coblong, Kota
                      Bandung, Jawa Barat 40132
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-transparent p-3 rounded-full">
                    <FaSuitcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">
                      Business Inquiries
                    </h4>
                    <p className="text-purple-100 gap-2 flex flex-col text-sm max-sm:text-xs mt-1">
                      <span>+62 85724415352 (Roland)</span>
                      <span>mfest2026@gmail.com</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-transparent p-3 rounded-full">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Contact Support</h4>
                    <p className="text-purple-100 gap-2 flex flex-col text-sm max-sm:text-xs mt-1">
                      <span>+62 85775132602 (Handaru)</span>
                      <span>rahmathandaru.p@gmail.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8 md:px-0">
              <h3 className="text-3xl font-bold text-primary mb-2 flex gap-4 items-center">
                <FaMapLocation /> <span>Our Location on Maps</span>
              </h3>
              <p className="text-lg text-white mb-6">
                Check our location on Google Maps to help you find our location.
              </p>
              <div className="rounded-lg shadow-lg overflow-hidden h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0020064428986!2d107.60761627474339!3d-6.890361693108697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e65767c9b183%3A0x2478e3dcdce37961!2sInstitut%20Teknologi%20Bandung!5e0!3m2!1sen!2sid!4v1762297011770!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
};

export default ContactSection;
