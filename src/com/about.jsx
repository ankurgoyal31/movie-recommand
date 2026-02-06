// import "./about.css";
import Nav from "./nav";
const About = () => {
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <h1>🎬 About MovieVerse</h1>
        <p>
          Discover, track and enjoy movies with smart recommendations and a
          personalized experience.
        </p>
      </section>

      {/* APP INFO */}
      <section className="about-card">
        <h2>🚀 What is MovieVerse?</h2>
        <p>
          MovieVerse is a full-stack movie platform where users can explore
          movies, watch trailers, like or dislike content, maintain a personal
          watchlist and get AI-generated movie summaries.
        </p>
      </section>

      {/* FEATURES */}
      <section className="about-card">
        <h2>✨ Key Features</h2>
        <ul className="features">
          <li>🔍 Smart movie search</li>
          <li>❤️ Like & 👎 Unlike system</li>
          <li>📌 Personal watchlist</li>
          <li>🤖 AI generated summaries</li>
          <li>⭐ Ratings & recommendations</li>
          <li>📱 Fully responsive design</li>
        </ul>
      </section>

      {/* WHY */}
      <section className="about-card">
        <h2>💡 Why I Built This</h2>
        <p>
          I created MovieVerse to practice real-world full-stack development and
          build a platform that solves movie discovery problems with a clean and
          modern UI.
        </p>
      </section>

      {/* TECH STACK */}
      <section className="about-card">
        <h2>🛠 Tech Stack</h2>
        <div className="tech">
          <span>React</span>
          <span>Node.js</span>
          <span>Express</span>
          <span>MongoDB</span>
          <span>JWT Auth</span>
          <span>TMDB API</span>
          <span>YouTube API</span>
           <span>LLM</span>
            <span>Rag System</span>

        </div>
      </section>

      {/* DEVELOPER */}
      <section className="about-card dev">
        <h2>👨‍💻 About the Developer</h2>
        <p>
          Hi, I’m <b>Ankur</b>, a B.Tech student and Full-Stack Web Developer who
          loves building real-world applications using modern web technologies.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="about-footer">
        <p>Made with ❤️ for movies</p>
      </footer>
    </div>
  );
};

export default About;
