// This file handles article storage and management using localStorage
// In a real application, you would use a database

export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  coverImage?: string
  category?: string
  viewCount?: number
}

// Local storage key
const STORAGE_KEY = "animmomen_articles"

// Get all articles
export function getArticles(): Article[] {
  if (typeof window === "undefined") {
    return getSampleArticles()
  }

  const articles = localStorage.getItem(STORAGE_KEY)
  if (!articles) {
    // Initialize with sample articles if none exist
    const sampleArticles = getSampleArticles()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleArticles))
    return sampleArticles
  }

  return JSON.parse(articles)
}

// Get a single article by slug
export function getArticleBySlug(slug: string): Article | null {
  const articles = getArticles()
  return articles.find((article) => article.slug === slug) || null
}

// Create a new article
export function createArticle(article: Article): void {
  const articles = getArticles()
  articles.unshift(article) // Add to the beginning of the array
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
}

// Update an existing article
export function updateArticle(oldSlug: string, updatedArticle: Article): void {
  const articles = getArticles()
  const index = articles.findIndex((article) => article.slug === oldSlug)

  if (index !== -1) {
    articles[index] = updatedArticle
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
  }
}

// Delete an article
export function deleteArticle(slug: string): void {
  const articles = getArticles()
  const filteredArticles = articles.filter((article) => article.slug !== slug)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredArticles))
}

// Increment view count for an article
export function incrementViewCount(slug: string): void {
  if (typeof window === "undefined") return

  const articles = getArticles()
  const index = articles.findIndex((article) => article.slug === slug)

  if (index !== -1) {
    // Initialize viewCount if it doesn't exist
    if (!articles[index].viewCount) {
      articles[index].viewCount = 0
    }

    // Increment the view count
    articles[index].viewCount!++

    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
  }
}

// Sample articles for initial data
function getSampleArticles(): Article[] {
  return [
    {
      slug: "attack-on-titan-final-season-review",
      title: "Attack on Titan Final Season: A Masterpiece Conclusion",
      excerpt:
        "The epic saga comes to an end with a finale that challenges everything we thought we knew about the series.",
      content: `
        <h2>The End of an Era</h2>
        <p>After years of building tension and mystery, Attack on Titan delivers a conclusion that will be discussed for years to come. The final season takes the series to new heights, challenging viewers with complex moral questions and stunning revelations.</p>
        
        <h3>Character Development</h3>
        <p>What makes the final season truly special is how it handles its characters. Eren Yeager's transformation throughout the series reaches its climax, forcing viewers to reconsider everything they thought they knew about the protagonist.</p>
        
        <p>Meanwhile, supporting characters like Armin, Mikasa, and even former antagonists are given meaningful arcs that tie into the overall themes of the show.</p>
        
        <h3>Animation and Direction</h3>
        <p>MAPPA studio took over animation duties for the final season, bringing a new visual style while maintaining the intensity and impact the series is known for. The action sequences are breathtaking, and the quieter character moments are given equal weight.</p>
        
        <h3>Conclusion</h3>
        <p>Few anime manage to stick the landing as well as Attack on Titan. The finale brings together themes of freedom, cycle of hatred, and the cost of war in a way that feels both satisfying and thought-provoking.</p>
      `,
      date: "March 15, 2023",
      category: "Review",
      coverImage: "/placeholder.svg?height=500&width=1000",
      viewCount: 245,
    },
    {
      slug: "upcoming-anime-2023",
      title: "Most Anticipated Anime of 2023",
      excerpt:
        "From returning favorites to exciting new adaptations, here's what anime fans can look forward to in 2023.",
      content: `
        <h2>A Packed Year for Anime Fans</h2>
        <p>2023 is shaping up to be an incredible year for anime, with highly anticipated new seasons of beloved series and exciting new adaptations of popular manga.</p>
        
        <h3>Returning Series</h3>
        <ul>
          <li><strong>Demon Slayer Season 3</strong> - The Swordsmith Village Arc promises even more breathtaking animation and intense battles.</li>
          <li><strong>Jujutsu Kaisen Season 2</strong> - Following the success of the Jujutsu Kaisen 0 movie, fans are eager to see the continuation of Yuji's story.</li>
          <li><strong>Vinland Saga Season 2</strong> - The critically acclaimed historical epic returns for a new chapter.</li>
        </ul>
        
        <h3>New Adaptations</h3>
        <ul>
          <li><strong>Chainsaw Man</strong> - Perhaps the most hyped new series, this dark and wild manga adaptation has fans extremely excited.</li>
          <li><strong>Hell's Paradise</strong> - The supernatural historical manga gets an adaptation that promises gorgeous visuals and intense action.</li>
          <li><strong>Oshi no Ko</strong> - This unique manga about the entertainment industry is getting an adaptation that could be one of the year's sleeper hits.</li>
        </ul>
        
        <h3>Movies to Watch For</h3>
        <p>Several major anime films are also scheduled for release, including new entries in the My Hero Academia franchise and original works from renowned studios.</p>
        
        <h3>Conclusion</h3>
        <p>With such a diverse lineup of shows spanning various genres, 2023 is looking to be a standout year for anime fans of all tastes.</p>
      `,
      date: "January 5, 2023",
      category: "News",
      coverImage: "/placeholder.svg?height=500&width=1000",
      viewCount: 189,
    },
    {
      slug: "evolution-of-anime-art-styles",
      title: "The Evolution of Anime Art Styles Through the Decades",
      excerpt:
        "From the early days of Astro Boy to modern digital techniques, we explore how anime visuals have transformed over time.",
      content: `
        <h2>A Visual Journey Through Time</h2>
        <p>Anime's distinctive visual style has evolved dramatically since its early days. This evolution reflects changes in technology, artistic influences, and cultural shifts in Japan and globally.</p>
        
        <h3>The 1960s: The Foundations</h3>
        <p>Osamu Tezuka, often called the "God of Manga," established many of the visual conventions we associate with anime today. His works like Astro Boy featured large eyes and simplified facial features that would become hallmarks of the medium.</p>
        
        <h3>The 1970s-80s: Diversification</h3>
        <p>This period saw a significant diversification in styles. Shows like Mobile Suit Gundam brought more realistic proportions to mecha designs, while series like Rose of Versailles explored elaborate, detailed character designs and backgrounds.</p>
        
        <h3>The 1990s: The Golden Age</h3>
        <p>Often considered anime's golden age, the 90s saw groundbreaking works like Neon Genesis Evangelion, which combined traditional techniques with early digital effects. Studio Ghibli films refined a painterly aesthetic that balanced realism with fantasy.</p>
        
        <h3>The 2000s: Digital Revolution</h3>
        <p>The shift to digital production methods transformed anime visuals. Series like The Melancholy of Haruhi Suzumiya showcased what was possible with digital coloring and effects, while maintaining hand-drawn character animation.</p>
        
        <h3>The 2010s to Present: Blending Techniques</h3>
        <p>Modern anime often blends traditional hand-drawn animation with 3D CGI elements. Shows like Demon Slayer have pushed the boundaries of what's possible, with ufotable's digital effects team creating breathtaking action sequences that wouldn't have been possible in earlier eras.</p>
        
        <h3>Conclusion</h3>
        <p>While technology continues to evolve, the distinctive visual language of anime remains rooted in its history. Today's most innovative studios honor traditional techniques while embracing new possibilities.</p>
      `,
      date: "February 18, 2023",
      category: "Feature",
      coverImage: "/placeholder.svg?height=500&width=1000",
      viewCount: 312,
    },
  ]
}

