import Hero from '../components/Hero'

export default function Home(){
  return (
  <main style={{ flex: 1 }}>
      <Hero/>
      <section className="py-5">
        <div className="container">
          <h2 className="h4 mb-3">Why Organic?</h2>
          <div className="row g-4">
            <div className="col-md-4"><div className="p-4 rounded-4 border h-100 home-info-card">No chemicals, no compromise.</div></div>
            <div className="col-md-4"><div className="p-4 rounded-4 border h-100 home-info-card">Sustainably sourced from trusted farms.</div></div>
            <div className="col-md-4"><div className="p-4 rounded-4 border h-100 home-info-card">Freshness you can taste.</div></div>
          </div>
        </div>
      </section>
    </main>
  )
}
