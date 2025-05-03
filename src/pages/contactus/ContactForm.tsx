import React, { useState } from "react";
import { Send, User, Mail } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./ContactForm.module.css";
import { notification } from 'antd';
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
console.log(success);

  const openSuccessNotification = () =>
    notification.success({
      message: "Message sent successfully!",
    });

  const openErrorNotification = (description: string) =>
    notification.error({
      message: "Oops! Something went wrong.",
      description,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await fetch(
        "https://aurabloom.ikramovna.me/api/v1/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.name,
            email: formData.email,
            phone_number: formData.phone,
            message: formData.message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setSuccess(true);
      // Reset form after successful submission
      setFormData({ name: "", email: "", phone: "", message: "" });
      openSuccessNotification();
    } catch (err: any) {
      const msg = err instanceof Error ? err.message : "Unexpected error";
      setError(msg);
      openErrorNotification(msg);
    } finally {
      setSubmitting(false);
      
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.grid} style={{ marginLeft: 0, marginRight: 0 }}>
        <div className={styles.inputWrapper}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <User className={styles.icon} />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Name"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <Mail className={styles.icon} />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
            placeholder="Email"
          />
        </div>
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="phone" className={styles.label}>
          Phone
        </label>
        <PhoneInput
          country="uz"
          value={formData.phone}
          onChange={handlePhoneChange}
          inputClass={styles.phoneInput}
          inputProps={{
            name: "phone",
            required: true,
            placeholder: "Enter phone number",
          }}
          inputStyle={{
            padding: "0.75rem 0.75rem 0.75rem 2.5rem",
            border: "1px solid #c39c75",
            borderRadius: "0.375rem",
            paddingLeft: "45px",
            width: "100%",
          }}
        />
      </div>

      <div style={{ marginLeft: 0, width: "100%" }}>
        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={styles.textarea}
          required
          placeholder="Message"
          style={{ marginLeft: 0 }}
        />
      </div>

      <button type="submit" className={styles.button} disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
        <Send className={styles.buttonIcon} />
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
