import { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Create context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  // State for sidebar collapse
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // State for theme (light/dark)
  const [darkMode, setDarkMode] = useState(false);
  
  // State for user preferences
  const [userPreferences, setUserPreferences] = useState({
    primaryColor: '#4361ee',
    fontSize: 'medium',
    language: 'en',
  });

  // Check if screen is small on initial load and when resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update user preferences
  const updateUserPreferences = (newPreferences) => {
    setUserPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    sidebarCollapsed,
    toggleSidebar,
    darkMode,
    toggleDarkMode,
    userPreferences,
    updateUserPreferences
  }), [sidebarCollapsed, darkMode, userPreferences]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
