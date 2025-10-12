import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, User, MessageSquare } from "lucide-react";

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
        setContacts(response.data);
      } catch (err) {
        console.error("Error fetching contacts:", err);

        if (err.response) {
          setError(`Server responded with status ${err.response.status}`);
        } else if (err.request) {
          setError("No response from server. Check your backend URL.");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading contacts...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-red-500 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium">{error}</p>
          </div>
        </div>
      </div>
    );

  if (contacts.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="rounded-xl shadow-lg p-8 max-w-md">
          <p className="text-gray-500 text-center text-lg">
            No contact messages available yet.
          </p>
        </div>
      </div>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Contact Messages
          </h1>
          <p className="text-gray-600">
            {contacts.length} {contacts.length === 1 ? "message" : "messages"}{" "}
            received
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1"
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Name
                    </h3>
                    <p className="text-lg font-medium text-gray-900 break-words">
                      {contact.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Email
                    </h3>
                    <p className="text-lg font-medium text-gray-900 break-words">
                      {contact.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Message
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed break-words">
                      {contact.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUsCard;
