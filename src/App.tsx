import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Tag,
  ThumbsUp,
  MessageSquare,
  Share2,
  Home,
  User,
  Send,
  Database,
  Code2,
  Shield,
  Layout,
  Github,
} from 'lucide-react';
import {
  format,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parseISO,
} from 'date-fns';
import { supabase, type Entry, type Comment, type Like } from './lib/supabase';
import axios from 'axios';
import Particles from 'react-tsparticles';

function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="entry-container relative overflow-hidden"
    >
      <div className="space-y-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 glitch" data-text="Valery Karklins">
            Valerijs Karklins
          </h2>
          {/* <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQEQDwPWGYqseg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718245141331?e=1746057600&v=beta&t=sVkuBS3ZoI58EoX2kYz-ZhGMS04wjca1kOh3I-9vd-I"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white/10 mb-6"
          /> */}
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            As a detail-oriented and ambitious developer, I thrive on solving complex problems and optimizing systems. I value efficiency, clean code, and well-structured designs, always striving to deliver high-quality work. My strong analytical mindset drives me to experiment with new technologies that enhance my workflow. I also embrace creativity in UI/UX, ensuring that my software is not only functional but also intuitive and user-friendly. Currently, I'm focused on improving my Spanish, specifically for technical discussions, as I believe that effective communication is key to collaboration and success in any project.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold mb-2">My Journey</h3>
          <p className="text-gray-300">
            With over four years of programming experience, I focus on backend development, optimizing database structures, and creating user-friendly applications. I take pride in my work and strive to make a positive impact through technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="stat-card">
            <h4 className="font-semibold mb-2">Experience</h4>
            <p className="text-2xl">4+ Years</p>
          </div>
          <div className="stat-card">
            <h4 className="font-semibold mb-2">Projects</h4>
            <p className="text-2xl">20+</p>
          </div>
          <div className="stat-card">
            <h4 className="font-semibold mb-2">Tech Stack</h4>
            <p className="text-2xl">Full-Stack</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold mb-4">Technologies I Work With</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <span>SQL & GraphQL</span>
            </div>
            <div className="stat-card flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <span>Java</span>
            </div>
            <div className="stat-card flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span>Firebase Auth</span>
            </div>
            <div className="stat-card flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Layout className="w-5 h-5" />
              </div>
              <span>PrimeVue</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
          <div className="flex gap-4">
            <motion.a
              href="https://t.me/exosmium"
              target="_blank"
              rel="noopener noreferrer"
              className="date-nav-button flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Send className="w-5 h-5" />
              Telegram
            </motion.a>
            <motion.a
              href="https://github.com/exosmium"
              target="_blank"
              rel="noopener noreferrer"
              className="date-nav-button flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Github className="w-5 h-5" />
              GitHub
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/valerijs-karklins-591692289/"
              target="_blank"
              rel="noopener noreferrer"
              className="date-nav-button flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <User className="w-5 h-5" />
              LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [entry, setEntry] = useState<Entry | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // Initial auth check
    const checkUser = async () => {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking auth state:', error);
        setUser(null);
      }
    };

    checkUser();

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        console.log('Fetching entry for date:', formattedDate); // Debug log

        const { data: entries, error: entriesError } = await supabase
          .from('entries')
          .select('*, comments(*), likes(*)')
          .eq('date', formattedDate)
          .maybeSingle(); // Use maybeSingle() instead of single()

        if (entriesError) {
          console.error('Error fetching entry:', entriesError);
          setEntry(null);
          return;
        }

        setEntry(entries || null);
        
        if (entries) {
          // Update comments and likes if entry exists
          setComments(entries.comments || []);
          setLikes(entries.likes || []);
        } else {
          setComments([]);
          setLikes([]);
        }
      } catch (error) {
        console.error('Error in fetchEntry:', error);
        setEntry(null);
      }
    };

    fetchEntry();
  }, [currentDate]);

  const handlePrevDay = () => {
    setDirection(-1);
    setCurrentDate((prev) => subDays(prev, 1));
  };

  const handleNextDay = () => {
    setDirection(1);
    setCurrentDate((prev) => addDays(prev, 1));
  };

  const handleLike = async () => {
    if (!user || !entry) return;

    const existingLike = likes.find((like) => like.user_id === user.id);

    if (existingLike) {
      // Unlike
      await supabase.from('likes').delete().eq('id', existingLike.id);

      setLikes(likes.filter((like) => like.id !== existingLike.id));
    } else {
      // Like
      const { data: newLike } = await supabase
        .from('likes')
        .insert({
          entry_id: entry.id,
          user_id: user.id,
        })
        .select()
        .single();

      if (newLike) {
        setLikes([...likes, newLike]);
      }
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !entry || !newComment.trim()) return;

    const { data: comment } = await supabase
      .from('comments')
      .insert({
        content: newComment.trim(),
        entry_id: entry.id,
        user_id: user.id,
      })
      .select()
      .single();

    if (comment) {
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleShare = async () => {
    if (!entry) return;

    const shareData = {
      title: `Daily Reflection - ${format(
        parseISO(entry.date),
        'MMMM d, yyyy'
      )}`,
      text: entry.content,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const addNewBlogEntry = async (text: string) => {
    try {
      // Post directly to Supabase without user ID
      const { data, error } = await supabase
        .from('entries')
        .insert({
          content: text,
          mood: 'neutral',
          date: format(new Date(), 'yyyy-MM-dd'), // Use date-fns format
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding new blog entry:', error);
      } else {
        console.log('New blog entry added:', data);
        // Optionally refresh the current entry
        await fetchEntry();
      }
    } catch (error) {
      console.error('Error in addNewBlogEntry:', error);
    }
  };

  // Example of calling addNewBlogEntry based on a user action
  const handleAddEntry = () => {
    const entryText = "Your new blog entry text here"; // Replace with actual text
    addNewBlogEntry(entryText);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      {/* Particles Background */}
      <Particles
        className="particles"
        options={{
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            size: {
              value: 3,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        }}
      />

      {/* Gradient Background Lines */}
      <div className="gradient-lines" />

      {/* Navigation Header */}
      <motion.header
        className="fixed top-0 w-full bg-black/80 backdrop-blur-lg border-b border-white/10 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.h1
              className="text-3xl font-bold glitch md:text-3xl sm:text-2xl"
              data-text="Daily Reflections"
              whileHover={{ scale: 1.05 }}
            >
              Daily Reflections
            </motion.h1>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hamburger"
                aria-label="Menu"
              >
                <span className={menuOpen ? 'active' : ''} />
                <span className={menuOpen ? 'active' : ''} />
                <span className={menuOpen ? 'active' : ''} />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {currentPage === 'home' && (
                <>
                  <motion.button
                    onClick={handlePrevDay}
                    className="date-nav-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                    <button
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>{format(currentDate, 'MMM d, yyyy')}</span>
                    </button>

                    <AnimatePresence>
                      {showCalendar && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full mt-2 right-0 w-64 bg-black/90 backdrop-blur-lg border border-white/10 rounded-lg p-4"
                        >
                          <div className="text-center mb-4">
                            {format(currentDate, 'MMMM yyyy')}
                          </div>
                          <div className="calendar-grid">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                              <div
                                key={day}
                                className="calendar-day font-bold text-white/50"
                              >
                                {day}
                              </div>
                            ))}
                            {monthDays.map((day) => (
                              <motion.div
                                key={day.toISOString()}
                                className={`calendar-day ${
                                  format(day, 'yyyy-MM-dd') ===
                                  format(currentDate, 'yyyy-MM-dd')
                                    ? 'active'
                                    : ''
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setCurrentDate(day);
                                  setShowCalendar(false);
                                }}
                              >
                                {format(day, 'd')}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <motion.button
                    onClick={handleNextDay}
                    className="date-nav-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </>
              )}
              <motion.button
                onClick={() =>
                  setCurrentPage(currentPage === 'home' ? 'about' : 'home')
                }
                className="date-nav-button flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentPage === 'home' ? (
                  <>
                    <User className="w-5 h-5" />
                    <span>About</span>
                  </>
                ) : (
                  <>
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setMenuOpen(false);
                  }}
                  className="menu-link"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    setMenuOpen(false);
                  }}
                  className="menu-link"
                >
                  <User className="w-5 h-5" />
                  <span>About</span>
                </button>
                {currentPage === 'home' && (
                  <div className="flex items-center gap-2 px-4 py-2">
                    <Calendar className="w-5 h-5" />
                    <span>{format(currentDate, 'MMM d, yyyy')}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 pt-32 px-4 pb-8">
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key={entry?.id || currentDate.toISOString()}
              className="entry-container relative overflow-hidden"
              initial={{
                x: direction * 100,
                opacity: 0,
                filter: 'blur(10px)',
              }}
              animate={{
                x: 0,
                opacity: 1,
                filter: 'blur(0px)',
              }}
              exit={{
                x: direction * -100,
                opacity: 0,
                filter: 'blur(10px)',
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              {entry ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10"
                >
                  {/* Header Section */}
                  <div className="mb-8">
                    <h2
                      className="text-2xl font-bold mb-2 glitch"
                      data-text={format(parseISO(entry.date), 'EEEE')}
                    >
                      {format(parseISO(entry.date), 'EEEE')}
                    </h2>
                    <div className="flex items-center gap-4 text-white/60 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>3 min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span>{entry.mood}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="prose prose-invert max-w-none">
                    <p className="leading-relaxed text-gray-300 mb-8">
                      {entry.content}
                    </p>
                  </div>

                  {/* Stats Section */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <motion.button
                      className={`stat-card cursor-pointer ${
                        user && likes.some((like) => like.user_id === user.id)
                          ? 'bg-white/20'
                          : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      onClick={handleLike}
                    >
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5" />
                        <span>{likes.length} Likes</span>
                      </div>
                    </motion.button>
                    <motion.button
                      className="stat-card cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setShowComments(!showComments)}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        <span>{comments.length} Comments</span>
                      </div>
                    </motion.button>
                  </div>

                  {/* Comments Section */}
                  <AnimatePresence>
                    {showComments && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-8 space-y-4"
                      >
                        {comments.map((comment) => (
                          <motion.div
                            key={comment.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="p-4 bg-white/5 rounded-lg"
                          >
                            <p className="text-sm text-gray-300">
                              {comment.content}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {format(
                                parseISO(comment.created_at),
                                'MMM d, yyyy HH:mm'
                              )}
                            </p>
                          </motion.div>
                        ))}

                        {user && (
                          <form
                            onSubmit={handleComment}
                            className="mt-4 flex gap-2"
                          >
                            <input
                              type="text"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Add a comment..."
                              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/30"
                            />
                            <motion.buttonR
                              type="submit"
                              className="date-nav-button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={!newComment.trim()}
                            >
                              <Send className="w-5 h-5" />
                            </motion.buttonR>
                          </form>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Share Button */}
                  <motion.button
                    className="mt-8 w-full date-nav-button flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5" />
                    Share this reflection
                  </motion.button>
                </motion.div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No entry for this date.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <AboutPage />
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}

export default App;
