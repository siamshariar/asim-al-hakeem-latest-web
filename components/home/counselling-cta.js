import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Mail, DollarSign, ArrowRight, Users, Clock } from "lucide-react";

export default function CounsellingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-gradient-to-br from-[#1a1f2e] to-[#2a3142] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 text-white"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
          <Calendar size={20} className="sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white text-xl sm:text-2xl font-bold">Counselling Sessions</h3>
          <p className="text-white/70 text-xs sm:text-sm">One-on-one guidance</p>
        </div>
      </div>

      <p className="text-white/90 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
        Need marriage counseling or personal guidance? Book a private one-to-one session 
        with Sheikh Assim Al Hakeem via Skype, FaceTime, or phone call.
      </p>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-white/70">Session Type</p>
            <p className="text-sm sm:text-base font-medium text-white/90">Private One-to-One Counseling</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-white/70">Duration</p>
            <p className="text-sm sm:text-base font-medium text-white/90">30 Minutes</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <DollarSign size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-white/70">Session Fee</p>
            <p className="text-sm sm:text-base font-medium text-white/90">$100 / Half Hour</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-white/70">Booking Email</p>
            <p className="text-xs sm:text-sm font-medium text-white/90 break-all">sheikhassim.bookings@gmail.com</p>
          </div>
        </div>
      </div>

      <Link href="/counselling">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 sm:py-4 bg-white text-[#1a1f2e] rounded-lg sm:rounded-xl text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2"
        >
          <span>Book a Session</span>
          <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
        </motion.button>
      </Link>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-white/60 text-xs sm:text-sm">
          Need financial assistance?{" "}
          <Link href="/counselling#donate" className="text-white underline hover:text-[#10b981] transition-colors">
            Learn about donations
          </Link>
        </p>
      </div>
    </motion.div>
  );
}