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
  UserPlus,
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

// Custom Discord SVG Icon Component
const DiscordIcon = ({ size = 24, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    {...props}
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z" />
  </svg>
)

// Custom TikTok SVG Icon Component
const TikTokIcon = ({ size = 24, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

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
      platform: 'Discord', 
      url: 'https://discord.gg/XduuPdg6bG',
      icon: DiscordIcon,
      delay: 200,
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
      icon: TikTokIcon,
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
