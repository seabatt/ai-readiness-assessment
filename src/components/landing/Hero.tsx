import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
          Is Your IT Team Ready for an AI Worker?
        </h1>
        <p className="text-xl text-text-secondary mb-12 max-w-3xl mx-auto">
          AI Workers learn from your tickets, adapt to your processes, and improve over time. 
          Find out if your IT stack can support a digital teammate that gets smarter with every request.
        </p>
        <Button onClick={() => {
          document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          Assess My IT Readiness (3 min)
        </Button>
      </div>
    </section>
  );
}
