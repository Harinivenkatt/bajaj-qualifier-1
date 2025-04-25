import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorList.css';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="doctor-card">
      <img 
        src={doctor.image} 
        alt={doctor.name} 
        className="doctor-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/100x100.png?text=Doctor';
        }}
      />
      <div className="doctor-info">
        <h2 className="doctor-name">{doctor.name}</h2>
        <div className="doctor-specialty">{doctor.specialties.join(' • ')}</div>
        <div className="doctor-experience">{doctor.experience} Years of experience</div>
        <div className="doctor-clinic">
          <span>{doctor.clinicName}</span>
          <span className="dot">•</span>
          <span>{doctor.location}</span>
        </div>
        <div className="consultation-types">
          {doctor.videoConsult && <span className="consultation-type">Video Consult</span>}
          {doctor.inClinic && <span className="consultation-type">In-Clinic</span>}
        </div>
      </div>
      <div className="doctor-actions">
        <div className="consultation-fee">₹ {doctor.fees}</div>
        <button 
          className="book-appointment-btn"
          onClick={() => navigate(`/doctor/${doctor.id}`)}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="doctor-card">
    <div className="doctor-image loading-skeleton"></div>
    <div className="doctor-info">
      <div className="doctor-name loading-skeleton" style={{ width: '60%', height: '24px' }}></div>
      <div className="doctor-specialty loading-skeleton" style={{ width: '80%', height: '18px' }}></div>
      <div className="doctor-experience loading-skeleton" style={{ width: '40%', height: '18px' }}></div>
      <div className="doctor-clinic loading-skeleton" style={{ width: '70%', height: '18px' }}></div>
    </div>
    <div className="doctor-actions">
      <div className="consultation-fee loading-skeleton" style={{ width: '80px', height: '24px' }}></div>
      <div className="book-appointment-btn loading-skeleton" style={{ width: '150px', height: '40px' }}></div>
    </div>
  </div>
);

const DoctorList = ({ doctors, isLoading }) => {
  if (isLoading) {
    return (
      <div className="doctor-list">
        {[1, 2, 3].map((i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="no-results">
        <h3>No doctors found</h3>
        <p>Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="doctor-list">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList; 