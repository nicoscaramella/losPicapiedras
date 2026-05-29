import Header from './components/Header';
import Hero from './components/Hero';
import Materials from './components/Materials';
import Calculator from './components/Calculator';
import ValueProp from './components/ValueProp';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink selection:bg-brand-accent/20 selection:text-brand-ink">
      <Header />
      <main>
        <Hero />
        <Materials />
        <Calculator />
        <ValueProp />
      </main>
      <Footer />
    </div>
  );
}
