import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-700 text-white p-4 text-center mt-8">
      <p>&copy; {new Date().getFullYear()} Escape Room Lab. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
