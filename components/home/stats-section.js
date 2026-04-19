import { motion } from "framer-motion";
import { Users, Video, BookOpen, MessageCircle, Award } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "2M+",
      label: "Global Students",
      color: "bg-blue-500",
    },
    {
      icon: Video,
      value: "5K+",
      label: "Video Lectures",
      color: "bg-red-500",
    },
    {
      icon: BookOpen,
      value: "20+",
      label: "Published Books",
      color: "bg-green-500",
    },
    {
      icon: MessageCircle,
      value: "50K+",
      label: "Questions Answered",
      color: "bg-purple-500",
    },
    {
      icon: Award,
      value: "35+",
      label: "Years Experience",
      color: "bg-orange-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container max-w-[1260px] mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}