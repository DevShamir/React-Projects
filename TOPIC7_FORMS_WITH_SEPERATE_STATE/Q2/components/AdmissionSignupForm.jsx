import React, { useState } from 'react';

const AdmissionSignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    cnic: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    religion: '',
    nationality: 'Pakistani',
    
    email: '',
    mobile: '',
    guardianMobile: '',
    address: '',
    domicile: '',
    
    matricBoard: '',
    matricYear: '',
    matricPercentage: '',
    interGroup: '',
    interStatus: 'HSC-II Passed',
    interPercentage: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    const mobileRegex = /^03\d{2}-\d{7}$/;

    if (formData.fullName.trim().length < 3) {
      tempErrors.fullName = "Full name must be at least 3 characters.";
    }
    if (formData.fatherName.trim().length < 3) {
      tempErrors.fatherName = "Father's name is required.";
    }
    if (!cnicRegex.test(formData.cnic)) {
      tempErrors.cnic = "Required format: XXXXX-XXXXXXX-X";
    }
    if (!mobileRegex.test(formData.mobile)) {
      tempErrors.mobile = "Required format: 03XX-XXXXXXX";
    }
    if (formData.guardianMobile && !mobileRegex.test(formData.guardianMobile)) {
      tempErrors.guardianMobile = "Required format: 03XX-XXXXXXX";
    }
    if (!formData.dob) {
      tempErrors.dob = "Date of Birth is required.";
    }
    
    const matricPerc = parseFloat(formData.matricPercentage);
    if (!formData.matricPercentage || matricPerc > 100 || matricPerc < 0) {
      tempErrors.matricPercentage = "Enter a valid percentage (0-100).";
    }

    const interPerc = parseFloat(formData.interPercentage);
    if (!formData.interPercentage || interPerc > 100 || interPerc < 0) {
      tempErrors.interPercentage = "Enter a valid percentage (0-100).";
    }

    if (!formData.matricBoard) tempErrors.matricBoard = "Please select a board.";
    if (!formData.interGroup) tempErrors.interGroup = "Please select a group.";
    if (!formData.domicile) tempErrors.domicile = "Please select a domicile district.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Admission Data Submitted:", formData);
      alert("Registration Successful! Check your email for the Admission Portal password.");
    } else {
      console.log("Validation Failed", errors);
    }
  };

  return (
    <div className="admission-container">
      <div className="neumorphic-card wide-card">
        <header className="form-header">
          <img 
            src="/src/assets/nedlogo.png" 
            alt="NED Logo" 
            className="uni-logo" 
          /> 
          <h1 className="red-title">NED UNIVERSITY</h1>
          <p className="subtitle">Undergraduate Admission Registration 2026</p>
        </header>

        <form onSubmit={handleSubmit} className="multi-column-form">
          
          {/* SECTION 1: Personal Information */}
          <h3 className="section-divider">Personal Information</h3>
          <div className="form-grid">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={errors.fullName ? 'error-border' : ''} placeholder="As per Matric Certificate" required />
              {errors.fullName && <span className="err-msg">{errors.fullName}</span>}
            </div>

            <div className="input-group">
              <label>Father's Name</label>
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className={errors.fatherName ? 'error-border' : ''} placeholder="Father / Guardian Name" required />
              {errors.fatherName && <span className="err-msg">{errors.fatherName}</span>}
            </div>

            <div className="input-group">
              <label>CNIC / B-Form</label>
              <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} className={errors.cnic ? 'error-border' : ''} placeholder="42101-XXXXXXX-X" required />
              {errors.cnic && <span className="err-msg">{errors.cnic}</span>}
            </div>

            <div className="input-group">
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={errors.dob ? 'error-border' : ''} required />
              {errors.dob && <span className="err-msg">{errors.dob}</span>}
            </div>
            
            <div className="input-group">
              <label>Religion</label>
              <select name="religion" value={formData.religion} onChange={handleChange} required>
                <option value="" disabled>Select Religion</option>
                <option value="Islam">Islam</option>
                <option value="Christianity">Christianity</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Blood Group</label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                <option value="" disabled>Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="Other">Other (Negative)</option>
              </select>
            </div>
          </div>

          <h3 className="section-divider">Academic Background</h3>
          <div className="form-grid">
            <div className="input-group">
              <label>Matric/O-Level Board</label>
              <select name="matricBoard" value={formData.matricBoard} onChange={handleChange} className={errors.matricBoard ? 'error-border' : ''} required>
                <option value="" disabled>Select Board</option>
                <option value="Karachi">BSEK Karachi</option>
                <option value="Federal">FBISE Federal</option>
                <option value="Cambridge">Cambridge / Edexcel</option>
                <option value="Other">Other Board</option>
              </select>
              {errors.matricBoard && <span className="err-msg">{errors.matricBoard}</span>}
            </div>

            <div className="input-group">
              <label>Matric Percentage (%)</label>
              <input type="number" name="matricPercentage" value={formData.matricPercentage} onChange={handleChange} step="0.01" className={errors.matricPercentage ? 'error-border' : ''} placeholder="e.g. 85.50" required />
              {errors.matricPercentage && <span className="err-msg">{errors.matricPercentage}</span>}
            </div>

            <div className="input-group">
              <label>Intermediate Group</label>
              <select name="interGroup" value={formData.interGroup} onChange={handleChange} className={errors.interGroup ? 'error-border' : ''} required>
                <option value="" disabled>Select Group</option>
                <option value="Pre-Engineering">Pre-Engineering</option>
                <option value="Pre-Medical">Pre-Medical</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Commerce">Commerce</option>
              </select>
              {errors.interGroup && <span className="err-msg">{errors.interGroup}</span>}
            </div>

            <div className="input-group">
              <label>HSC-II Percentage (Actual/Expected %)</label>
              <input type="number" name="interPercentage" value={formData.interPercentage} onChange={handleChange} step="0.01" className={errors.interPercentage ? 'error-border' : ''} placeholder="e.g. 78.50" required />
              {errors.interPercentage && <span className="err-msg">{errors.interPercentage}</span>}
            </div>
          </div>

          <h3 className="section-divider">Contact & Domicile</h3>
          
          <div className="form-grid">
            <div className="input-group">
              <label>Candidate Mobile Number</label>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className={errors.mobile ? 'error-border' : ''} placeholder="03XX-XXXXXXX" required />
              {errors.mobile && <span className="err-msg">{errors.mobile}</span>}
            </div>

            <div className="input-group">
              <label>Guardian Mobile Number</label>
              <input type="tel" name="guardianMobile" value={formData.guardianMobile} onChange={handleChange} className={errors.guardianMobile ? 'error-border' : ''} placeholder="03XX-XXXXXXX" required />
              {errors.guardianMobile && <span className="err-msg">{errors.guardianMobile}</span>}
            </div>
          </div>

          <div className="form-grid full-width" style={{ marginTop: '25px' }}>
             <div className="input-group">
              <label>Complete Mailing Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="House, Street, Area, City" required />
            </div>
          </div>

          <div className="form-grid" style={{ marginTop: '25px' }}>
            <div className="input-group">
              <label>District of Domicile / PRC</label>
              <select name="domicile" value={formData.domicile} onChange={handleChange} className={errors.domicile ? 'error-border' : ''} required>
                <option value="" disabled>Select District</option>
                <option value="Karachi Central">Karachi Central</option>
                <option value="Karachi East">Karachi East</option>
                <option value="Karachi South">Karachi South</option>
                <option value="Karachi West">Karachi West</option>
                <option value="Korangi">Korangi</option>
                <option value="Malir">Malir</option>
                <option value="Sindh Interior">Sindh (Other Districts)</option>
              </select>
              {errors.domicile && <span className="err-msg">{errors.domicile}</span>}
            </div>
          </div>

          <button type="submit" className="submit-btn-ned">
            Verify & Register for Entry Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdmissionSignupForm;