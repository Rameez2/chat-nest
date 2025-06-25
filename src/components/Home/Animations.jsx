"use client"

export default function Animations() {
  return (
    <style jsx global>{`
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes gradient {
        0%, 100% {
          background-size: 200% 200%;
          background-position: left center;
        }
        50% {
          background-size: 200% 200%;
          background-position: right center;
        }
      }

      @keyframes count-up {
        from {
          transform: scale(0.5);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
      }

      .animate-gradient {
        animation: gradient 3s ease infinite;
      }

      .animate-count-up {
        animation: count-up 0.6s ease-out forwards;
      }
    `}</style>
  )
}
