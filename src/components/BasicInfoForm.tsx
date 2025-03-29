
import React, { useState } from 'react';
import FormField from './FormField';

const BasicInfoForm = () => {
  const [formData, setFormData] = useState({
    packageName: '',
    appTitle: '',
    shortDescription: '',
    fullDescription: '',
    category: '',
    contentRating: '',
    privacyPolicyUrl: '',
    releaseNotes: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const categories = [
    "Arte e Design",
    "Automóveis e Veículos",
    "Beleza",
    "Bibliotecas e Demonstrações",
    "Casa e Decoração",
    "Compras",
    "Comunicação",
    "Educação",
    "Entretenimento",
    "Esportes",
    "Estilo de Vida",
    "Ferramentas",
    "Finanças",
    "Fotografia",
    "Gastronomia",
    "Jogos",
    "Livros e Referências",
    "Mapas e Navegação",
    "Música e Áudio",
    "Negócios",
    "Notícias e Revistas",
    "Personalização",
    "Produtividade",
    "Saúde e Fitness",
    "Social",
    "Viagens e Local",
    "Vídeo Players e Editores",
    "Clima",
  ];
  
  const contentRatings = [
    "Classificação Livre",
    "10+",
    "12+",
    "14+",
    "16+",
    "18+"
  ];
  
  return (
    <div className="animate-fade-in">
      <FormField 
        label="Package Name"
        hint="Formato: com.empresa.app"
        required
      >
        <input
          type="text"
          name="packageName"
          value={formData.packageName}
          onChange={handleChange}
          className="form-field"
          placeholder="com.exemplo.app"
        />
      </FormField>
      
      <FormField 
        label="Título do App"
        maxLength={30}
        currentLength={formData.appTitle.length}
        required
      >
        <input
          type="text"
          name="appTitle"
          value={formData.appTitle}
          onChange={handleChange}
          className="form-field"
          placeholder="Nome do seu aplicativo"
          maxLength={30}
        />
      </FormField>
      
      <FormField 
        label="Descrição Curta"
        maxLength={80}
        currentLength={formData.shortDescription.length}
        required
      >
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          className="form-field min-h-[80px]"
          placeholder="Uma breve descrição do seu app..."
          maxLength={80}
        />
      </FormField>
      
      <FormField 
        label="Descrição Completa"
        maxLength={4000}
        currentLength={formData.fullDescription.length}
        required
      >
        <textarea
          name="fullDescription"
          value={formData.fullDescription}
          onChange={handleChange}
          className="form-field min-h-[200px]"
          placeholder="Descrição completa do seu app..."
          maxLength={4000}
        />
      </FormField>
      
      <FormField 
        label="Categoria"
        required
      >
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-field"
        >
          <option value="">Selecione uma categoria</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </FormField>
      
      <FormField 
        label="Classificação Etária"
        required
      >
        <select
          name="contentRating"
          value={formData.contentRating}
          onChange={handleChange}
          className="form-field"
        >
          <option value="">Selecione uma classificação</option>
          {contentRatings.map(rating => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </FormField>
      
      <FormField 
        label="URL da Política de Privacidade"
        required
      >
        <input
          type="url"
          name="privacyPolicyUrl"
          value={formData.privacyPolicyUrl}
          onChange={handleChange}
          className="form-field"
          placeholder="https://exemplo.com/privacidade"
        />
      </FormField>
      
      <FormField 
        label="Novidades da Versão"
        maxLength={500}
        currentLength={formData.releaseNotes.length}
        required
      >
        <textarea
          name="releaseNotes"
          value={formData.releaseNotes}
          onChange={handleChange}
          className="form-field min-h-[120px]"
          placeholder="O que há de novo nesta versão?"
          maxLength={500}
        />
      </FormField>
    </div>
  );
};

export default BasicInfoForm;
