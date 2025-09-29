export default function Contact() {
  const phone = "123-456-7890" // Declare phone variable
  const address = "123 Main St, Anytown, USA" // Declare address variable

  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>
    </section>
  )
}
