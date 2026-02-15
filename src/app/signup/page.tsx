import AuthCard from "@/components/AuthCard";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradients (Distinct from Login slightly if desired, or same) */}
            <div className="fixed inset-0 -z-10 bg-[#f8fafc]">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50 to-pink-50/50"></div>
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <AuthCard mode="signup" />
        </div>
    );
}
