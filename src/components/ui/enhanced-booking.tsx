import React from 'react';
import { AnimatedCard } from './animated-card';
import { ModernButton } from './modern-button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { CardContent, CardHeader, CardTitle } from './card';
import { Star, Clock, Award, Shield, CheckCircle2, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DentistHeroProps {
  dentist: any;
  onBookingClick: () => void;
}

export const DentistHero = ({ dentist, onBookingClick }: DentistHeroProps) => (
  <div className="relative overflow-hidden">
    {/* Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90" />
    <div className="absolute inset-0 bg-black/20" />
    
    {/* Floating Elements */}
    <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" />
    <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 right-10 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
    
    <div className="relative z-10 container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Section */}
        <div className="animate-fade-in">
          <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-white/20 shadow-2xl">
            <AvatarImage src={dentist.photo} alt={dentist.name} />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {dentist.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-in-left">
            {dentist.name}
          </h1>
          
          <p className="text-xl text-blue-100 mb-2 animate-slide-in-right">
            {dentist.specialty}
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn(
                  "w-5 h-5",
                  i < Math.floor(dentist.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                )} />
              ))}
            </div>
            <span className="text-white font-medium">
              {dentist.rating} ({dentist.reviews?.length || 0} avis)
            </span>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 animate-scale-in">
          <div className="glass-dark p-4 rounded-xl text-white text-center">
            <Award className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
            <div className="font-medium">{dentist.experience}+ ans</div>
            <div className="text-sm text-blue-200">d'expérience</div>
          </div>
          
          <div className="glass-dark p-4 rounded-xl text-white text-center">
            <Shield className="w-6 h-6 mx-auto mb-2 text-green-400" />
            <div className="font-medium">Certifié</div>
            <div className="text-sm text-blue-200">Ordre des dentistes</div>
          </div>
          
          <div className="glass-dark p-4 rounded-xl text-white text-center">
            <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-blue-400" />
            <div className="font-medium">1000+</div>
            <div className="text-sm text-blue-200">patients satisfaits</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <ModernButton
            size="xl"
            onClick={onBookingClick}
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-white/25 border-2 border-white/20"
            icon={<CalendarIcon className="w-5 h-5" />}
          >
            Réserver un rendez-vous
          </ModernButton>
        </div>
      </div>
    </div>
  </div>
);

interface ServiceCardProps {
  service: any;
  isSelected: boolean;
  onSelect: () => void;
}

export const EnhancedServiceCard = ({ service, isSelected, onSelect }: ServiceCardProps) => (
  <AnimatedCard
    hover={true}
    className={cn(
      'cursor-pointer transition-all duration-300 border-2',
      isSelected 
        ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20' 
        : 'border-gray-200 hover:border-blue-300'
    )}
    onClick={onSelect}
  >
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-teal-600">{service.price} MAD</div>
        </div>
      </div>
    </CardHeader>
    
    {isSelected && (
      <CardContent className="pt-0 animate-fade-in">
        <div className="bg-blue-100 rounded-lg p-3">
          <div className="flex items-center gap-2 text-blue-700">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">Service sélectionné</span>
          </div>
        </div>
      </CardContent>
    )}
  </AnimatedCard>
);

interface TimeSlotProps {
  time: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const EnhancedTimeSlot = ({ time, isSelected, onSelect }: TimeSlotProps) => (
  <ModernButton
    variant={isSelected ? "default" : "outline"}
    size="sm"
    onClick={onSelect}
    className={cn(
      'w-full transition-all duration-300',
      isSelected && 'animate-pulse-glow'
    )}
  >
    <Clock className="w-3 h-3 mr-2" />
    {time}
  </ModernButton>
);

export const BookingSteps = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, title: 'Service', icon: <Sparkles className="w-4 h-4" /> },
    { number: 2, title: 'Date & Heure', icon: <CalendarIcon className="w-4 h-4" /> },
    { number: 3, title: 'Informations', icon: <CheckCircle2 className="w-4 h-4" /> }
  ];

  return (
    <div className="flex items-center justify-center mb-8 animate-fade-in">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className={cn(
            'flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300',
            currentStep >= step.number 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-500'
          )}>
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
              currentStep >= step.number ? 'bg-white/20' : 'bg-white'
            )}>
              {currentStep > step.number ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
            </div>
            <span className="font-medium">{step.title}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              'h-1 w-8 mx-2 transition-colors duration-300',
              currentStep > step.number ? 'bg-blue-500' : 'bg-gray-200'
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};