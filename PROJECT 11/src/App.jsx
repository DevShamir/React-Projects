import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
const POSTS = [
  {
    id: 'react-router-v6',
    title: 'Mastering React Router v6',
    excerpt: 'Learn how to use the new declarative routing syntax and hooks to build seamless navigation.',
    content: 'React Router v6 introduced a lot of powerful changes. Gone is the Switch component, replaced by Routes. This makes nested routing much more intuitive. \n\nOne of the best features is the useParams hook, which allows us to read dynamic segments from the URL directly into our components. This is essential for building scalable applications like blogs, e-commerce stores, and dashboards where data is fetched based on the URL identifier. \n\nFurthermore, the new useNavigate hook replaces useHistory, providing a much cleaner API for programmatic navigation. Whether you are building a simple portfolio or a complex enterprise dashboard, mastering these routing concepts is non-negotiable for modern React developers.',
    author: 'Jane Doe',
    date: 'Oct 24, 2023',
    readTime: '4 min read',
    category: 'React',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'css-grid-layout',
    title: 'The Beauty of CSS Grid',
    excerpt: 'Stop fighting with margins and floats. Discover how CSS Grid can create complex layouts in minutes.',
    content: 'CSS Grid has completely revolutionized how we build layouts on the web. Instead of relying on clever flexbox tricks or outdated float hacks, we can explicitly define columns and rows. \n\nBy using properties like grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)), we can create fully responsive card grids without writing a single media query. It is declarative, powerful, and an absolute must-know for modern frontend developers.\n\nImagine building a complex masonry layout or a classic holy-grail layout. What used to take hundreds of lines of hacky CSS can now be achieved in just three or four lines of Grid code.',
    author: 'John Smith',
    date: 'Nov 02, 2023',
    readTime: '6 min read',
    category: 'CSS',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'state-management',
    title: 'When to use Context vs Redux',
    excerpt: 'A pragmatic guide to choosing the right state management tool for your next React application.',
    content: 'State management is often the most debated topic in the React ecosystem. While Redux was the undisputed king for years, Reacts built-in Context API has matured significantly.\n\nFor global UI themes, user authentication state, or simple localization, Context is usually more than enough. However, if your app requires complex state transitions, heavy data fetching caching, or time-travel debugging, a dedicated library like Redux Toolkit or Zustand becomes invaluable.\n\nUltimately, start simple. Lift state up when you need to, use Context when prop drilling becomes painful, and reach for Redux only when your state logic becomes too complex for React to handle elegantly on its own.',
    author: 'Alice Johnson',
    date: 'Dec 15, 2023',
    readTime: '8 min read',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'framer-motion-intro',
    title: 'Animating React with Framer Motion',
    excerpt: 'Bring your components to life with fluid, physics-based animations that delight your users.',
    content: 'Animation on the web used to be an afterthought, often resulting in janky transitions and poor performance. Framer Motion changes all that for React developers.\n\nBy providing a simple declarative API via the <motion.div> component, you can add complex spring animations, drag gestures, and layout transitions with minimal effort. It handles all the complex math and CSS transforms under the hood, allowing you to focus on the user experience.\n\nMicro-interactions, like a button scaling on hover or a modal springing into view, can significantly elevate the perceived quality of your application.',
    author: 'Jane Doe',
    date: 'Jan 10, 2024',
    readTime: '5 min read',
    category: 'React',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'
  }
];
const CATEGORIES = ['All', ...new Set(POSTS.map(post => post.category))];
const Header = ({ toggleTheme, isDark }) => (
  <header className="app-header">
    <div className="header-container">
      <Link to="/" className="logo">
        <span className="logo-icon">✨</span> DevNotes
      </Link>
      <nav className="main-nav">
        <Link to="/">Articles</Link>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Dark Mode">
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </nav>
    </div>
  </header>
);
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredPosts = useMemo(() => {
    return POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <main className="page-container index-page fade-in">
      
      <section className="controls-section">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="category-filters">
          {CATEGORIES.map(category => (
            <button 
              key={category} 
              className={`filter-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      {featuredPost && activeCategory === 'All' && searchQuery === '' && (
        <section className="featured-section">
          <Link to={`/post/${featuredPost.id}`} className="featured-card">
            <div className="featured-image" style={{ backgroundImage: `url(${featuredPost.image})` }}></div>
            <div className="featured-content">
              <span className="card-category">{featuredPost.category}</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="card-meta">
                <span>{featuredPost.author}</span>
                <span className="dot">•</span>
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
          </Link>
        </section>
      )}
      <div className="post-grid">
        {gridPosts.length > 0 ? (
          gridPosts.map(post => (
            <Link to={`/post/${post.id}`} key={post.id} className="post-card fade-in-up">
              <div className="card-image-wrapper">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className="card-content">
                <span className="card-category">{post.category}</span>
                <h3>{post.title}</h3>
                <p className="card-excerpt">{post.excerpt}</p>
                <div className="card-meta mt-auto">
                  <span>{post.date}</span>
                  <span className="dot">•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-results">
            <h3>No articles found</h3>
            <p>Try adjusting your search or category filter.</p>
            <button onClick={() => {setSearchQuery(''); setActiveCategory('All')}} className="clear-btn">Clear Filters</button>
          </div>
        )}
      </div>
    </main>
  );
};
const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const post = POSTS.find(p => p.id === id);
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  const handleLike = () => {
    setIsLiked(true);
    setLikes(prev => prev + 1);
  };
  if (!post) {
    return (
      <main className="page-container error-page fade-in">
        <h2>Post Not Found</h2>
        <button onClick={() => navigate('/')} className="back-btn">← Back to Articles</button>
      </main>
    );
  }
  return (
    <>
      <div className="progress-bar" style={{ transform: `scaleX(${scrollProgress})` }} />
      <main className="page-container article-page fade-in">
        <button onClick={() => navigate(-1)} className="back-btn mb-4 interactive-hover">
          ← Back
        </button>
        <article className="post-content">
          <header className="article-header">
            <span className="article-category">{post.category}</span>
            <h1>{post.title}</h1>
            <div className="article-meta">
              <div className="author-avatar">{post.author.charAt(0)}</div>
              <div className="meta-text">
                <strong>{post.author}</strong>
                <div>{post.date} · {post.readTime}</div>
              </div>
            </div>
          </header>
          <img src={post.image} alt="Article cover" className="article-cover-image" />
          <div className="article-body">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="engagement-section">
            <button 
              className={`like-btn ${isLiked ? 'liked' : ''}`} 
              onClick={handleLike}
            >
              👏 {likes > 0 ? likes : 'Clap'}
            </button>
            <p className="engagement-text">Enjoyed this article? Leave a clap!</p>
          </div>
        </article>
      </main>
    </>
  );
};
function App() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDark]);
  return (
    <Router>
      <div className="app-root">
        <Header toggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;