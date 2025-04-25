import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        const data = await response.json();
        const doctorData = data.find(doc => doc.id === id);
        if (doctorData) {
          setDoctor(doctorData);
        } else {
          setError('Doctor not found');
        }
      } catch (err) {
        setError('Failed to fetch doctor details');
        console.error('Error fetching doctor details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="loading-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-content"></div>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="profile-error">
        <svg viewBox="0 0 24 24" className="error-icon" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2>{error || 'Doctor not found'}</h2>
        <button onClick={handleBack} className="back-button">
          Return to Home
        </button>
      </div>
    );
  }

  // Extract experience years from string
  const experienceYears = doctor.experience.split(' ')[0];

  return (
    <div className="doctor-profile">
      <button onClick={handleBack} className="back-link">
        <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Doctors List
      </button>

      <div className="profile-header">
        <div className="profile-image">
          <img src={doctor.photo} alt={doctor.name} />
        </div>
        <div className="profile-info">
          <h1>{doctor.name}</h1>
          <div className="specialties">
            {doctor.specialities.map((specialty, index) => (
              <span key={index} className="specialty-badge">
                {specialty.name}
              </span>
            ))}
          </div>
          <div className="doctor-meta">
            <span className="experience">
              <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {experienceYears} Years Experience
            </span>
            <span className="languages">
              <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {doctor.languages.join(', ')}
            </span>
          </div>
        </div>
        <div className="profile-actions">
          {doctor.video_consult && (
            <button className="primary-button">
              <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Book Video Consultation
            </button>
          )}
          {doctor.in_clinic && (
            <button className="secondary-button">
              <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Book Clinic Visit
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        {doctor.doctor_introduction && (
          <div className="profile-section">
            <h2>About</h2>
            <p>{doctor.doctor_introduction}</p>
          </div>
        )}

        <div className="profile-section">
          <h2>Practice Details</h2>
          <div className="practice-details">
            <div className="detail-item">
              <h3>Experience</h3>
              <p>{doctor.experience}</p>
            </div>
            <div className="detail-item">
              <h3>Consultation Fee</h3>
              <p>{doctor.fees}</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Clinic Information</h2>
          <div className="clinic-details">
            <div className="clinic-info">
              <h3>{doctor.clinic.name}</h3>
              <p>{doctor.clinic.address.address_line1}</p>
              <p>{doctor.clinic.address.locality}, {doctor.clinic.address.city}</p>
              {doctor.clinic.logo_url && (
                <img 
                  src={doctor.clinic.logo_url} 
                  alt={doctor.clinic.name} 
                  className="clinic-logo"
                />
              )}
            </div>
            {doctor.clinic.address.location && (
              <div className="clinic-map">
                <div className="map-placeholder">
                  <svg viewBox="0 0 24 24" className="map-icon" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>View on Map</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>Consultation Options</h2>
          <div className="consultation-details">
            {doctor.video_consult && (
              <div className="consultation-type">
                <h3>Video Consultation</h3>
                <p>Available</p>
                <span className="fee">{doctor.fees}</span>
              </div>
            )}
            {doctor.in_clinic && (
              <div className="consultation-type">
                <h3>In-Clinic Consultation</h3>
                <p>Available</p>
                <span className="fee">{doctor.fees}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile; 