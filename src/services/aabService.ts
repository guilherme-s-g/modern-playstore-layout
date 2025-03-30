
// Serviço para interagir com o backend de geração de AAB

const API_BASE_URL = 'http://localhost:8000/api';

export interface BuildConfig {
  appName: string;
  packageName: string;
  versionName: string;
  versionCode: number;
  keyAlias: string;
  keyPassword?: string;
  storePassword?: string;
  minSdk?: number;
  targetSdk?: number;
  buildToolsVersion?: string;
}

export interface BuildStatus {
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress: number;
  logs: Array<{ timestamp: string; message: string }>;
  error?: string;
  aabPath?: string;
}

export interface BuildSummary {
  id: string;
  status: string;
  progress: number;
  startTime: string;
  appName: string;
}

// Iniciar um novo processo de build
export async function startBuild(
  config: BuildConfig, 
  apkFile: File, 
  keyStoreFile: File
): Promise<{ buildId: string }> {
  const formData = new FormData();
  
  // Adicionar arquivos
  formData.append('apkFile', apkFile);
  formData.append('keyStoreFile', keyStoreFile);
  
  // Adicionar configuração
  formData.append('config', JSON.stringify(config));
  
  const response = await fetch(`${API_BASE_URL}/generate-aab`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao iniciar o processo de geração de AAB');
  }
  
  return response.json();
}

// Obter status de um build específico
export async function getBuildStatus(buildId: string): Promise<BuildStatus> {
  const response = await fetch(`${API_BASE_URL}/build/${buildId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao obter status do build');
  }
  
  return response.json();
}

// Obter lista de builds
export async function getBuilds(): Promise<{ builds: BuildSummary[] }> {
  const response = await fetch(`${API_BASE_URL}/builds`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao obter lista de builds');
  }
  
  return response.json();
}

// Excluir um build
export async function deleteBuild(buildId: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/build/${buildId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Erro ao excluir build');
  }
  
  return response.json();
}
