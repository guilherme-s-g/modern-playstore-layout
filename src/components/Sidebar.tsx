
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  History, 
  Settings, 
  Upload, 
  Moon, 
  Sun, 
  FileEdit,
  Image,
  CloudUpload,
  RefreshCw,
  Package,
  Clipboard,
  Code
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
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
  const navigate = useNavigate();
  const [updateMode, setUpdateMode] = React.useState(false);
  
  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'new-app',
      label: 'Atualização de App',
      icon: <Upload className="w-5 h-5" />
    },
    {
      id: 'gerar-aab',
      label: 'Gerar AAB',
      icon: <Package className="w-5 h-5" />
    },
    {
      id: 'status-revisao',
      label: 'Status de Revisão',
      icon: <Clipboard className="w-5 h-5" />
    },
    {
      id: 'instrucoes-python',
      label: 'Integração Python',
      icon: <Code className="w-5 h-5" />,
      isRoute: true,
      path: '/instrucoes-python'
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
      label: 'Imagens e Assets',
      icon: <Image className="w-5 h-5" />
    },
    {
      id: 'release-config',
      label: 'Configurações de Release',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  const handleItemClick = (item: any) => {
    if (item.isRoute && item.path) {
      navigate(item.path);
    } else {
      onSectionChange(item.id);
    }
  };
  
  return (
    <div className="bg-[#1E1E2E] text-sidebar-foreground w-64 h-screen flex flex-col shadow-lg">
      <div className="p-5 border-b border-customtk-separator">
        <h1 className="text-xl font-bold text-center text-white">Automação Play Store</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={cn(
                "customtk-sidebar-item",
                (activeSection === item.id || 
                 (item.id === 'new-app' && ['basic-info', 'files-credentials', 'images', 'release-config'].includes(activeSection)) ||
                 (item.path === window.location.pathname))
                  ? "active" 
                  : ""
              )}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        
        {(activeSection === 'new-app' || activeSection === 'basic-info' || 
         activeSection === 'files-credentials' || activeSection === 'images' || 
         activeSection === 'release-config') && (
          <div className="mt-5 space-y-2 border-t border-customtk-separator pt-5">
            <p className="text-xs text-white/60 uppercase font-semibold px-3 mb-2">Etapas da Atualização</p>
            {newAppSections.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "customtk-sidebar-item pl-4",
                  activeSection === item.id ? "active" : ""
                )}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-4 border-t border-customtk-separator">
        {/* Tema escuro toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {darkMode ? <Moon className="w-5 h-5 text-white/70" /> : <Sun className="w-5 h-5 text-white/70" />}
            <span className="text-sm text-white/80">Tema Escuro</span>
          </div>
          <Switch 
            checked={darkMode} 
            onCheckedChange={onToggleDarkMode} 
            className="data-[state=checked]:bg-customtk-blue"
          />
        </div>

        {/* Modo Atualização toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-5 h-5 text-white/70" />
            <span className="text-sm text-white/80">Modo Atualização</span>
          </div>
          <Switch 
            checked={updateMode} 
            onCheckedChange={() => setUpdateMode(!updateMode)} 
            className="data-[state=checked]:bg-customtk-blue"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
