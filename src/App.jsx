import { useState, useEffect } from 'react'
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  MessageCircle, 
  Music, 
  Mail, 
  Sun, 
  Moon,
  UserPlus
} from 'lucide-react'
import './App.css'

// SEO Helper function
const updateSEOTags = (isDarkMode) => {
  // Update theme color based on current mode
  const themeColorMeta = document.querySelector('meta[name="theme-color"]')
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', isDarkMode ? '#0a0a0a' : '#f8fafc')
  }

  // Update Open Graph image based on theme if needed
  const ogImageMeta = document.querySelector('meta[property="og:image"]')
  if (ogImageMeta) {
    ogImageMeta.setAttribute('content', window.location.origin + '/logo.png')
  }
}

// Social Media Link Component
const SocialLink = ({ platform, url, icon: IconComponent, delay, isHighlighted = false }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const handleClick = () => {
    if (platform === 'Gmail') {
      window.location.href = `mailto:${url.replace('gmail : ', '')}`
    } else {
      window.open(url, '_blank')
    }
  }

  return (
    <div 
      className={`social-link ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''} ${isHighlighted ? 'highlighted' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="link-icon">
        <IconComponent size={24} />
      </div>
      <span className="link-text">{platform}</span>
      <div className="link-glow"></div>
      {isHighlighted && <div className="highlight-badge">New!</div>}
    </div>
  )
}

// Floating Particles Component - Optimized Starfield
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => (
    <div 
      key={i} 
      className="particle" 
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${6 + Math.random() * 8}s`
      }}
    />
  ))
  
  return <div className="particles-container">{particles}</div>
}

function App() {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    updateSEOTags(isDarkMode)
  }, [isDarkMode])

  // Set up initial SEO and document title
  useEffect(() => {
    document.title = 'AI & DEV Community - Connect • Learn • Innovate'
    
    // Add additional meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = 'Join AI & DEV Community - A thriving hub for AI enthusiasts and developers. Connect with like-minded professionals, learn cutting-edge technologies, and innovate together.'
    
    // Set canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = window.location.href
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }
  
  const socialLinks = [
    { 
      platform: 'Join Our Community', 
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSdu_abXzvs4gCvMcGVI3BvOTdo4Sn_tCop03G0CrhUkmEHYJA/viewform?usp=header',
      icon: UserPlus,
      delay: 100,
      isHighlighted: true
    },
    { 
      platform: 'Instagram', 
      url: 'https://www.instagram.com/aidev_communityfsbm',
      icon: Instagram,
      delay: 300
    },
    { 
      platform: 'Facebook', 
      url: 'https://www.facebook.com/share/G6KF7b56dSLF2SYh/?mibextid=qi2Omg',
      icon: Facebook,
      delay: 500
    },
    { 
      platform: 'LinkedIn', 
      url: 'https://www.linkedin.com/company/ai-dev-community/',
      icon: Linkedin,
      delay: 700
    },
    { 
      platform: 'WhatsApp', 
      url: 'https://chat.whatsapp.com/Ftvj3lJBgCy6MtLwGeM2kv',
      icon: MessageCircle,
      delay: 900
    },
    { 
      platform: 'TikTok', 
      url: 'https://www.tiktok.com/@ai.dev.community',
      icon: Music,
      delay: 1100
    },
    { 
      platform: 'Gmail', 
      url: 'communityaidev@gmail.com',
      icon: Mail,
      delay: 1300
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLogoLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <FloatingParticles />
      
      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      <div className="container">
        {/* Header Section */}
        <div className={`header ${logoLoaded ? 'loaded' : ''}`}>
          <div className="logo-container">
            <img 
              src="/logo.png" 
              alt="AI & DEV Community Logo" 
              className="logo"
              onLoad={() => setLogoLoaded(true)}
            />
            <div className="logo-glow"></div>
          </div>
          <h1 className="title">AI & DEV Community</h1>
          <p className="subtitle">Connect • Learn • Innovate</p>
        </div>

        {/* Links Section */}
        <div className="links-container">
          {socialLinks.map((link, index) => (
            <SocialLink 
              key={index}
              platform={link.platform}
              url={link.url}
              icon={link.icon}
              delay={link.delay}
              isHighlighted={link.isHighlighted}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="pulse-dot"></div>
          <p>Join our growing community of AI & Development enthusiasts!</p>
        </div>
      </div>
    </div>
  )
}

export default App
