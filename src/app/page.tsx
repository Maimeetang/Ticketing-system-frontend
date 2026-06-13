import LoginForm from "@/components/LoginForm";

export default function HomePage() {
  return (
    <div className="flex w-full bg-base-300">
      <div className="card grid min-h-screen grow place-items-center min-w-1/3">
        <div className="min-w-1/2">
          <LoginForm />
        </div>
      </div>

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/bg-slide1.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60 backdrop-blur-sm"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl text-gray-50 font-bold">
              Cloud POS Ticketing System
            </h1>
            <p className="py-6 text-gray-50">
              ระบบจัดการขายหน้าร้านและออกตั๋วบนระบบคลาวด์
              ช่วยให้ธุรกิจของคุณทำงานได้อย่างมีประสิทธิภาพสูงสุด รวดเร็ว
              ปลอดภัย และตรวจสอบข้อมูลได้แบบเรียลไทม์
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
