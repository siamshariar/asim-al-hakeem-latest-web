import { useState } from 'react';
import { GetStaticProps } from 'next';
import { getAllPlaylists2, getAllQnaCategory, getHeaderLectures } from '../lib/fetch';
import Meta from '../components/meta';
import Header2 from '../components/header1';
import { motion } from 'framer-motion';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Clock, 
    Send,
    Facebook,
    Youtube,
    Instagram,
    Twitter,
    CheckCircle
} from 'lucide-react';

export default function Contact({ playlists, headerLectures, qna_categories }) {
    const [formData, setFormData] = useState({
        firstName: '',
        subject: '',
        email: '',
        phone: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        message: ''
    });

    const [errors, setErrors] = useState({});

    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone',
            details: ['+966 12 345 6789', '+966 12 345 6790'],
            color: 'bg-green-500'
        },
        {
            icon: Mail,
            title: 'Email',
            details: ['contact@assimalhakeem.com', 'info@assimalhakeem.com'],
            color: 'bg-blue-500'
        },
        {
            icon: MapPin,
            title: 'Location',
            details: ['Jeddah, Saudi Arabia'],
            color: 'bg-red-500'
        },
        {
            icon: Clock,
            title: 'Working Hours',
            details: ['Sat-Thu: 9:00 AM - 6:00 PM', 'Friday: Closed'],
            color: 'bg-purple-500'
        }
    ];

    const socialLinks = [
        { icon: Facebook, href: 'https://www.facebook.com/SheikhAssimAlhakeemTeam/', color: 'hover:bg-blue-600' },
        { icon: Youtube, href: 'https://www.youtube.com/user/assimalhakeem', color: 'hover:bg-red-600' },
        { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
        { icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
    ];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'Name is required';
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setFormStatus({ submitted: true, success: false, message: 'Sending...' });
        
        // Simulate API call
        setTimeout(() => {
            setFormStatus({ 
                submitted: true, 
                success: true, 
                message: 'Message sent successfully! We will get back to you soon.' 
            });
            setFormData({ firstName: '', subject: '', email: '', phone: '', message: '' });
        }, 1500);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <>
            <Meta 
                title="Contact Sheikh Assim Al Hakeem" 
                description="Get in touch with Sheikh Assim Al Hakeem for inquiries, questions, or counseling sessions." 
            />
            <Header2 playlists={playlists} headerLectures={headerLectures} qna_categories={qna_categories} />
            
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-secondary rounded-full blur-3xl"></div>
                </div>
                <div className="container max-w-[1260px] mx-auto relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-white"
                    >
                        <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4">Get In Touch</h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto">
                            Have questions or need guidance? We're here to help. Reach out to us anytime.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 lg:py-20">
                <div className="container max-w-[1260px] mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all"
                            >
                                <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                    <info.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-primary mb-3">{info.title}</h3>
                                {info.details.map((detail, i) => (
                                    <p key={i} className="text-gray-600">{detail}</p>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form and Map */}
            <section className="pb-16 lg:pb-24">
                <div className="container max-w-[1260px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Form */}
                        <motion.div 
                            {...fadeInUp}
                            className="bg-white rounded-3xl shadow-xl p-8 lg:p-10"
                        >
                            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">Send Us a Message</h2>
                            
                            {formStatus.success && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700"
                                >
                                    <CheckCircle size={20} />
                                    <span>{formStatus.message}</span>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                                errors.firstName 
                                                    ? 'border-red-300 focus:ring-red-200' 
                                                    : 'border-gray-200 focus:ring-accent/20 focus:border-accent'
                                            }`}
                                            placeholder="Your name"
                                        />
                                        {errors.firstName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                                errors.subject 
                                                    ? 'border-red-300 focus:ring-red-200' 
                                                    : 'border-gray-200 focus:ring-accent/20 focus:border-accent'
                                            }`}
                                            placeholder="Message subject"
                                        />
                                        {errors.subject && (
                                            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                                errors.email 
                                                    ? 'border-red-300 focus:ring-red-200' 
                                                    : 'border-gray-200 focus:ring-accent/20 focus:border-accent'
                                            }`}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number (Optional)
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                            placeholder="+966 XX XXX XXXX"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
                                            errors.message 
                                                ? 'border-red-300 focus:ring-red-200' 
                                                : 'border-gray-200 focus:ring-accent/20 focus:border-accent'
                                        }`}
                                        placeholder="Your message..."
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                    )}
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={formStatus.submitted && !formStatus.success}
                                    className="w-full py-4 bg-gradient-to-r from-accent to-accent-secondary text-white rounded-xl font-medium shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={18} />
                                    <span>{formStatus.submitted && !formStatus.success ? 'Sending...' : 'Send Message'}</span>
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Map and Social */}
                        <motion.div 
                            {...fadeInUp}
                            className="space-y-6"
                        >
                            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
                                <h3 className="text-xl font-semibold text-primary mb-6">Connect With Us</h3>
                                <p className="text-gray-600 mb-6">
                                    Follow us on social media for the latest updates, lectures, and Islamic content.
                                </p>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, idx) => (
                                        <motion.a
                                            key={idx}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`p-4 bg-gray-100 rounded-xl text-gray-600 transition-all ${social.color} hover:text-white`}
                                        >
                                            <social.icon size={22} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-accent to-accent-secondary rounded-3xl shadow-xl p-8 lg:p-10 text-white">
                                <h3 className="text-white text-xl font-semibold mb-4">Need Urgent Help?</h3>
                                <p className="text-white/90 mb-6">
                                    For counseling sessions or urgent inquiries, you can reach out directly:
                                </p>
                                <div className="space-y-3">
                                    <a 
                                        href="mailto:sheikhassim.bookings@gmail.com"
                                        className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                                    >
                                        <Mail size={18} />
                                        <span>sheikhassim.bookings@gmail.com</span>
                                    </a>
                                    <a 
                                        href="https://wa.me/966123456789"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                                    >
                                        <Phone size={18} />
                                        <span>WhatsApp: +966 12 345 6789</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}

export const getStaticProps = async () => {
    const playlists = await getAllPlaylists2();
    const headerLectures = await getHeaderLectures();
    const qna_categories = await getAllQnaCategory();

    return {
        props: {
            playlists: playlists.playlists,
            headerLectures,
            qna_categories,
        },
    };
};