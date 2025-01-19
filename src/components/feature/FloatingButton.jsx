import QrSharing from "./QrSharing";

function FloatingButton() {
  const currentUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const title = "Wedding";

  return (
    <div>
      <div className="pointer group fixed bottom-0 right-0 p-2 flex items-end justify-end w-24 h-24">
        <div className="text-white shadow-xl flex items-center justify-center p-3 rounded-full animate-gradient bg-gradient-to-r from-pink-300 via-slate-400 to-rose-300 bg-size-200 hover:scale-110 transition-transform duration-300">
          <QrSharing link={currentUrl} title={title} />
        </div>
      </div>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}

FloatingButton.displayName = "FloatingButton";
export default FloatingButton;
