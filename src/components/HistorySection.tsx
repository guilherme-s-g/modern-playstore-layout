
import React from 'react';

const HistorySection = () => {
  return (
    <div className="customtk-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Histórico de Publicações</h2>
        <div className="flex space-x-2">
          <button className="customtk-button-secondary">Filtrar</button>
          <button className="customtk-button-secondary">Exportar</button>
        </div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="bg-[#292936] p-4 rounded-lg border border-customtk-separator">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">Meu Aplicativo v{2 + index/10}</h3>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    index === 0 ? 'bg-green-500/20 text-green-400' : 
                    index === 1 ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {index === 0 ? 'Publicado' : index === 1 ? 'Em Revisão' : 'Concluído'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Publicado em {new Date(2023, 5 - index, 10 + index).toLocaleDateString('pt-BR')}
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-x-4">
                    <span>Track: Production</span>
                    <span>Rollout: 100%</span>
                    <span>Instalações: {(10000 - index * 1500).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button className="customtk-button-secondary">Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySection;
