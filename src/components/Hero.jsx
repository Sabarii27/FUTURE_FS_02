import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ background: "linear-gradient(135deg, #f9fbe7 60%, #fffde7 100%)", position: 'relative', overflow: 'hidden' }}>
      {/* Decorative SVG organic shape */}
      <svg width="100%" height="180" viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <path d="M0,80 Q360,180 720,80 T1440,80 V180 H0 Z" fill="#c8e6c9" fillOpacity="0.25" />
      </svg>
      {/* Hero Section */}
      <div
        className="text-center py-5 position-relative"
        style={{
          background: "linear-gradient(90deg, #C8E6C9 60%, #FFFDE7 100%)",
          color: "#2E7D32",
          zIndex: 1
        }}
      >
        <h1 style={{ fontSize: "3.2rem", fontWeight: "bold", color: "#1B5E20", textShadow: '0 2px 12px #e8f5e9' }}>
          Fresh <span style={{ color: '#2e7d32', background: 'rgba(200,230,201,0.65)', borderRadius: '0.4em', padding: '0.08em 0.18em', boxShadow: '0 2px 8px #c8e6c9', display: 'inline-block', marginLeft: 0, marginRight: 0 }}>Organic</span> Groceries
        </h1>
        <div className="d-flex justify-content-center align-items-center gap-2 mb-2 mt-3">
          <span className="badge bg-success fs-6" style={{ background: '#a5d6a7', color: '#1b5e20', fontWeight: 600, letterSpacing: 1 }}>100% Natural</span>
          <span className="badge bg-warning text-dark fs-6" style={{ background: '#fffde7', color: '#795548', fontWeight: 600 }}>Farm Fresh</span>
        </div>
        <p style={{ fontSize: "1.25rem", color: "#33691E", marginBottom: 32 }}>
          Healthy food for a healthy lifestyle <span role="img" aria-label="leaf">🌱</span>
        </p>
        <Button
          as={Link}
          to="/products"
          className="hero-shop-btn animated-pulse"
          style={{ fontSize: '1.3rem', padding: '12px 36px', borderRadius: '2rem', boxShadow: '0 4px 18px #c8e6c9' }}
        >
          <i className="bi bi-bag-check-fill me-2"></i>Shop Now
        </Button>
      </div>

      {/* Featured Categories */}
      <Container className="py-5">
        <h2
          className="text-center mb-4"
          style={{ color: "#388E3C", fontWeight: "bold" }}
        >
          Explore Our Categories
        </h2>
        <Row>
          {[
            { title: "Fruits 🍎", img: "/images/fruits.jpg", cat: "Fruits" },
            { title: "Vegetables 🥦", img: "/images/vegetabless.png", cat: "Vegetables" },
            { title: "Grains 🌾", img: "/images/grains.jpg", cat: "Grains & Cereals" },
            { title: "Spices 🌶️", img: "/images/spices.jpg", cat: "Spices" },
          ].map((item, index) => (
            <Col key={index} md={3} sm={6} className="mb-4">
              <Card
                className="shadow-sm border-0 hero-category-card category-hover"
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  background: "#fffde7",
                  minHeight: 'unset',
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  paddingBottom: 0,
                  marginBottom: 0,
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '1.5rem 1.5rem 0 0', boxShadow: '0 4px 18px #c8e6c9', background: '#f9fbe7' }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '240px',
                      objectFit: 'cover',
                      borderRadius: '1.5rem 1.5rem 0 0',
                      transition: 'transform 0.35s cubic-bezier(.23,1.02,.32,1), box-shadow 0.2s',
                      boxShadow: '0 4px 18px #e8f5e9',
                    }}
                    className="category-img-zoom"
                  />
                  {/* Optional overlay for modern look */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(180deg,rgba(255,255,255,0.05) 60%,rgba(46,125,50,0.08) 100%)',
                    pointerEvents: 'none',
                  }}></div>
                </div>
                <Card.Body className="text-center p-1" style={{paddingBottom: 0, paddingTop: '8px', marginBottom: 0, flex: 'none'}}> 
                  <Card.Title style={{ color: "#2E7D32", fontWeight: "600", marginBottom: '1rem' }}>
                    {item.title}
                  </Card.Title>
                  <Button
                    as={Link}
                    to={"/products" + (item.cat ? `?cat=${encodeURIComponent(item.cat)}` : "")}
                    variant="success"
                    style={{
                      backgroundColor: "#A5D6A7",
                      color: "#1B5E20",
                      border: "none",
                      borderRadius: "20px",
                      padding: "6px 16px",
                      fontWeight: "bold",
                      marginBottom: '1.5rem',
                      marginTop: 0,
                      width: '100%'
                    }}
                    onClick={() => { setTimeout(() => window.scrollTo({top:0, behavior:'smooth'}), 0); }}
                  >
                    View
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Trust Badges / Testimonials */}
      <section className="py-4">
        <Container>
          <Row className="g-4 justify-content-center align-items-center">
            <Col md={4} className="text-center">
              <div className="p-3 rounded-4 shadow-sm bg-white border" style={{ fontWeight: 600, color: '#2e7d32', fontSize: '1.1rem' }}>
                <i className="bi bi-patch-check-fill text-success me-2" style={{ fontSize: '1.5rem' }}></i>
                Trusted by 10,000+ customers
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="p-3 rounded-4 shadow-sm bg-white border" style={{ fontWeight: 600, color: '#ff9800', fontSize: '1.1rem' }}>
                <i className="bi bi-star-fill me-2" style={{ color: '#ffd600', fontSize: '1.5rem' }}></i>
                4.9/5 Customer Rating
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div className="p-3 rounded-4 shadow-sm bg-white border" style={{ fontWeight: 600, color: '#43a047', fontSize: '1.1rem' }}>
                <i className="bi bi-truck me-2" style={{ color: '#43a047', fontSize: '1.5rem' }}></i>
                Fast & Free Delivery
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call To Action */}
      <div
        className="text-center py-5"
        style={{
          background: "linear-gradient(90deg, #fffde7 60%, #c8e6c9 100%)",
          color: "#2E7D32",
          borderTop: '4px solid #c8e6c9',
          borderBottom: '4px solid #fffde7',
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: '2.2rem', textShadow: '0 2px 12px #e8f5e9' }}>Eat Healthy, Live Better <span role="img" aria-label="earth">🌍</span></h2>
        <p style={{ color: "#33691E", fontSize: '1.15rem' }}>
          Get farm-fresh products delivered at your doorstep <span role="img" aria-label="truck">🚚</span>
        </p>
        <Button
          as={Link}
          to="/products"
          variant="success"
          className="hero-shop-btn animated-pulse"
          style={{
            backgroundColor: "#81C784",
            border: "none",
            fontWeight: "bold",
            padding: "12px 32px",
            borderRadius: "30px",
            fontSize: '1.2rem',
            boxShadow: '0 4px 18px #c8e6c9'
          }}
        >
          <i className="bi bi-bag-plus-fill me-2"></i>Start Shopping
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
