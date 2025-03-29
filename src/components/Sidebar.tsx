
import React from 'react';
import { 
  Home, 
  History, 
  Settings, 
  Upload, 
  Moon, 
  Sun, 
  FileEdit,
  Image,
  CloudUpload
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Sidebar = ({ 
  activeSection, 
  onSectionChange,
  darkMode, 
  onToggleDarkMode
}: SidebarProps) => {
  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'new-app',
      label: 'Novo Aplicativo',
      icon: <Upload className="w-5 h-5" />
    },
    {
      id: 'history',
      label: 'Histórico',
      icon: <History className="w-5 h-5" />
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: <Settings className="w-5 h-5" />
    }
  ];
  
  const newAppSections = [
    {
      id: 'basic-info',
      label: 'Informações Básicas',
      icon: <FileEdit className="w-5 h-5" />
    },
    {
      id: 'files-credentials',
      label: 'Arquivos e Credenciais',
      icon: <CloudUpload className="w-5 h-5" />
    },
    {
      id: 'images',
      label: 'Imagens',
      icon: <Image className="w-5 h-5" />
    },
    {
      id: 'release-config',
      label: 'Configurações de Release',
      icon: <Settings className="w-5 h-5" />
    }
  ];
  
  return (
    <div className="bg-playstore-darker text-sidebar-foreground w-64 h-screen flex flex-col">
      <div className="p-4 border-b border-playstore-separator">
        <h1 className="text-xl font-bold">Play Store Publisher</h1>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-xs uppercase text-muted-foreground font-semibold mb-2">Menu Principal</h2>
        <nav className="space-y-1 mb-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={cn(
                "sidebar-nav-button",
                activeSection === item.id ? "active" : ""
              )}
              onClick={() => onSectionChange(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        {activeSection === 'new-app' && (
          <>
            <h2 className="text-xs uppercase text-muted-foreground font-semibold mb-2 mt-6">
              Seções do Formulário
            </h2>
            <nav className="space-y-1">
              {newAppSections.map((item) => (
                <button
                  key={item.id}
                  className={cn(
                    "sidebar-nav-button",
                    activeSection === item.id ? "active" : ""
                  )}
                  onClick={() => onSectionChange(item.id)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </>
        )}
      </div>
      
      <div className="p-4 border-t border-playstore-separator">
        <button
          className="sidebar-nav-button"
          onClick={onToggleDarkMode}
        >
          {darkMode ? (
            <>
              <Sun className="w-5 h-5" />
              <span>Modo Claro</span>
            </>
          ) : (
            <>
              <Moon className="w-5 h-5" />
              <span>Modo Escuro</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
