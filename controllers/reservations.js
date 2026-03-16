const reservationModel = require('../schemas/reservations');
const mongoose = require('mongoose');

// GET all reservations for a user
exports.getAllReservations = async (req, res) => {
  try {
    const userId = req.user._id;
    const reservations = await reservationModel.find({ user: userId });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single reservation by id for a user
exports.getReservationById = async (req, res) => {
  try {
    const userId = req.user._id;
    const reservation = await reservationModel.findOne({ _id: req.params.id, user: userId });
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST reserveACart (transaction)
exports.reserveACart = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user._id;
    // Logic to reserve a cart for the user (implement as needed)
    // ...
    await session.commitTransaction();
    session.endSession();
    res.json({ message: 'Cart reserved successfully' });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: err.message });
  }
};

// POST reserveItems (transaction)
exports.reserveItems = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user._id;
    const { items } = req.body; // items: [{ product, quantity }]
    // Logic to reserve items for the user (implement as needed)
    // ...
    await session.commitTransaction();
    session.endSession();
    res.json({ message: 'Items reserved successfully' });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: err.message });
  }
};

// POST cancelReserve (no transaction)
exports.cancelReserve = async (req, res) => {
  try {
    const userId = req.user._id;
    const reservationId = req.params.id;
    // Logic to cancel reservation (implement as needed)
    // ...
    res.json({ message: 'Reservation cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
