
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
        <h1 className="text-xl font-bold text-center">Automação Play Store</h1>
      </div>
      
      <div className="p-3 flex-1 overflow-y-auto">
        <nav className="space-y-1 mb-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={cn(
                "w-full px-3 py-2.5 rounded-md flex items-center space-x-3 transition-colors",
                activeSection === item.id 
                  ? "bg-playstore-blue text-white font-medium" 
                  : "hover:bg-playstore-blue/10 text-sidebar-foreground"
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
            <div className="border-t border-playstore-separator my-4"></div>
            <h2 className="text-xs uppercase text-muted-foreground font-semibold mb-2 px-3">
              Seções do Formulário
            </h2>
            <nav className="space-y-1">
              {newAppSections.map((item) => (
                <button
                  key={item.id}
                  className={cn(
                    "w-full px-3 py-2 rounded-md flex items-center space-x-3 transition-colors",
                    activeSection === item.id 
                      ? "bg-playstore-blue/20 font-medium text-foreground" 
                      : "hover:bg-playstore-blue/10 text-sidebar-foreground"
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
      
      <div className="p-3 border-t border-playstore-separator">
        <div className="flex items-center">
          <div className="flex-1">
            <span className="text-sm text-muted-foreground">Tema</span>
          </div>
          <button
            className="p-2 rounded-md hover:bg-playstore-blue/10 transition-colors"
            onClick={onToggleDarkMode}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
