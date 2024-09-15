import { useState } from 'react';
import TeamMember from './TeamMember';

const teamMembers = [
  {
    name: "Dr. Leslie Taylor",
    specialty: "Pediatrician",
    description: "Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac penatibus et.",
    imageSrc: "/path_to_image1.jpg",
  },
  {
    name: "Dr. Zachary Brown",
    specialty: "Cardiologist",
    description: "Dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum habitant fames ac penatibus et.",
    imageSrc: "/path_to_image2.jpg",
  },
];

const TeamSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
      <div className="flex justify-center overflow-hidden">
        <div className="flex transition-transform duration-300" 
             style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {teamMembers.map((member, index) => (
            <div className="min-w-full" key={index}>
              <TeamMember
                name={member.name}
                specialty={member.specialty}
                description={member.description}
                imageSrc={member.imageSrc}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 mx-2 rounded-full transition-all duration-300 ${index === activeSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Slide ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
