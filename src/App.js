import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

const stripePromise = loadStripe("pk_test_TUA_CHIAVE_STRIPE_PUBLICA"); // Inserisci qui la tua chiave Stripe pubblica

function App() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: dateRange[0],
        endDate: dateRange[1],
        amount: 15000, // esempio: 150 euro in centesimi
      }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Casa Vacanze Salento</h1>
      <p>Seleziona le date per prenotare:</p>
      <Calendar selectRange={true} onChange={setDateRange} value={dateRange} />

      {dateRange[0] && dateRange[1] && (
        <div className="summary">
          <p>
            Date selezionate: {dateRange[0].toLocaleDateString()} →{" "}
            {dateRange[1].toLocaleDateString()}
          </p>
          <button onClick={handleBooking} disabled={loading}>
            {loading ? "Caricamento..." : "Prenota e paga"}
          </button>
        </div>
      )}

      {success && <p className="success">Prenotazione completata!</p>}
    </div>
  );
}

export default App;
