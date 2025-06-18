import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMovie.css';
import 'swiper/css';

const AddMovie = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    videoUrl: '',
    videoFile: null
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est obligatoire';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La description est obligatoire';
    }
    if (formData.description.trim().length < 10) {
      newErrors.description = 'La description doit contenir au moins 10 caractères';
    }
    if (formData.releaseDate && new Date(formData.releaseDate) > new Date()) {
      newErrors.releaseDate = 'La date de sortie ne peut pas être dans le futur';
    }
    if (formData.videoUrl && !/^https?:\/\//.test(formData.videoUrl)) {
      newErrors.videoUrl = 'Veuillez entrer une URL valide (commençant par http:// ou https://)';
    }
    if (formData.videoFile && !formData.videoFile.type.startsWith('video/')) {
      newErrors.videoFile = 'Le fichier doit être une vidéo';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validateForm()) {
      setLoading(true);
      try {
        console.log('Film ajouté:', formData);
        if (formData.videoFile) {
          console.log('Fichier vidéo sélectionné:', formData.videoFile);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du film:', error);
        setSubmitError('Une erreur est survenue lors de l\'ajout du film.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'videoFile') {
      setFormData(prev => ({
        ...prev,
        videoFile: files[0] || null
      }));
      if (errors.videoFile) {
        setErrors(prev => ({ ...prev, videoFile: '' }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  return (
    <div className="page-content">
      <div className="common-page-wrapper">
        <h2>Ajouter un nouveau film</h2>
        {submitError && <div className="submit-error">{submitError}</div>}
        <form onSubmit={handleSubmit} className="add-movie-form">
          <div className="form-group">
            <label htmlFor="title">Titre *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
              placeholder="Entrez le titre du film"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
              placeholder="Entrez la description du film (minimum 10 caractères)"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="releaseDate">Date de sortie</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className={errors.releaseDate ? 'error' : ''}
            />
            {errors.releaseDate && <span className="error-message">{errors.releaseDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="videoUrl">Lien vidéo (YouTube, etc.)</label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className={errors.videoUrl ? 'error' : ''}
              placeholder="https://youtube.com/..."
            />
            {errors.videoUrl && <span className="error-message">{errors.videoUrl}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="videoFile">Fichier vidéo (local)</label>
            <input
              type="file"
              id="videoFile"
              name="videoFile"
              accept="video/*"
              onChange={handleChange}
              className={errors.videoFile ? 'error' : ''}
            />
            {errors.videoFile && <span className="error-message">{errors.videoFile}</span>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Ajout en cours...' : 'Ajouter le film'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie; 