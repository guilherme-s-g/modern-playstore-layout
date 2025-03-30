
@echo off
REM Script para iniciar o backend Python no Windows

REM Verificar se o Python está instalado
python --version > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Python nao esta instalado. Por favor, instale o Python 3.7 ou superior.
    exit /b 1
)

REM Mudar para o diretório do backend
cd "%~dp0src\backend"

REM Criar ambiente virtual (opcional)
if not exist venv (
    echo Criando ambiente virtual...
    python -m venv venv
)

REM Ativar ambiente virtual (opcional)
if exist venv (
    echo Ativando ambiente virtual...
    call venv\Scripts\activate.bat
)

REM Instalar dependências
echo Instalando dependencias...
pip install -r requirements.txt

REM Criar diretório de uploads se não existir
if not exist uploads mkdir uploads

REM Iniciar o servidor
echo Iniciando o servidor FastAPI em http://localhost:8000...
python main.py
pause
