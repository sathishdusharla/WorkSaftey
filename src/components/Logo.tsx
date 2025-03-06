import { Shield } from 'lucide-react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Shield className="h-8 w-8 text-blue-600" />
      <span className="text-xl font-semibold">SafetyFirst</span>
    </div>
  );
}