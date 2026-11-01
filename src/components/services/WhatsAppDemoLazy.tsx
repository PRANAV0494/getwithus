"use client";

import dynamic from "next/dynamic";
import LazyWhenNear from "@/components/motion/LazyWhenNear";
import WhatsAppFrame from "@/components/services/WhatsAppFrame";

const WhatsAppDemo = dynamic(() => import("@/components/services/WhatsAppDemo"), {
  ssr: false,
  loading: () => <WhatsAppFrame />,
});

/** The WhatsApp demo, fetched only when its card comes near; until then its empty frame holds the space. */
export default function WhatsAppDemoLazy() {
  return (
    <LazyWhenNear placeholder={<WhatsAppFrame />}>
      <WhatsAppDemo />
    </LazyWhenNear>
  );
}
