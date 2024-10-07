import "./App.css";
import Header from "./components/Header.tsx";
import HighlightsSection from "./components/HighlightsSection.tsx";
import Section from "./components/Section.tsx";
import SamplesSection from "./components/SamplesSection.tsx";
function App() {
  return (
    <>
      <Header />

      {/* core concpts */}
      <Section title='Core Concepts'>
        <HighlightsSection />
      </Section>

      {/* samples */}
      <Section title='Samples'>
        <SamplesSection />
      </Section>
    </>
  );
}

export default App;
