import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_40%)] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Floating Particles/Shapes placeholder */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-emerald-500/20 rounded-full animate-ping pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-emerald-400/20 rounded-full animate-pulse pointer-events-none" />

      <div className="relative z-10 w-full flex justify-center py-12 lg:py-20">
        <RegisterForm />
      </div>
    </div>
  );
}
