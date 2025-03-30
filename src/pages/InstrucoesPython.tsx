
import React from 'react';
import { AlertTriangle, FileText, Info, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const InstrucoesPython = () => {
  return (
    <div className="p-6 bg-[#222222] text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Instruções para o Backend Python</h1>
        <p className="text-muted-foreground mb-6">
          Saiba como configurar e executar o backend Python necessário para a funcionalidade completa do Play Store Publisher.
        </p>
        
        <div className="bg-[#2A2A2A] border border-playstore-separator rounded-lg shadow-md overflow-hidden p-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Ambiente Python Necessário</AlertTitle>
            <AlertDescription>
              Para utilizar todas as funcionalidades da aplicação, você precisa configurar e executar o backend Python localmente.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-medium mb-2">1. Requisitos</h2>
              <div className="bg-[#333333] rounded-md p-4">
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Python 3.7 ou superior</li>
                  <li>pip (gerenciador de pacotes Python)</li>
                  <li>Java JDK 11 ou superior (para o bundletool)</li>
                  <li>bundletool.jar (ferramenta do Google para criação de AAB)</li>
                </ul>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-lg font-medium mb-2">2. Configuração do Backend</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Clone o repositório ou baixe os arquivos:</h3>
                  <div className="bg-[#333333] rounded-md p-3 font-mono text-sm overflow-x-auto">
                    <p>git clone https://seu-repositorio/play-store-publisher.git</p>
                    <p>cd play-store-publisher/src/backend</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Instale as dependências:</h3>
                  <div className="bg-[#333333] rounded-md p-3 font-mono text-sm overflow-x-auto">
                    <p>pip install -r requirements.txt</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Estrutura do diretório backend:</h3>
                  <div className="bg-[#333333] rounded-md p-3 font-mono text-sm overflow-x-auto">
                    <p>src/backend/</p>
                    <p>├── main.py           # Arquivo principal do FastAPI</p>
                    <p>├── requirements.txt  # Dependências Python</p>
                    <p>└── uploads/          # Diretório para arquivos temporários (criado automaticamente)</p>
                  </div>
                </div>
                
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Importante</AlertTitle>
                  <AlertDescription>
                    Certifique-se de que o diretório 'uploads' tenha permissões de escrita. Os arquivos enviados e gerados serão armazenados temporariamente neste diretório.
                  </AlertDescription>
                </Alert>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-lg font-medium mb-2">3. Executando o Backend</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Inicie o servidor FastAPI:</h3>
                  <div className="bg-[#333333] rounded-md p-3 font-mono text-sm overflow-x-auto">
                    <p>cd src/backend</p>
                    <p>python main.py</p>
                    <p># Ou alternativamente:</p>
                    <p>uvicorn main:app --reload --host 0.0.0.0 --port 8000</p>
                  </div>
                </div>
                
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-md p-4">
                  <div className="flex items-start space-x-2">
                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-400">Servidor Rodando</h3>
                      <p className="text-sm mt-1">
                        O servidor estará disponível em http://localhost:8000. O frontend React se comunicará com esta API para todas as operações de geração de AAB.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Verificar a documentação da API:</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    FastAPI gera automaticamente documentação interativa para a API:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Swagger UI: <span className="text-blue-400">http://localhost:8000/docs</span></li>
                    <li>ReDoc: <span className="text-blue-400">http://localhost:8000/redoc</span></li>
                  </ul>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-lg font-medium mb-2">4. Implementação Completa</h2>
              <div className="space-y-2">
                <p className="text-sm">
                  A implementação atual é um simulador que demonstra o fluxo de trabalho. Para uma implementação completa, você precisará:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Baixar o <a href="https://developer.android.com/studio/command-line/bundletool" className="text-blue-400 hover:underline">bundletool</a> do Google</li>
                  <li>Modificar o método <code className="bg-[#333333] px-1 py-0.5 rounded text-xs">process_aab_generation</code> para usar o bundletool real</li>
                  <li>Implementar o armazenamento persistente para builds (opcional)</li>
                  <li>Configurar o CORS adequadamente para seu ambiente de produção</li>
                </ul>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-lg font-medium mb-2">5. Resolução de Problemas</h2>
              <div className="space-y-4">
                <div className="bg-[#333333] rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Problemas comuns:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><span className="font-medium">Erro de CORS</span>: Verifique se o frontend está acessando a URL correta do backend.</li>
                    <li><span className="font-medium">Falha ao iniciar o servidor</span>: Verifique se todas as dependências estão instaladas.</li>
                    <li><span className="font-medium">Erro no processo de build</span>: Verifique o Java e o bundletool.</li>
                  </ul>
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button className="bg-[#0D6EFD] hover:bg-[#0D6EFD]/80">
                    <Terminal className="w-4 h-4 mr-2" />
                    Abrir Documentação Técnica
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
        
        <div className="mt-6 bg-[#2A2A2A] border border-playstore-separator rounded-lg shadow-md overflow-hidden p-6">
          <div className="flex items-start space-x-3">
            <FileText className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-medium">Exemplo de API Python</h2>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Um exemplo básico do arquivo main.py que implementa a API FastAPI:
              </p>
              <div className="bg-[#333333] rounded-md p-4 font-mono text-xs overflow-x-auto">
                <pre>{`from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/generate-aab")
async def generate_aab(
    config: dict = Form(...),
    apkFile: UploadFile = File(...),
    keyStoreFile: UploadFile = File(...)
):
    # Código para processar o AAB
    return {"buildId": "12345", "status": "PENDING"}

@app.get("/api/build/{build_id}")
async def get_build_status(build_id: str):
    # Código para obter o status do build
    return {"status": "PROCESSING", "progress": 50}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
`}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrucoesPython;
