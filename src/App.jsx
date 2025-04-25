import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import DoctorProfile from './components/DoctorProfile';
import './App.css';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    consultationType: '', // 'video' or 'clinic'
    specialties: [],
    sortBy: ''
  });

  const transformDoctorData = useCallback((data) => {
    return data.map(doctor => ({
      id: doctor.id,
      name: doctor.name,
      image: doctor.photo,
      specialties: doctor.specialities.map(s => s.name),
      fees: parseInt(doctor.fees.replace(/[^0-9]/g, '')), // Convert "₹ 500" to 500
      experience: parseInt(doctor.experience.split(' ')[0]), // Convert "13 Years of experience" to 13
      location: `${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`,
      clinicName: doctor.clinic.name,
      languages: doctor.languages,
      introduction: doctor.doctor_introduction,
      videoConsult: doctor.video_consult,
      inClinic: doctor.in_clinic,
      fullAddress: `${doctor.clinic.address.address_line1}, ${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`
    }));
  }, []);

  const fetchDoctors = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      const data = await response.json();
      const transformedData = transformDoctorData(data);
      setDoctors(transformedData);
      setFilteredDoctors(transformedData);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setDoctors([]);
      setFilteredDoctors([]);
    } finally {
      setIsLoading(false);
    }
  }, [transformDoctorData]);

  const applyFilters = useCallback(() => {
    let filtered = [...doctors];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialties.some(s => s.toLowerCase().includes(query)) ||
        doctor.clinicName.toLowerCase().includes(query) ||
        doctor.location.toLowerCase().includes(query)
      );
    }

    // Apply consultation type filter
    if (filters.consultationType === 'video') {
      filtered = filtered.filter(doctor => doctor.videoConsult);
    } else if (filters.consultationType === 'clinic') {
      filtered = filtered.filter(doctor => doctor.inClinic);
    }

    // Apply specialty filters
    if (filters.specialties.length > 0) {
      filtered = filtered.filter(doctor =>
        doctor.specialties.some(specialty => 
          filters.specialties.includes(specialty)
        )
      );
    }

    // Apply sorting
    if (filters.sortBy === 'fees') {
      filtered.sort((a, b) => a.fees - b.fees);
    } else if (filters.sortBy === 'experience') {
      filtered.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(filtered);
    updateQueryParams();
  }, [doctors, filters, searchQuery]);

  const updateQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (filters.consultationType) params.set('type', filters.consultationType);
    if (filters.specialties.length) params.set('specialties', filters.specialties.join(','));
    if (filters.sortBy) params.set('sort', filters.sortBy);
    
    window.history.pushState({}, '', `?${params.toString()}`);
  }, [searchQuery, filters]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  
  const allSpecialties = [...new Set(doctors.flatMap(doctor => doctor.specialties))];

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1>Connecting you to trusted care!</h1>
            <p>find the right doctor, right when you need them!</p>
          </div>
        </header>
        <Routes>
          <Route path="/" element={
            <>
              <SearchBar onSearch={handleSearch} doctors={doctors} />
              <div className="main-content">
                <FilterPanel 
                  filters={filters} 
                  onFilterChange={handleFilterChange}
                  availableSpecialties={allSpecialties}
                />
                <DoctorList doctors={filteredDoctors} isLoading={isLoading} />
              </div>
            </>
          } />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 