"use client";

import { useState } from "react";
import { Send, CircleCheck, LoaderCircle } from "lucide-react";
import { sendContactMessage } from "@/services/contactService";
import { CONTACT_SERVICES, SITE } from "@/content/siteContent";
import styles from "./ContactForm.module.css";

const EMPTY = { name: "", email: "", phone: "", service: "", message: "", website: "" };

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [message, setMessage] = useState("");

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  // Quick checks in the browser; the backend checks again
  function validate() {
    const errs = {};
    if (values.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errs.email = "Please enter a valid email address.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`contact-${Object.keys(errs)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await sendContactMessage(values);
      setMessage(res.message);
      setStatus("sent");
      setValues(EMPTY);
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      setMessage(
        err.message === "Failed to fetch"
          ? `We couldn't send your message right now. Please email us at ${SITE.email}.`
          : err.message
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.success} role="status">
        <CircleCheck size={48} aria-hidden="true" />
        <h3>Message sent!</h3>
        <p>{message}</p>
        <button type="button" className="btn btn--dark" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  const field = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: update,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const errorText = (name) =>
    errors[name] && (
      <span id={`contact-${name}-error`} className={styles.fieldError}>
        {errors[name]}
      </span>
    );

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {status === "error" && (
        <p className={styles.formError} role="alert">
          {message}
        </p>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input type="text" autoComplete="name" required {...field("name")} />
          {errorText("name")}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input type="email" autoComplete="email" required {...field("email")} />
          {errorText("email")}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-phone">Phone number</label>
          <input type="tel" autoComplete="tel" {...field("phone")} />
          {errorText("phone")}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-service">Service you need</label>
          <select {...field("service")}>
            <option value="">Select a service</option>
            {CONTACT_SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Tell us about your project</label>
        <textarea rows={6} {...field("message")} placeholder="Goals, timeline, budget — anything that helps us understand." />
      </div>

      {/* Spam trap: hidden from people, bots fill it in */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input type="text" tabIndex={-1} autoComplete="off" {...field("website")} />
      </div>

      <div className={styles.footer}>
        <p className={styles.note}>* Required. We never share your details.</p>
        <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              Sending… <LoaderCircle className={styles.spin} aria-hidden="true" />
            </>
          ) : (
            <>
              Send Message <Send aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
