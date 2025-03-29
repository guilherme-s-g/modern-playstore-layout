
import React, { useState } from 'react';
import FormField from './FormField';
import FileSelector from './FileSelector';
import { Check, X, Info } from 'lucide-react';

const FilesCredentialsForm = () => {
  const [appFile, setAppFile] = useState<File | null>(null);
  const [credentialsFile, setCredentialsFile] = useState<File | null>(null);
  const [appInfo, setAppInfo] = useState({
    versionCode: '-',
    versionName: '-',
    minSdk: '-',
    targetSdk: '-'
  });
  const [credentialsInfo, setCredentialsInfo] = useState({
    projectId: '-',
    clientEmail: '-',
    tokenUri: '-'
  });
  
  const [declarations, setDeclarations] = useState({
    containsAds: false,
    sensitivePermissions: false,
    isNewsApp: false
  });
  
  const [permissions, setPermissions] = useState('');
  
  const handleDeclarationChange = (name: keyof typeof declarations) => {
    setDeclarations(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  const handlePermissionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPermissions(e.target.value);
  };
  
  const handleAppFileSelect = (file: File) => {
    setAppFile(file);
    // Simulação de extração de dados do arquivo
    setTimeout(() => {
      setAppInfo({
        versionCode: '12',
        versionName: '1.2.0',
        minSdk: '21',
        targetSdk: '33'
      });
    }, 500);
  };
  
  const handleCredentialsFileSelect = (file: File) => {
    setCredentialsFile(file);
    // Simulação de extração de dados do arquivo
    setTimeout(() => {
      setCredentialsInfo({
        projectId: 'projeto-exemplo-123456',
        clientEmail: 'service-account@projeto-exemplo.iam.gserviceaccount.com',
        tokenUri: 'https://oauth2.googleapis.com/token'
      });
    }, 500);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <FileSelector
            label="Arquivo APK/AAB"
            placeholder="Selecione o arquivo do aplicativo"
            onSelect={handleAppFileSelect}
            selectedFile={appFile}
            accept=".apk,.aab"
            required
          />
          
          {appFile && (
            <div className="bg-card p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Informações do Aplicativo
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version Code:</span>
                  <span>{appInfo.versionCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version Name:</span>
                  <span>{appInfo.versionName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min SDK:</span>
                  <span>{appInfo.minSdk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target SDK:</span>
                  <span>{appInfo.targetSdk}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <FileSelector
            label="Credenciais Google Cloud"
            placeholder="Selecione o arquivo JSON de credenciais"
            onSelect={handleCredentialsFileSelect}
            selectedFile={credentialsFile}
            accept=".json"
            required
          />
          
          {credentialsFile && (
            <div className="bg-card p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Informações das Credenciais
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Project ID:</span>
                  <span className="truncate max-w-[200px]">{credentialsInfo.projectId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Client Email:</span>
                  <span className="truncate max-w-[200px]">{credentialsInfo.clientEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token URI:</span>
                  <span className="truncate max-w-[200px]">{credentialsInfo.tokenUri}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-base font-medium mb-3">Declarações</h3>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="containsAds"
                type="checkbox"
                checked={declarations.containsAds}
                onChange={() => handleDeclarationChange('containsAds')}
                className="h-4 w-4 rounded border-border focus:ring-playstore-blue"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="containsAds" className="font-medium">Este app contém anúncios</label>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="sensitivePermissions"
                type="checkbox"
                checked={declarations.sensitivePermissions}
                onChange={() => handleDeclarationChange('sensitivePermissions')}
                className="h-4 w-4 rounded border-border focus:ring-playstore-blue"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="sensitivePermissions" className="font-medium">Este app usa permissões sensíveis</label>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="isNewsApp"
                type="checkbox"
                checked={declarations.isNewsApp}
                onChange={() => handleDeclarationChange('isNewsApp')}
                className="h-4 w-4 rounded border-border focus:ring-playstore-blue"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="isNewsApp" className="font-medium">Este é um app de notícias</label>
            </div>
          </div>
        </div>
      </div>
      
      {declarations.sensitivePermissions && (
        <div className="mt-4">
          <FormField
            label="Liste as permissões sensíveis (uma por linha)"
          >
            <textarea
              value={permissions}
              onChange={handlePermissionsChange}
              className="form-field min-h-[100px]"
              placeholder="Ex: ACCESS_FINE_LOCATION&#10;READ_CONTACTS"
            />
          </FormField>
        </div>
      )}
    </div>
  );
};

export default FilesCredentialsForm;
