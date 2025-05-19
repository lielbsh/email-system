import React, { useState } from "react";

const NewEmailModal = ({ fromUserId, onClose }) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e, saveAsDraft = false) => {
    if (e) e.preventDefault();

    const payload = {
      from: fromUserId,
      to: to.split(",").map((email) => email.trim()),
      subject,
      body,
      isDraft: saveAsDraft,
    };

    try {
      const res = await fetch("/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send email");

      alert(saveAsDraft ? "Email saved as draft." : "Email sent!");
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          backgroundColor: "white",
          borderRadius: "12px",
          width: "600px",
          maxWidth: "95%",
          padding: "16px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <button
          type="button"
          onClick={() => handleSubmit(null, true)}
          title="Save as Draft and close"
          style={{
            position: "absolute",
            top: "8px",
            right: "12px",
            background: "none",
            border: "none",
            fontSize: "20px",
            color: "#999",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type="submit"
            style={{
              backgroundColor: "#1d5edc",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "8px 16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "18px" }}>▶</span> Send
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "8px 16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            🗑 Cancel
          </button>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              backgroundColor: "#f1f1f1",
              padding: "4px 12px",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            To
          </span>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter recipients (comma separated)"
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: "14px",
            }}
          />
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "6px 12px",
            fontWeight: "bold",
            width: "fit-content",
          }}
        >
          Cc
        </div>

        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter Subject"
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            fontSize: "14px",
          }}
        />

        <textarea
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Message"
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            resize: "vertical",
            fontSize: "14px",
          }}
        />
      </form>
    </div>
  );
};

export default NewEmailModal;
