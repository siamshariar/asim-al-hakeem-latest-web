import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubscribed(true);
    setEmail("");
    setLoading(false);
    
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-accent to-accent-secondary">
      <div className="container max-w-[1000px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Mail size={32} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">Stay Updated with Islamic Knowledge</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to receive notifications about new lectures, books, articles, 
            and answers to frequently asked questions.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto"
            >
              <CheckCircle size={40} className="text-white mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Thank You for Subscribing!</h3>
              <p className="text-white/80">
                You'll now receive updates about our latest content and events.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="px-6 py-4 bg-white text-accent rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Subscribe</span>
                    </>
                  )}
                </motion.button>
              </div>
              <p className="text-white/60 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}