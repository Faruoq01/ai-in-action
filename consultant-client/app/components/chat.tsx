import React, { useRef, useEffect } from "react";
import ChatBot from "react-simple-chatbot";

export default function SimpleChat() {
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever chat updates
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  });

  const steps = [
    {
      id: '1',
      message: 'Hello! How can I help you today?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Great! We offer AI consulting and chatbot development.',
      trigger: '4',
    },
    {
      id: '4',
      user: true,
      trigger: '5',
    },
    {
      id: '5',
      message: 'You can start by signing up on our website or asking me any questions!',
      end: true,
    },
  ];  

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <ChatBot
          steps={steps}
          headerTitle=""
          hideHeader={true}
          floating={false}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            boxShadow: "none",
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
          }}
          contentStyle={{
            background: "transparent",
            flexGrow: 1,
            overflowY: "auto",
          }}
          botAvatarStyle={{ display: "none" }}
          ref={contentRef}
        />
      </div>
      <style jsx global>{`
        /* Hide header */
        .rsc-header {
          display: none !important;
        }

        /* Make container full width & height */
        .rsc-container {
          width: 100% !important;
          height: 88vh !important;
          max-width: 100% !important;
          border-radius: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          display: flex !important;
          flex-direction: column !important;
        }

        /* Messages area should grow and scroll */
        .rsc-content {
          flex-grow: 1 !important;
          overflow-y: auto !important;
          background: transparent !important;
        }

        /* Fix the input container height */
        .rsc-input-container {
          height: 200px !important;
          min-height: 200px !important;
          max-height: 200px !important;
          background: transparent !important;
          border-top: 1px solid #ddd !important;
          padding: 10px !important;
        }

        /* Textarea inside input */
        .rsc-input-textarea {
          height: 100% !important;
          resize: none !important;
          font-size: 1rem !important;
        }
      `}</style>
    </>
  );
}
