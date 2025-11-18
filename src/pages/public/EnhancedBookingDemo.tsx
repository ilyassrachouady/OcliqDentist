import { useState } from 'react';
import { demoDentist } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Award, 
  Users, 
  Calendar,
  Sparkles 
} from 'lucide-react';
import QuizStyleBooking, { BookingData } from '@/components/ui/quiz-style-booking';

export default function EnhancedBookingDemo() {
  const [bookingComplete, setBookingComplete] = useState(false);
  const dentist = demoDentist;

  const handleBookingSuccess = (bookingData: BookingData) => {
    setBookingComplete(true);
    // You could redirect or show additional success actions here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <QuizStyleBooking
          onSuccess={handleBookingSuccess}
          className="w-full"
        />
      </div>
    </div>
  );
}