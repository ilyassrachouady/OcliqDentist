import { cn } from '@/lib/utils';
import { Loader2, Calendar } from 'lucide-react';

// Modern Loading Spinner
export const LoadingSpinner = ({ size = 'default', className }: { size?: 'sm' | 'default' | 'lg', className?: string }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn('animate-spin', sizeClasses[size], className)}>
      <Loader2 className="w-full h-full text-blue-600" />
    </div>
  );
};

// Skeleton Loading Cards
export const SkeletonCard = () => (
  <div className="animate-fade-in">
    <div className="rounded-lg border bg-card p-6">
      <div className="space-y-4">
        <div className="shimmer h-4 w-3/4 rounded"></div>
        <div className="shimmer h-3 w-1/2 rounded"></div>
        <div className="space-y-2">
          <div className="shimmer h-3 w-full rounded"></div>
          <div className="shimmer h-3 w-5/6 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// Booking Flow Loading
export const BookingLoadingState = () => (
  <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-fade-in">
    <div className="relative">
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse-glow flex items-center justify-center">
        <Calendar className="w-8 h-8 text-white animate-float" />
      </div>
    </div>
    <div className="text-center space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">Chargement en cours...</h3>
      <p className="text-gray-600">Préparation de votre réservation</p>
    </div>
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  </div>
);

// Dashboard Loading State
export const DashboardLoadingState = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <div className="shimmer h-8 w-48 rounded"></div>
        <div className="shimmer h-4 w-32 rounded"></div>
      </div>
      <div className="shimmer h-10 w-32 rounded-lg"></div>
    </div>
    
    <div className="grid gap-6 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="shimmer h-6 w-40 rounded"></div>
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="shimmer w-12 h-12 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="shimmer h-4 w-3/4 rounded"></div>
                  <div className="shimmer h-3 w-1/2 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="shimmer h-6 w-32 rounded"></div>
        <div className="rounded-lg border bg-card p-6">
          <div className="shimmer h-64 w-full rounded"></div>
        </div>
      </div>
    </div>
  </div>
);