
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const ReleaseConfigForm = () => {
  const [trackType, setTrackType] = useState('internal');
  const [enableRollout, setEnableRollout] = useState(false);
  const [scheduleRelease, setScheduleRelease] = useState(false);
  const [releaseDate, setReleaseDate] = useState('');
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-lg font-medium mb-6">Configurações de Release</h2>
      
      <div className="mb-8">
        <h3 className="form-field-label mb-3">Track de Publicação</h3>
        
        <div className="space-y-3">
          <div className="bg-card rounded-md p-4 border border-transparent hover:border-playstore-blue/50 transition-colors">
            <div className="flex items-center">
              <div className="flex items-center h-5">
                <input
                  id="internal"
                  name="track"
                  type="radio"
                  checked={trackType === 'internal'}
                  onChange={() => setTrackType('internal')}
                  className="h-4 w-4 border-border text-playstore-blue focus:ring-playstore-blue"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="internal" className="font-medium">Internal Testing</label>
                <p className="text-sm text-muted-foreground">Teste interno com até 100 usuários</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-md p-4 border border-transparent hover:border-playstore-blue/50 transition-colors">
            <div className="flex items-center">
              <div className="flex items-center h-5">
                <input
                  id="closed"
                  name="track"
                  type="radio"
                  checked={trackType === 'closed'}
                  onChange={() => setTrackType('closed')}
                  className="h-4 w-4 border-border text-playstore-blue focus:ring-playstore-blue"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="closed" className="font-medium">Closed Testing</label>
                <p className="text-sm text-muted-foreground">Teste fechado com grupo específico</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-md p-4 border border-transparent hover:border-playstore-blue/50 transition-colors">
            <div className="flex items-center">
              <div className="flex items-center h-5">
                <input
                  id="open"
                  name="track"
                  type="radio"
                  checked={trackType === 'open'}
                  onChange={() => setTrackType('open')}
                  className="h-4 w-4 border-border text-playstore-blue focus:ring-playstore-blue"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="open" className="font-medium">Open Testing</label>
                <p className="text-sm text-muted-foreground">Teste aberto para qualquer usuário</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-md p-4 border border-transparent hover:border-playstore-blue/50 transition-colors">
            <div className="flex items-center">
              <div className="flex items-center h-5">
                <input
                  id="production"
                  name="track"
                  type="radio"
                  checked={trackType === 'production'}
                  onChange={() => setTrackType('production')}
                  className="h-4 w-4 border-border text-playstore-blue focus:ring-playstore-blue"
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
        <div className="flex items-center">
          <div className="flex items-center h-5">
            <input
              id="rollout"
              type="checkbox"
              checked={enableRollout}
              onChange={() => setEnableRollout(!enableRollout)}
              className="h-4 w-4 rounded border-border text-playstore-blue focus:ring-playstore-blue"
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
            <label className="form-field-label">Porcentagem de usuários</label>
            <select className="form-field max-w-xs">
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
        
        <div className="flex items-center">
          <div className="flex items-center h-5">
            <input
              id="schedule"
              type="checkbox"
              checked={scheduleRelease}
              onChange={() => setScheduleRelease(!scheduleRelease)}
              className="h-4 w-4 rounded border-border text-playstore-blue focus:ring-playstore-blue"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="schedule" className="font-medium">Agendar publicação</label>
            <p className="text-sm text-muted-foreground">Defina uma data para lançamento automático</p>
          </div>
        </div>
        
        {scheduleRelease && (
          <div className="ml-7 animate-fade-in">
            <label className="form-field-label">Data de publicação</label>
            <div className="relative max-w-xs">
              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="form-field pl-10"
                min={new Date().toISOString().split('T')[0]}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
      
      <div className="pt-4 border-t border-border">
        <button className="action-button-primary w-full">
          Publicar Aplicativo
        </button>
      </div>
    </div>
  );
};

export default ReleaseConfigForm;
