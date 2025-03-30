
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import shutil
import subprocess
import uuid
import time
from datetime import datetime

app = FastAPI(title="Play Store Publisher API")

# Adicionar middleware CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, restrinja para o domínio da sua aplicação
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Diretório para armazenar arquivos temporários
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Manter registro dos processos de build
build_processes = {}

class BuildConfig(BaseModel):
    appName: str
    packageName: str
    versionName: str
    versionCode: int
    keyAlias: str
    keyPassword: Optional[str] = None
    storePassword: Optional[str] = None
    minSdk: Optional[int] = 21
    targetSdk: Optional[int] = 33
    buildToolsVersion: Optional[str] = "33.0.0"

@app.get("/")
async def root():
    return {"message": "Play Store Publisher API"}

@app.post("/api/generate-aab")
async def generate_aab(
    background_tasks: BackgroundTasks,
    config: BuildConfig = Form(...),
    apkFile: UploadFile = File(...),
    keyStoreFile: UploadFile = File(...)
):
    # Criar ID único para o build
    build_id = str(uuid.uuid4())
    build_dir = os.path.join(UPLOAD_DIR, build_id)
    os.makedirs(build_dir, exist_ok=True)
    
    # Salvar os arquivos enviados
    apk_path = os.path.join(build_dir, "app.apk")
    keystore_path = os.path.join(build_dir, "keystore.jks")
    
    try:
        # Salvar o APK
        with open(apk_path, "wb") as f:
            shutil.copyfileobj(apkFile.file, f)
        
        # Salvar o KeyStore
        with open(keystore_path, "wb") as f:
            shutil.copyfileobj(keyStoreFile.file, f)
        
        # Registrar o processo
        build_processes[build_id] = {
            "status": "PENDING",
            "logs": [],
            "config": config.dict(),
            "startTime": datetime.now().isoformat(),
            "progress": 0
        }
        
        # Iniciar a geração de AAB em segundo plano
        background_tasks.add_task(
            process_aab_generation,
            build_id, 
            build_dir,
            apk_path,
            keystore_path,
            config
        )
        
        return {"buildId": build_id, "status": "PENDING"}
    
    except Exception as e:
        # Limpar arquivos em caso de erro
        shutil.rmtree(build_dir, ignore_errors=True)
        raise HTTPException(status_code=500, detail=str(e))

def process_aab_generation(build_id, build_dir, apk_path, keystore_path, config):
    try:
        build_processes[build_id]["status"] = "PROCESSING"
        add_log(build_id, "Iniciando processo de geração de AAB")
        add_log(build_id, f"Configuração: {config.dict()}")
        
        # Simulando as etapas do processo de build
        update_progress(build_id, 10)
        add_log(build_id, "Verificando arquivos...")
        time.sleep(1)  # Simulando processamento
        
        update_progress(build_id, 20)
        add_log(build_id, "Descompactando APK...")
        time.sleep(1)  # Simulando processamento
        
        update_progress(build_id, 40)
        add_log(build_id, "Otimizando recursos...")
        time.sleep(1)  # Simulando processamento
        
        update_progress(build_id, 60)
        add_log(build_id, "Gerando AAB...")
        time.sleep(2)  # Simulando processamento
        
        update_progress(build_id, 80)
        add_log(build_id, "Assinando pacote com keystore...")
        time.sleep(1)  # Simulando processamento
        
        # Em uma implementação real, aqui você executaria o comando bundletool
        # Exemplo:
        # cmd = [
        #    "java", "-jar", "bundletool.jar", "build-bundle",
        #    "--modules=app.apk", "--output=app.aab",
        #    f"--ks={keystore_path}", f"--ks-key-alias={config.keyAlias}",
        #    f"--ks-pass=pass:{config.keyPassword}", f"--key-pass=pass:{config.storePassword}"
        # ]
        # subprocess.run(cmd, check=True)
        
        # Caminho do AAB gerado (na implementação real)
        aab_path = os.path.join(build_dir, "app.aab")
        
        # Simular criação do arquivo para este exemplo
        with open(aab_path, "w") as f:
            f.write("Simulação de AAB")
        
        update_progress(build_id, 100)
        add_log(build_id, "AAB gerado com sucesso!")
        build_processes[build_id]["status"] = "COMPLETED"
        build_processes[build_id]["aabPath"] = aab_path
        
    except Exception as e:
        add_log(build_id, f"Erro: {str(e)}")
        build_processes[build_id]["status"] = "FAILED"
        build_processes[build_id]["error"] = str(e)

def add_log(build_id, message):
    timestamp = datetime.now().isoformat()
    log_entry = {"timestamp": timestamp, "message": message}
    build_processes[build_id]["logs"].append(log_entry)

def update_progress(build_id, progress):
    build_processes[build_id]["progress"] = progress

@app.get("/api/build/{build_id}")
async def get_build_status(build_id: str):
    if build_id not in build_processes:
        raise HTTPException(status_code=404, detail="Build não encontrado")
    
    return build_processes[build_id]

@app.get("/api/builds")
async def list_builds():
    return {
        "builds": [
            {
                "id": build_id,
                "status": build_info["status"],
                "progress": build_info["progress"],
                "startTime": build_info["startTime"],
                "appName": build_info["config"]["appName"]
            }
            for build_id, build_info in build_processes.items()
        ]
    }

@app.delete("/api/build/{build_id}")
async def delete_build(build_id: str):
    if build_id not in build_processes:
        raise HTTPException(status_code=404, detail="Build não encontrado")
    
    # Remover diretório associado ao build
    build_dir = os.path.join(UPLOAD_DIR, build_id)
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir, ignore_errors=True)
    
    # Remover registro do build
    del build_processes[build_id]
    
    return {"message": "Build removido com sucesso"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
