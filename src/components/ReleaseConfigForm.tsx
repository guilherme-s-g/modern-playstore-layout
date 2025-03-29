
import React, { useState } from 'react';
import { Calendar, ChevronDown, Clock, RotateCw, FileText } from 'lucide-react';
import FormField from './FormField';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReleaseConfigForm = () => {
  const [trackType, setTrackType] = useState('internal');
  const [enableRollout, setEnableRollout] = useState(false);
  const [scheduleRelease, setScheduleRelease] = useState(false);
  const [releaseDate, setReleaseDate] = useState('');
  const [activeTab, setActiveTab] = useState("config");
  const [publishStatus, setPublishStatus] = useState('idle'); // idle, publishing, error, success
  
  // Exemplo de logs para a demonstração
  const [logs, setLogs] = useState([
    { time: '10:42:15', message: 'Iniciando validação do pacote...', type: 'info' },
    { time: '10:42:18', message: 'Verificando manifesto e permissões...', type: 'info' },
    { time: '10:42:25', message: 'Validação concluída com sucesso.', type: 'success' },
    { time: '10:42:30', message: 'Preparando upload para Google Play...', type: 'info' },
    { time: '10:43:05', message: 'Arquivos enviados com sucesso!', type: 'success' },
    { time: '10:43:10', message: 'Atualizando informações do aplicativo...', type: 'info' },
    { time: '10:43:15', message: 'ALERTA: Faltam screenshots para tablet.', type: 'warning' },
    { time: '10:43:20', message: 'Configurando track de publicação: ' + trackType, type: 'info' },
  ]);

  const handlePublish = () => {
    setPublishStatus('publishing');
    
    // Simulando processo de publicação com adição de novos logs
    const newLog = { time: new Date().toLocaleTimeString(), message: 'Iniciando publicação...', type: 'info' };
    setLogs(prevLogs => [...prevLogs, newLog]);
    
    // Automaticamente mudar para a aba de logs
    setActiveTab('logs');
    
    // Simulação de progresso (apenas para demonstração)
    setTimeout(() => {
      const successLog = { time: new Date().toLocaleTimeString(), message: 'Publicação enviada com sucesso!', type: 'success' };
      setLogs(prevLogs => [...prevLogs, successLog]);
      setPublishStatus('success');
    }, 3000);
  };
  
  const getLogTypeStyle = (type) => {
    switch(type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-foreground/80';
    }
  };
  
  return (
    <div className="animate-fade-in">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[#333333] w-full mb-6">
          <TabsTrigger 
            value="config" 
            className="data-[state=active]:bg-playstore-blue"
          >
            Configurações
          </TabsTrigger>
          <TabsTrigger 
            value="logs" 
            className="data-[state=active]:bg-playstore-blue"
          >
            Logs de Publicação
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="config">
          <h2 className="text-lg font-medium mb-6">Configurações de Release</h2>
          
          <div className="mb-8">
            <h3 className="font-medium mb-4 text-foreground">Track de Publicação</h3>
            
            <div className="space-y-3">
              <div className="bg-card rounded-md p-4 border border-transparent hover:border-playstore-blue/30 transition-colors">
                <div className="flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="internal"
                      name="track"
                      type="radio"
                      checked={trackType === 'internal'}
                      onChange={() => setTrackType('internal')}
                      className="h-4 w-4 border-playstore-separator text-playstore-blue focus:ring-playstore-blue"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="internal" className="font-medium">Internal Testing</label>
                    <p className="text-sm text-muted-foreground">Teste interno com até 100 usuários</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-md p-4 border border-transparent hover:border-playstore-blue/30 transition-colors">
                <div className="flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="closed"
                      name="track"
                      type="radio"
                      checked={trackType === 'closed'}
                      onChange={() => setTrackType('closed')}
                      className="h-4 w-4 border-playstore-separator text-playstore-blue focus:ring-playstore-blue"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="closed" className="font-medium">Closed Testing</label>
                    <p className="text-sm text-muted-foreground">Teste fechado com grupo específico</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-md p-4 border border-transparent hover:border-playstore-blue/30 transition-colors">
                <div className="flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="open"
                      name="track"
                      type="radio"
                      checked={trackType === 'open'}
                      onChange={() => setTrackType('open')}
                      className="h-4 w-4 border-playstore-separator text-playstore-blue focus:ring-playstore-blue"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="open" className="font-medium">Open Testing</label>
                    <p className="text-sm text-muted-foreground">Teste aberto para qualquer usuário</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-md p-4 border border-transparent hover:border-playstore-blue/30 transition-colors">
                <div className="flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="production"
                      name="track"
                      type="radio"
                      checked={trackType === 'production'}
                      onChange={() => setTrackType('production')}
                      className="h-4 w-4 border-playstore-separator text-playstore-blue focus:ring-playstore-blue"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="production" className="font-medium">Production</label>
                    <p className="text-sm text-muted-foreground">Publicação na Play Store</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-center p-2 rounded-md hover:bg-card/60 transition-colors">
              <div className="flex items-center h-5">
                <input
                  id="rollout"
                  type="checkbox"
                  checked={enableRollout}
                  onChange={() => setEnableRollout(!enableRollout)}
                  className="h-4 w-4 rounded border-playstore-separator text-playstore-blue focus:ring-playstore-blue"
                  disabled={trackType !== 'production'}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="rollout" className="font-medium">Habilitar rollout gradual</label>
                <p className="text-sm text-muted-foreground">Libere o app para uma porcentagem de usuários</p>
              </div>
            </div>
            
            {enableRollout && (
              <div className="ml-7 animate-fade-in">
                <label className="form-field-label mb-2 block">Porcentagem de usuários</label>
                <select className="form-field max-w-xs bg-card border border-playstore-separator rounded-md p-2 text-foreground">
                  <option value="0.1">0.1% dos usuários</option>
                  <option value="1">1% dos usuários</option>
                  <option value="5">5% dos usuários</option>
                  <option value="10">10% dos usuários</option>
                  <option value="20">20% dos usuários</option>
                  <option value="50">50% dos usuários</option>
                  <option value="100">100% dos usuários</option>
                </select>
              </div>
            )}
            
            <div className="flex items-center p-2 rounded-md hover:bg-card/60 transition-colors">
              <div className="flex items-center h-5">
                <input
                  id="schedule"
                  type="checkbox"
                  checked={scheduleRelease}
                  onChange={() => setScheduleRelease(!scheduleRelease)}
                  className="h-4 w-4 rounded border-playstore-separator text-playstore-blue focus:ring-playstore-blue"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="schedule" className="font-medium">Agendar publicação</label>
                <p className="text-sm text-muted-foreground">Defina uma data para lançamento automático</p>
              </div>
            </div>
            
            {scheduleRelease && (
              <div className="ml-7 space-y-4 animate-fade-in">
                <div>
                  <label className="form-field-label mb-2 block">Data de publicação</label>
                  <div className="relative max-w-xs">
                    <input
                      type="date"
                      value={releaseDate}
                      onChange={(e) => setReleaseDate(e.target.value)}
                      className="form-field pl-10 bg-card border border-playstore-separator rounded-md p-2 text-foreground w-full"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div>
                  <label className="form-field-label mb-2 block">Hora</label>
                  <div className="flex items-center space-x-2 max-w-xs">
                    <select className="form-field bg-card border border-playstore-separator rounded-md p-2 text-foreground w-20">
                      {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                        <option key={hour} value={hour.toString().padStart(2, '0')}>
                          {hour.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <span className="text-foreground">:</span>
                    <select className="form-field bg-card border border-playstore-separator rounded-md p-2 text-foreground w-20">
                      {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                        <option key={minute} value={minute.toString().padStart(2, '0')}>
                          {minute.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="pt-6 border-t border-playstore-separator">
            <button 
              className="bg-playstore-blue hover:bg-playstore-blue/80 text-white font-medium px-4 py-3 rounded-md transition-colors w-full flex items-center justify-center space-x-2"
              onClick={handlePublish}
              disabled={publishStatus === 'publishing'}
            >
              {publishStatus === 'publishing' && <RotateCw className="w-4 h-4 animate-spin" />}
              <span>Publicar Aplicativo</span>
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="logs" className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Logs de Publicação
            </h2>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                publishStatus === 'success' ? 'bg-green-900/30 text-green-400' :
                publishStatus === 'error' ? 'bg-red-900/30 text-red-400' :
                publishStatus === 'publishing' ? 'bg-blue-900/30 text-blue-400' :
                'bg-gray-800 text-gray-400'
              }`}>
                {publishStatus === 'success' ? 'Publicação completa' :
                 publishStatus === 'error' ? 'Erro na publicação' :
                 publishStatus === 'publishing' ? 'Publicando...' :
                 'Aguardando'}
              </span>
              {publishStatus === 'publishing' && (
                <RotateCw className="w-4 h-4 animate-spin text-blue-400" />
              )}
            </div>
          </div>
          
          <div className="bg-[#1A1A1A] border border-playstore-separator rounded-md h-96 overflow-y-auto p-4 font-mono text-sm">
            <div className="space-y-2">
              {logs.map((log, index) => (
                <div key={index} className="flex">
                  <span className="text-gray-500 mr-3">[{log.time}]</span>
                  <span className={getLogTypeStyle(log.type)}>{log.message}</span>
                </div>
              ))}
              {publishStatus === 'publishing' && (
                <div className="h-4 w-4 bg-blue-500 animate-pulse rounded-full"></div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button 
              className="bg-[#333333] hover:bg-[#444444] text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
              onClick={() => setActiveTab('config')}
            >
              <ChevronDown className="w-4 h-4 rotate-90" />
              <span>Voltar para Configurações</span>
            </button>
            
            <button 
              className="bg-[#333333] hover:bg-[#444444] text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
              onClick={() => {
                const now = new Date().toLocaleTimeString();
                setLogs(logs => [...logs, {time: now, message: 'Log limpo pelo usuário', type: 'info'}]);
              }}
            >
              <Clock className="w-4 h-4" />
              <span>Adicionar timestamp</span>
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReleaseConfigForm;
