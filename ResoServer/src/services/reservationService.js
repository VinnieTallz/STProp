// In-memory storage for simplicity
let reservations = [
  {
    id: 1,
    customerName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    date: '2025-02-15',
    time: '19:00',
    partySize: 4,
    specialRequests: 'Window table preferred',
    status: 'confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1-555-0456',
    date: '2025-02-16',
    time: '20:00',
    partySize: 2,
    specialRequests: '',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

class ReservationService {
  getAllReservations() {
    return reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getReservationById(id) {
    return reservations.find(reservation => reservation.id === id);
  }

  createReservation(reservationData) {
    const newReservation = {
      id: nextId++,
      ...reservationData,
      status: reservationData.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    reservations.push(newReservation);
    return newReservation;
  }

  updateReservation(id, updateData) {
    const index = reservations.findIndex(reservation => reservation.id === id);
    
    if (index === -1) {
      return null;
    }

    reservations[index] = {
      ...reservations[index],
      ...updateData,
      id: reservations[index].id, // Ensure ID doesn't change
      createdAt: reservations[index].createdAt, // Preserve creation date
      updatedAt: new Date().toISOString()
    };

    return reservations[index];
  }

  deleteReservation(id) {
    const index = reservations.findIndex(reservation => reservation.id === id);
    
    if (index === -1) {
      return false;
    }

    reservations.splice(index, 1);
    return true;
  }

  // Utility method to get reservations by status
  getReservationsByStatus(status) {
    return reservations.filter(reservation => reservation.status === status);
  }

  // Utility method to get reservations by date
  getReservationsByDate(date) {
    return reservations.filter(reservation => reservation.date === date);
  }
}

module.exports = new ReservationService();