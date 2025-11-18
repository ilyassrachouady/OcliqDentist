import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  glass?: boolean;
  delay?: number;
}

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, children, hover = true, glow = false, gradient = false, glass = false, delay = 0, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'animate-fade-in',
          hover && 'card-hover cursor-pointer',
          glow && 'animate-pulse-glow',
          gradient && 'bg-gradient-to-br from-white to-blue-50 border-blue-200',
          glass && 'glass border-white/20',
          className
        )}
        style={{ animationDelay: `${delay}ms` }}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

// Stat Card with Icon Animation
interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  delay?: number;
  gradient?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  delay = 0,
  gradient = 'from-blue-50 to-blue-100'
}: StatCardProps) => {
  const trendColors = {
    up: 'text-emerald-600',
    down: 'text-red-500',
    neutral: 'text-slate-600'
  };


  const getIconColor = (gradient: string) => {
    if (gradient.includes('emerald')) return 'bg-emerald-50 text-emerald-600';
    if (gradient.includes('amber')) return 'bg-amber-50 text-amber-600';
    return 'bg-blue-50 text-blue-600';
  };

  return (
    <AnimatedCard 
      hover={true}
      delay={delay}
      className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          {title}
        </CardTitle>
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center',
          getIconColor(gradient)
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900 mb-1">
          {value}
        </div>
        {description && (
          <p className={cn(
            'text-sm font-medium',
            trend ? trendColors[trend] : 'text-slate-500'
          )}>
            {description}
          </p>
        )}
      </CardContent>
    </AnimatedCard>
  );
};

// Feature Card for Booking Page
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => (
  <AnimatedCard 
    delay={delay}
    hover={true}
    className="text-center group"
  >
    <CardContent className="pt-6">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </CardContent>
  </AnimatedCard>
);