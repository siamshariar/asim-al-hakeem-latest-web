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
      className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-8 lg:p-10 text-white"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
          <Calendar size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-white text-2xl font-bold">Counselling Sessions</h3>
          <p className="text-white/70 text-sm">One-on-one guidance</p>
        </div>
      </div>

      <p className="text-white/90 mb-6 leading-relaxed">
        Need marriage counseling or personal guidance? Book a private one-to-one session 
        with Sheikh Assim Al Hakeem via Skype, FaceTime, or phone call.
      </p>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <Users size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-white/70">Session Type</p>
            <p className="font-medium text-white/70">Private One-to-One Counseling</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <Clock size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-white/70">Duration</p>
            <p className="font-medium text-white/70">30 Minutes</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <DollarSign size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-white/70">Session Fee</p>
            <p className="font-medium text-white/70">$100 / Half Hour</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <Mail size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-white/70">Booking Email</p>
            <p className="font-medium text-sm break-all text-white/70">sheikhassim.bookings@gmail.com</p>
          </div>
        </div>
      </div>

      <Link href="/counselling">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-white text-primary rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>Book a Session</span>
          <ArrowRight size={18} />
        </motion.button>
      </Link>

      <div className="mt-6 text-center">
        <p className="text-white/60 text-sm">
          Need financial assistance?{" "}
          <Link href="/counselling#donate" className="text-white underline hover:text-accent-light">
            Learn about donations
          </Link>
        </p>
      </div>
    </motion.div>
  );
}