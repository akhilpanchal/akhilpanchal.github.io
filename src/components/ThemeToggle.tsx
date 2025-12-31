import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');

    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
    >
      {/* Moon icon - shown in light mode */}
      <Moon className="h-5 w-5 block dark:hidden" />
      
      {/* Sun icon - shown in dark mode */}
      <Sun className="h-5 w-5 hidden dark:block" />
    </Button>
  );
}
