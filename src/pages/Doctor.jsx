import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Doctor.css";
import { toast } from "react-toastify";
import { FaVideo } from "react-icons/fa";

const Doctor = () => {
  const [doctorName, setDoctorName] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem("doctorName") || "Dr. Smith";
    setDoctorName(storedName);
    fetchAppointments(storedName);
  }, []);

  const fetchAppointments = (docName) => {
    axios.get("http://localhost:8080/appointments/book")
      .then((res) => {
        const filtered = res.data.filter(app => app.doctor === docName);
        setAppointments(filtered);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
      });
  };

  const startVideoCall = () => {
    toast.info("Redirecting to Google Meet...");
    setTimeout(() => {
      window.open("https://meet.google.com/", "_blank");
    }, 2000);
  };

  const handleComplete = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8080/appointments/book/${appointmentId}`);
      toast.success("Appointment marked as completed!");
      // Refresh list
      fetchAppointments(doctorName);
    } catch (err) {
      toast.error("Failed to delete appointment.");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="doctor">
    <div className="doctor-page">
      <h2>Welcome, {doctorName}</h2>
      <h3>📋 Your Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Video Call</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app, index) => (
              <tr key={index}>
                <td>{app.name}</td>
                <td>{app.date}</td>
                <td>{app.time}</td>
                <td>
                  <button className="video-btn" onClick={startVideoCall}>
                    <FaVideo /> Join Call
                  </button>
                </td>
                <td>
                  <button
                    className="complete-btn"
                    onClick={() => handleComplete(app._id)}
                  >
                    Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default Doctor;
