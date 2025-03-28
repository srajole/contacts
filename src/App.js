import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./App.css"; 

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://60ac9dff9e2d6b0017457815.mockapi.io/ag/contacts")
      .then((response) => {
        console.log(response.data);
        setTimeout(()=>{
          setContacts(response.data);
          setLoading(false);
        },1300);
       
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">📞 Contact List</h1>

      {loading ? (
        <motion.p
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          Loading contacts...
        </motion.p>
      ) : (
        <motion.ul
          className="contact-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {contacts.map((contact, index) => (
            <motion.li
              key={contact.id}
              className="contact-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="contact-detail">
                <span>Name:</span> {`${contact.first_name} ${contact.last_name}`.trim() || "No Name Available"}
              </p>
              <p className="contact-detail">
                <span>Contact:</span> {contact.phone || "No phone available"}
              </p>
              <p className="contact-detail">
                <span>Mail:</span> {contact.email || "No email available"}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default App;

