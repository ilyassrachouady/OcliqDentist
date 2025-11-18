import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendValue, className }: StatCardProps) {
  return (
    <Card className={cn("border-0 shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trendValue && (
              <p className={cn(
                "text-xs mt-1",
                trend === 'up' ? 'text-green-600' :
                trend === 'down' ? 'text-red-600' : 'text-gray-500'
              )}>
                {trendValue}
              </p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-full",
            trend === 'up' ? 'bg-green-100 text-green-600' :
            trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}