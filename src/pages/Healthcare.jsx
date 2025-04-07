import React, { useState, useEffect } from "react";
import "../styles/Healthcare.css";
import { FaBell, FaVideo, FaCalendarAlt, FaClock, FaUserMd } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Healthcare = () => {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});
  const [reminders, setReminders] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [medicineTime, setMedicineTime] = useState("");

  const doctorsList = ["Dr. Smith", "Dr. Patel", "Dr. Johnson", "Dr. Brown"];

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      setReminders((prevReminders) =>
        prevReminders.map((reminder) => {
          const remainingTime = getTimeRemaining(reminder.time);

          if (remainingTime === "Time up!") {
            showReminderNotification(reminder.name);
            toast.info(`It's time for ${reminder.name}!`);
          }

          return { ...reminder, remainingTime };
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const validateInputs = () => {
    let newErrors = {};
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (!name.trim()) newErrors.name = "Name is required";
    if (!doctor) newErrors.doctor = "Please select a doctor";
    if (!date) newErrors.date = "Date is required";
    else if (selectedDate.toDateString() < currentDate.toDateString())
      newErrors.date = "Choose a future date or today";
    if (!time) newErrors.time = "Time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAppointment = () => {
    if (validateInputs()) {
      toast.success(`Appointment booked with ${doctor} for ${name} on ${date} at ${time}`);
      setName("");
      setDoctor("");
      setDate("");
      setTime("");
      setErrors({});
    }
  };

  const addReminder = () => {
    if (!medicineName.trim() || !medicineTime) {
      toast.error("Please enter medicine name and time");
      return;
    }
    const newReminder = { name: medicineName, time: medicineTime };
    setReminders([...reminders, newReminder]);
    setMedicineName("");
    setMedicineTime("");
    toast.success("Medicine reminder added successfully!");
  };

  const getTimeRemaining = (reminderTime) => {
    const now = new Date();
    const [hours, minutes] = reminderTime.split(":").map(Number);
    const reminderDateTime = new Date();
    reminderDateTime.setHours(hours, minutes, 0, 0);

    const timeDiff = reminderDateTime - now;
    if (timeDiff <= 0) return "Time up!";

    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (hoursLeft > 0) return `${hoursLeft} hr ${minutesLeft} min to go`;
    return `${minutesLeft} min to go`;
  };

  const showReminderNotification = (medicine) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Medicine Reminder", {
        body: `It's time for your medicine: ${medicine}`,
      });
    }
  };

  const startVideoCall = () => {
    toast.info("Redirecting to Google Meet...");
    setTimeout(() => {
      window.open("https://meet.google.com/", "_blank");
    }, 2000);
  };

  return (
    <div className="healthcare-wrapper">
      <div className="healthcare-container">
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="appointment-card">
          <h3 className="consultation-heading">BOOK AN ONLINE CONSULTATION</h3>

          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="input-group">
            <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="input-field">
              <option value="">Select a Doctor</option>
              {doctorsList.map((doc, index) => (
                <option key={index} value={doc}>{doc}</option>
              ))}
            </select>
            <FaUserMd className="icon" />
            {errors.doctor && <span className="error">{errors.doctor}</span>}
          </div>

          <div className="input-group">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
            />
            <FaCalendarAlt className="icon" />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>

          <div className="input-group">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input-field"
            />
            <FaClock className="icon" />
            {errors.time && <span className="error">{errors.time}</span>}
          </div>

          <button className="book-btn" onClick={handleAppointment}>
            Book Appointment
          </button>
        </div>

        <div className="service-card medicine">
          <h3>
            <FaBell /> Medicine Reminders
          </h3>

          <div className="input-group">
            <input
              type="text"
              placeholder="Medicine Name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <input
              type="time"
              value={medicineTime}
              onChange={(e) => setMedicineTime(e.target.value)}
              className="input-field"
            />
          </div>

          <button className="reminder-btn" onClick={addReminder}>
            Add Reminder
          </button>

          <ul className="reminder-list">
            {reminders.map((reminder, index) => (
              <li key={index} className="reminder-item">
                <strong>{reminder.name}</strong> at <span>{reminder.time}</span> <br />
                <small>{getTimeRemaining(reminder.time)}</small>
              </li>
            ))}
          </ul>
        </div>

        <div className="service-card telemedicine">
          <h3>
            <FaVideo /> Telemedicine Support
          </h3>
          <p>Connect with a doctor via video call.</p>
          <button className="video-btn" onClick={startVideoCall}>
            Join Video Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default Healthcare;
