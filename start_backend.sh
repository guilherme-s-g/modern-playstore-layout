
#!/bin/bash
# Script para iniciar o backend Python

# Verificar se o Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "Python 3 não está instalado. Por favor, instale o Python 3.7 ou superior."
    exit 1
fi

# Verificar se o pip está instalado
if ! command -v pip &> /dev/null; then
    echo "pip não está instalado. Por favor, instale o pip."
    exit 1
fi

# Mudar para o diretório do backend
cd "$(dirname "$0")/src/backend"

# Criar ambiente virtual (opcional)
if [ ! -d "venv" ]; then
    echo "Criando ambiente virtual..."
    python3 -m venv venv
fi

# Ativar ambiente virtual (opcional)
if [ -d "venv" ]; then
    echo "Ativando ambiente virtual..."
    source venv/bin/activate
fi

# Instalar dependências
echo "Instalando dependências..."
pip install -r requirements.txt

# Criar diretório de uploads se não existir
mkdir -p uploads

# Iniciar o servidor
echo "Iniciando o servidor FastAPI em http://localhost:8000..."
python3 main.py
