
import { useEvents } from "@/hooks/useEvents";
import Header from "@/components/index/Header";
import NavigationMenu from "@/components/index/NavigationMenu";
import WhatsNewSection from "@/components/index/WhatsNewSection";
import UpcomingEventsSection from "@/components/index/UpcomingEventsSection";
import OpportunitiesSection from "@/components/index/OpportunitiesSection";
import AchievementsSection from "@/components/index/AchievementsSection";
import Footer from "@/components/index/Footer";

const Index = () => {
  const { events, loading } = useEvents();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-religious-50">
      <Header />
      <NavigationMenu scrollToSection={scrollToSection} />
      <WhatsNewSection />
      <UpcomingEventsSection events={events} loading={loading} />
      <OpportunitiesSection />
      <AchievementsSection />
      <Footer scrollToTop={scrollToTop} />
    </div>
  );
};

export default Index;
