
const AchievementsSection = () => {
  const achievements = [
    {
      name: "Awais Gill",
      role: "Community Leader",
      image: "/placeholder.svg",
      description: "Leading community outreach programs for over 5 years"
    },
    {
      name: "Afshad Sidhwa",
      role: "Educational Director",
      image: "/placeholder.svg",
      description: "Expert in curriculum development and educational leadership"
    },
    {
      name: "Asadullah Nizami",
      role: "Youth Coordinator",
      image: "/placeholder.svg",
      description: "Passionate about youth development and mentorship"
    },
    {
      name: "Misha Jessani",
      role: "Program Manager",
      image: "/placeholder.svg",
      description: "Specialized in event management and community engagement"
    }
  ];

  return (
    <section id="achievements" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-religious-800 mb-12">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((person, index) => (
            <div key={index} className="text-center animate-fade-in">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-religious-200 to-religious-300 flex items-center justify-center overflow-hidden">
                <div className="w-24 h-24 bg-religious-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{person.name.charAt(0)}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-religious-800 mb-1">{person.name}</h3>
              <p className="text-religious-600 font-medium mb-2">{person.role}</p>
              <p className="text-gray-600 text-sm">{person.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
