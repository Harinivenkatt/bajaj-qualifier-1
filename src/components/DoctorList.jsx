import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorList.css';

const LoadingSkeleton = () => (
  <div className="doctor-card is-loading">
    <div className="doctor-image skeleton"></div>
    <div className="doctor-info">
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="doctor-details">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  </div>
);

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/doctor/${doctor.id}`);
  };

  return (
    <div 
      data-testid="doctor-card" 
      className="doctor-card"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="doctor-image">
        <img src={doctor.image || 'default-avatar.png'} alt={doctor.name} />
      </div>
      <div className="doctor-info">
        <h2 data-testid="doctor-name">{doctor.name}</h2>
        <p data-testid="doctor-specialty" className="specialty">
          <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          {doctor.specialties.join(', ')}
        </p>
        <p data-testid="doctor-experience" className="experience">
          <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {doctor.experience} Years of experience
        </p>
        <div className="doctor-languages">
          <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          {doctor.languages.join(', ')}
        </div>
        <div className="doctor-location">
          <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div className="location-details">
            <span className="clinic-name">{doctor.clinicName}</span>
            <span className="address">{doctor.fullAddress}</span>
          </div>
        </div>
        <div className="doctor-details">
          <div className="consultation-types">
            {doctor.videoConsult && (
              <span className="consultation-badge video">
                <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Video Consult
              </span>
            )}
            {doctor.inClinic && (
              <span className="consultation-badge clinic">
                <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                In-Clinic
              </span>
            )}
          </div>
          <span data-testid="doctor-fee" className="fee">
            <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ₹{doctor.fees}
          </span>
          <button className="book-appointment">
            Book Appointment
            <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const DoctorList = ({ doctors, isLoading }) => {
  if (isLoading) {
    return (
      <div className="doctor-list">
        {[...Array(3)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="doctor-list">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
      {(!doctors || doctors.length === 0) && !isLoading && (
        <div className="no-results">
          <svg viewBox="0 0 24 24" className="icon large" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No doctors found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default DoctorList; 