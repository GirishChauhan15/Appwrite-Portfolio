import React from 'react'
import styles from './Contact.module.css'

function Contact() {
  return (
    <section id="contact" className={`${styles.contact_me} row container`}>
    <div className={styles.contact_me_one}>
      <h3 className={styles.contact_me_title}>Contact</h3>
      <p className={styles.contact_me_content}>
        Interested in working together? Send me a message and I'll get back
        to you promptly.
      </p>
    </div>
    <div className={`${styles.contact_me_two} row`}>
      <form action="https://api.web3forms.com/submit" method="POST">
        <input
          type="hidden"
          name="access_key"
          value="5e41ee41-1144-46f9-a1c0-353e58d8c604"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={styles.contact_inputs}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.contact_inputs}
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Message"
          className={styles.contact_inputs}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  </section>
  )
}

export default Contact;