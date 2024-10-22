import { usePathname } from 'next/navigation'; // Import the new hook
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FloatingButtonProps {
  alignment: 'mobile' | 'desktop';  // Define the alignment prop
}

const FloatingButton = ({ alignment }: FloatingButtonProps) => {
  const [isVisible, setIsVisible] = useState(true);   // Controls button visibility
  const pathname = usePathname(); // Use the new usePathname hook to get the current path

  useEffect(() => {
    // Hide the button on the contact page
    if (pathname === '/contact') {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [pathname]); // Re-run the effect when the pathname changes

  // Return null if the button should not be visible
  if (!isVisible) return null;


  return (
    <><div className="btn-sm text-white bg-gray-900 bottom-0 fixed z-49 px-4 py-12 shadow-lg w-full m-0 left-0 sm:hidden"></div><Link
          href='/contact'
          className={`btn-sm text-white bg-purple-600 fixed z-50 px-4 py-5 m-1 shadow-lg bottom-4 right-28 w-64`}
      >
          Book a Free Consultation
      </Link></>
    
  );
};

export default FloatingButton;
