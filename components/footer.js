import Link from "next/link";
import Image from "next/image";
import { 
    Facebook, 
    Youtube, 
    Instagram, 
    Twitter, 
    Mail, 
    Phone, 
    MapPin,
    ChevronRight,
    Send,
    Heart
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: [
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Lectures", href: "/lectures/UUWsdcrre0WbCWML_PnuzoAg" },
            { name: "Books", href: "/books" },
            { name: "Articles", href: "/articles" },
        ],
        resources: [
            { name: "Ask a Question", href: "/ask-question" },
            { name: "Counselling", href: "/counselling" },
            { name: "Contact Us", href: "/contact" },
            { name: "Q&A Categories", href: "/qna" },
            { name: "Privacy Policy", href: "/privacy" },
        ],
        social: [
            { icon: Facebook, href: "https://www.facebook.com/SheikhAssimAlhakeemTeam/", label: "Facebook" },
            { icon: Youtube, href: "https://www.youtube.com/user/assimalhakeem", label: "YouTube" },
            { icon: Instagram, href: "#", label: "Instagram" },
            { icon: Twitter, href: "#", label: "Twitter" },
        ],
        contact: [
            { icon: Phone, text: "+966 12 345 6789", href: "tel:+966123456789" },
            { icon: Mail, text: "contact@assimalhakeem.com", href: "mailto:contact@assimalhakeem.com" },
            { icon: MapPin, text: "Jeddah, Saudi Arabia", href: "#" },
        ]
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    return (
        <footer className="bg-primary text-white">
            {/* Main Footer */}
            <div className="pt-16 pb-12">
                <div className="container max-w-[1260px] mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* About Column */}
                        <motion.div {...fadeInUp}>
                            <Link href="/" className="inline-block mb-6">
                                <Image 
                                    src="/img/logo-white.png" 
                                    alt="Assim Al Hakeem" 
                                    width={180}
                                    height={50}
                                    className="h-auto"
                                />
                            </Link>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Sheikh Assim Al Hakeem is dedicated to spreading authentic Islamic knowledge 
                                and providing guidance to Muslims worldwide through lectures, books, and Q&A sessions.
                            </p>
                            <div className="flex gap-3">
                                {footerLinks.social.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-3 bg-white/10 rounded-xl hover:bg-accent transition-all duration-300"
                                        aria-label={social.label}
                                    >
                                        <social.icon size={18} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                            <h3 className="text-xl font-semibold mb-6 relative inline-block">
                                Quick Links
                                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent"></span>
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.quickLinks.map((link, idx) => (
                                    <motion.li 
                                        key={idx}
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link 
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                                        >
                                            <ChevronRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all" />
                                            <span>{link.name}</span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Resources */}
                        <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                            <h3 className="text-xl font-semibold mb-6 relative inline-block">
                                Resources
                                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent"></span>
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.resources.map((link, idx) => (
                                    <motion.li 
                                        key={idx}
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link 
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                                        >
                                            <ChevronRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all" />
                                            <span>{link.name}</span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Newsletter & Contact */}
                        <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                            <h3 className="text-xl font-semibold mb-6 relative inline-block">
                                Stay Connected
                                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent"></span>
                            </h3>
                            
                            {/* Newsletter Form */}
                            <form onSubmit={handleSubscribe} className="mb-6">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent rounded-lg hover:bg-accent-secondary transition-colors"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                                {subscribed && (
                                    <motion.p 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-green-400 text-sm mt-2"
                                    >
                                        Subscribed successfully!
                                    </motion.p>
                                )}
                            </form>

                            {/* Contact Info */}
                            <ul className="space-y-3">
                                {footerLinks.contact.map((item, idx) => (
                                    <li key={idx}>
                                        <a 
                                            href={item.href}
                                            className="text-gray-300 hover:text-white transition-colors flex items-center gap-3"
                                        >
                                            <item.icon size={16} className="text-accent" />
                                            <span className="text-sm">{item.text}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 py-6">
                <div className="container max-w-[1260px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>
                            © {currentYear} Sheikh Assim Al Hakeem. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2">
                            <span>Made with</span>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <Heart size={16} className="text-red-500 fill-red-500" />
                            </motion.div>
                            <span>for the Ummah</span>
                        </div>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}