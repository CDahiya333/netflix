import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 py-12 px-8 md:px-16 lg:px-24 text-white/55 text-left mt-10 footer-text">
      <div className="flex flex-col flex-start">
        {/* Social Media Icons */}
        <div className="flex justify-start gap-6 align-start mb-10 text-white">
          <Link
            href="https://www.facebook.com/netflix"
            aria-label="Facebook"
            className="hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </Link>
          <Link
            href="https://www.instagram.com/netflix"
            aria-label="Instagram"
            className="hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.058-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.054-.058 1.37-.058 4.04 0 2.672.01 2.988.058 4.042.044.975.207 1.504.344 1.856.182.467.399.8.748 1.15.35.35.684.567 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.672 0 2.988-.01 4.042-.058.975-.044 1.504-.207 1.856-.344.466-.18.8-.398 1.15-.748.35-.35.567-.683.748-1.15.137-.352.3-.881.344-1.856.048-1.054.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.044-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.352-.137-.881-.3-1.856-.344-1.054-.048-1.37-.058-4.042-.058z" />
              <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.25a3.25 3.25 0 110-6.5 3.25 3.25 0 010 6.5zm5.5-9.5a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
          </Link>
          <Link
            href="https://twitter.com/netflix"
            aria-label="Twitter"
            className="hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </Link>
          <Link
            href="https://www.youtube.com/netflix"
            aria-label="YouTube"
            className="hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-1 gap-x-12 px-4 align-start footer-text">
          <div>
            <Link
              href="/audio-description"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Audio Description
            </Link>
            <Link
              href="/investor-relations"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Investor Relations
            </Link>
            <Link
              href="/legal-notices"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Legal Notices
            </Link>
          </div>

          <div>
            <Link
              href="/help"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Help Centre
            </Link>
            <Link
              href="/jobs"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Jobs
            </Link>
            <Link
              href="/cookie-preferences"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Cookie Preferences
            </Link>
          </div>

          <div>
            <Link
              href="/gift-cards"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Gift Cards
            </Link>
            <Link
              href="/terms"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/corporate-info"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Corporate Information
            </Link>
          </div>

          <div>
            <Link
              href="/media"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Media Centre
            </Link>
            <Link
              href="/privacy"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="block mb-4 hover:text-gray-300 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="px-4 text-left">
          {/* Service Code Button */}
          <button className="border border-gray-400 px-4 py-1 mb-6 hover:text-gray-300 transition-colors inline-block w-fit footer-text">
            Service Code
          </button>

          {/* Copyright */}
          <p className="text-left footer-text">© 1997-2025 Netflix, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
