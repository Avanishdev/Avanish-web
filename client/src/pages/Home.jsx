import React from "react";
const Home = () => {
  return (
    <>
      <main>
        {/* Home Section */}
        <section className="section-home">
          <div className="container grid grid-two-cols">
            <div className="home-content">
              <p>The best IT Solutions here.</p>
              <h1>Welcome to Avanish Developer</h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT Solutions? Look no further! As Avanish
                Developer, i specialize in providing innovative IT services and
                solutions tailored to meet your unique needs.
              </p>
              <div className="btn btn-group">
                <a href="/">
                  <button className="btn">Connect Now</button>
                </a>
                <a href="/">
                  <button className="btn secondary-btn">Learn More</button>
                </a>
              </div>
            </div>
            {/* home-images */}
            <div className="home-image">
              <img
                src="\assets\registeration-image.png"
                alt="avanishdeveloper.com"
                width="400"
                height="400"
              />
            </div>
          </div>
        </section>
      </main>
      {/* Analytics Section */}
      <section className="section-analytics">
        <div className="container grid grid-four-cols">
          <div className="div1">
            <h2>50+</h2>
            <p>registered companies</p>
          </div>
          <div className="div1">
            <h2>100,00+</h2>
            <p>Happy Clients</p>
          </div>
          <div className="div1">
            <h2>500+</h2>
            <p>Well known Developers</p>
          </div>
          <div className="div1">
            <h2>24/7</h2>
            <p>service</p>
          </div>
        </div>
      </section>
      {/* 3 rd section */}
      <section className="section-home">
        <div className="container grid grid-two-cols">
          {/* 3rd Section-images */}
          <div className="home-image">
            <img
              src="\assets\registeration-image.png"
              alt="avanishdeveloper.com"
              width="400"
              height="400"
            />
          </div>
          <div className="home-content">
            <p>The best IT Solutions here.</p>
            <h1>Welcome to Avanish Developer</h1>
            <p>
              Are you ready to take your business to the next level with
              cutting-edge IT Solutions? Look no further! As Avanish Developer,
              i specialize in providing innovative IT services and solutions
              tailored to meet your unique needs.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">Connect Now</button>
              </a>
              <a href="/service">
                <button className="btn secondary-btn">Learn More</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
