import QuizStyleBooking from '@/components/ui/quiz-style-booking';
import { toast } from 'sonner';


interface NewAppointmentFormProps {
  dentistId: string;
  onSuccess: () => void;
}

export default function NewAppointmentForm({ dentistId, onSuccess }: NewAppointmentFormProps) {
  return (
    <div className="w-full">
      <QuizStyleBooking 
        onSuccess={(bookingData) => {
          toast.success('Rendez-vous créé avec succès!');
          onSuccess();
        }}
      />
    </div>
  );
}
