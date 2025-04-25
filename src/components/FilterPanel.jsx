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
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 