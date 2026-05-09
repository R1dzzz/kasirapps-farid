import { CheckCircle, XCircle, Info } from 'lucide-react';
import { useStore } from '@/stores/useStore';

export function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const borderColors = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    info: 'border-l-blue-500',
  };

  return (
    <div className="fixed top-20 right-4 z-[90] animate-in slide-in-from-right duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border border-l-4 ${borderColors[toast.type]} shadow-lg min-w-[280px]`}>
        {icons[toast.type]}
        <p className="text-sm font-medium text-foreground">{toast.message}</p>
      </div>
    </div>
  );
}
