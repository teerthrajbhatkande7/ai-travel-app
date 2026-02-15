import { ReactNode } from 'react';

interface SectionWrapperProps {
    title: string;
    children: ReactNode;
    icon?: ReactNode;
    gradient?: string; // Expects Tailwind gradient classes like "from-blue-500 to-cyan-500"
    className?: string;
}

export default function SectionWrapper({ title, children, icon, gradient = "from-slate-700 to-slate-900", className = '' }: SectionWrapperProps) {
    return (
        <section className={`glass-panel rounded-3xl p-1 ${className}`}>
            <div className="bg-white/80 backdrop-blur-xl rounded-[22px] p-6 md:p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                    {icon && (
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-lg text-white`}>
                            {icon}
                        </div>
                    )}
                    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                </div>
                <div className="prose prose-slate max-w-none">
                    {children}
                </div>
            </div>
        </section>
    );
}
