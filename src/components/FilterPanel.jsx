import React from 'react';
import './FilterPanel.css';

const specialties = [
  'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician',
  'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist',
  'Physiotherapist', 'Endocrinologist', 'Orthopaedic', 'Ophthalmologist',
  'Gastroenterologist', 'Pulmonologist', 'Psychiatrist', 'Urologist',
  'Dietitian-Nutritionist', 'Psychologist', 'Sexologist', 'Nephrologist',
  'Neurologist', 'Oncologist', 'Ayurveda', 'Homeopath'
];

const languages = ['English', 'Hindi', 'Marathi', 'Gujarati', 'Bengali', 'Tamil', 'Telugu', 'Kannada'];

const experienceRanges = [
  { label: '0-5 years', min: 0, max: 5 },
  { label: '5-10 years', min: 5, max: 10 },
  { label: '10-15 years', min: 10, max: 15 },
  { label: '15+ years', min: 15, max: 100 }
];

const feesRanges = [
  { label: '₹0-500', min: 0, max: 500 },
  { label: '₹501-1000', min: 501, max: 1000 },
  { label: '₹1001-1500', min: 1001, max: 1500 },
  { label: '₹1500+', min: 1501, max: Infinity }
];

const availabilityOptions = [
  { label: 'Available Today', value: 'today' },
  { label: 'Available Tomorrow', value: 'tomorrow' },
  { label: 'Available This Week', value: 'week' }
];

const FilterPanel = ({ filters, onFilterChange }) => {
  const handleConsultationTypeChange = (type) => {
    onFilterChange({ ...filters, consultationType: type });
  };

  const handleSpecialtyChange = (specialty) => {
    const updatedSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    onFilterChange({ ...filters, specialties: updatedSpecialties });
  };

  const handleLanguageChange = (language) => {
    const updatedLanguages = filters.languages?.includes(language)
      ? filters.languages.filter(l => l !== language)
      : [...(filters.languages || []), language];
    onFilterChange({ ...filters, languages: updatedLanguages });
  };

  const handleExperienceChange = (min, max) => {
    onFilterChange({ ...filters, experience: { min, max } });
  };

  const handleFeesChange = (min, max) => {
    onFilterChange({ ...filters, fees: { min, max } });
  };

  const handleAvailabilityChange = (availability) => {
    onFilterChange({ ...filters, availability });
  };

  const handleSortChange = (sortBy) => {
    onFilterChange({ ...filters, sortBy });
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3 data-testid="filter-header-moc">Mode of Consultation</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={filters.consultationType === 'video'}
              onChange={() => handleConsultationTypeChange('video')}
            />
            Video Consultation
          </label>
          <label>
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={filters.consultationType === 'clinic'}
              onChange={() => handleConsultationTypeChange('clinic')}
            />
            In Clinic
          </label>
          <label>
            <input
              type="radio"
              checked={filters.consultationType === ''}
              onChange={() => handleConsultationTypeChange('')}
            />
            All
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3 data-testid="filter-header-speciality">Specialities</h3>
        <div className="checkbox-group">
          {specialties.map(specialty => (
            <label key={specialty}>
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty}`}
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
              />
              {specialty}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Languages</h3>
        <div className="checkbox-group">
          {languages.map(language => (
            <label key={language}>
              <input
                type="checkbox"
                checked={filters.languages?.includes(language)}
                onChange={() => handleLanguageChange(language)}
              />
              {language}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Experience</h3>
        <div className="radio-group">
          {experienceRanges.map(range => (
            <label key={range.label}>
              <input
                type="radio"
                checked={filters.experience?.min === range.min && filters.experience?.max === range.max}
                onChange={() => handleExperienceChange(range.min, range.max)}
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Consultation Fees</h3>
        <div className="radio-group">
          {feesRanges.map(range => (
            <label key={range.label}>
              <input
                type="radio"
                checked={filters.fees?.min === range.min && filters.fees?.max === range.max}
                onChange={() => handleFeesChange(range.min, range.max)}
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Availability</h3>
        <div className="radio-group">
          {availabilityOptions.map(option => (
            <label key={option.value}>
              <input
                type="radio"
                checked={filters.availability === option.value}
                onChange={() => handleAvailabilityChange(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 data-testid="filter-header-sort">Sort By</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              data-testid="sort-fees"
              checked={filters.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
            />
            Fees (Low to High)
          </label>
          <label>
            <input
              type="radio"
              data-testid="sort-experience"
              checked={filters.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
            />
            Experience (High to Low)
          </label>
          <label>
            <input
              type="radio"
              checked={filters.sortBy === ''}
              onChange={() => handleSortChange('')}
            />
            None
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 