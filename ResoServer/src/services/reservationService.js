// In-memory storage for simplicity
let reservations = [
  {
    id: 1,
    reservation_id: "res01",
    property_id: "123456",
    property_address: "123 fake street",
    check_in_date: "2025-10-01T15:00:00Z",
    check_out_date: "2025-10-05T11:00:00Z"
  },
  {
    reservation_id: "res01",
    property_id: "123456",
    property_address: "123 fake street",
    check_in_date: "2025-10-01T15:00:00Z",
    check_out_date: "2025-10-05T11:00:00Z"
  }
];

let nextId = 3;

class ReservationService {
  getAllReservations() {
    return reservations.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  getReservationById(id) {
    return reservations.find(reservation => reservation.id === id);
  }

  createReservation(reservationData) {
    const newReservation = {
      id: nextId++,
      ...reservationData,
      status: reservationData.status || "pending",
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
