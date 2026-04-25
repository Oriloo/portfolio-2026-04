import { projects, stackData, experience, writing, github, contact } from '../data'
import Masthead from '../components/layout/Masthead'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import PlaygroundSection from '../components/sections/PlaygroundSection'
import WorkSection from '../components/sections/WorkSection'
import StackSection from '../components/sections/StackSection'
import AboutSection from '../components/sections/AboutSection'
import ContactSection from '../components/sections/ContactSection'

export default function HomePage() {
    return (
        <div className="bg-bg text-ink font-sans">
            <Masthead/>
            <main>
                <HeroSection/>
                <PlaygroundSection/>
                <WorkSection projects={projects}/>
                <StackSection data={stackData}/>
                <AboutSection experience={experience} writing={writing} github={github}/>
                <ContactSection data={contact}/>
            </main>
            <Footer/>
        </div>
    )
}
