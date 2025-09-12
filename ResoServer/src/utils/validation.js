function validateReservation(data, isUpdate = false) {
  const errors = [];

  // Required fields (unless it's an update)
  if (!isUpdate || data.customerName !== undefined) {
    if (!data.customerName || typeof data.customerName !== 'string' || data.customerName.trim().length < 2) {
      errors.push('Customer name is required and must be at least 2 characters long');
    }
  }

  if (!isUpdate || data.email !== undefined) {
    if (!data.email || typeof data.email !== 'string') {
      errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
      errors.push('Email must be a valid email address');
    }
  }

  if (!isUpdate || data.phone !== undefined) {
    if (!data.phone || typeof data.phone !== 'string') {
      errors.push('Phone number is required');
    } else if (!isValidPhone(data.phone)) {
      errors.push('Phone number must be a valid format');
    }
  }

  if (!isUpdate || data.date !== undefined) {
    if (!data.date || typeof data.date !== 'string') {
      errors.push('Date is required');
    } else if (!isValidDate(data.date)) {
      errors.push('Date must be in YYYY-MM-DD format and in the future');
    }
  }

  if (!isUpdate || data.time !== undefined) {
    if (!data.time || typeof data.time !== 'string') {
      errors.push('Time is required');
    } else if (!isValidTime(data.time)) {
      errors.push('Time must be in HH:MM format (24-hour)');
    }
  }

  if (!isUpdate || data.partySize !== undefined) {
    if (!data.partySize || typeof data.partySize !== 'number' || data.partySize < 1 || data.partySize > 20) {
      errors.push('Party size must be a number between 1 and 20');
    }
  }

  // Optional fields validation
  if (data.status !== undefined) {
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(data.status)) {
      errors.push('Status must be one of: pending, confirmed, cancelled, completed');
    }
  }

  if (data.specialRequests !== undefined && typeof data.specialRequests !== 'string') {
    errors.push('Special requests must be a string');
  }

  return errors.length > 0 ? errors.join('; ') : null;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Basic phone validation - allows various formats
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

function isValidDate(date) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return false;
  }
  
  const reservationDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return reservationDate >= today;
}

function isValidTime(time) {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

module.exports = {
  validateReservation,
  isValidEmail,
  isValidPhone,
  isValidDate,
  isValidTime
};