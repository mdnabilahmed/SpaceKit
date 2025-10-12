import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUsCard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "https://api-spacekit.onrender.com/api/contactus/getcontacts"
        );
        setContacts(response.data); // Assuming the backend returns an array
      } catch (err) {
        console.error(err);
        setError("Failed to fetch contact data");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (contacts.length === 0)
    return (
      <p className="text-center text-gray-500">No contact info available.</p>
    );

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>

      {contacts.map((contact, index) => (
        <div key={index} className="space-y-4">
          {contact.address && (
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-gray-600 mr-3" />
              <div>
                <h3 className="text-gray-700 font-medium">Address</h3>
                <p className="text-gray-500">{contact.address}</p>
              </div>
            </div>
          )}

          {contact.phone && (
            <div className="flex items-start">
              <Phone className="w-6 h-6 text-gray-600 mr-3" />
              <div>
                <h3 className="text-gray-700 font-medium">Phone</h3>
                <p className="text-gray-500">{contact.phone}</p>
              </div>
            </div>
          )}

          {contact.email && (
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-gray-600 mr-3" />
              <div>
                <h3 className="text-gray-700 font-medium">Email</h3>
                <p className="text-gray-500">{contact.email}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactUsCard;
