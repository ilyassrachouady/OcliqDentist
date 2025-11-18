import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Heart, 
  Shield, 
  Save,
  UserPlus,
  CheckCircle2,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface NewPatientFormProps {
  onSuccess?: (patient: any) => void;
  onCancel?: () => void;
}

export default function NewPatientForm({ onSuccess, onCancel }: NewPatientFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalHistory: '',
    allergies: '',
    insurance: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPatient = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        createdAt: new Date(),
        appointments: [],
      };

      toast.success('Patient ajouté avec succès!');
      onSuccess?.(newPatient);
    } catch (error) {
      toast.error('Erreur lors de la création du patient');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-slate-50 via-blue-50/30 to-teal-50/20 p-6 rounded-t-3xl border-b border-slate-200/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Nouveau Patient</h2>
            <p className="text-slate-600">Ajouter un nouveau patient au cabinet</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 mt-4 text-slate-500">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">Soins personnalisés</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Données sécurisées</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 space-y-8">
        {/* Personal Information */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg text-slate-900">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold text-slate-700">Nom complet *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="h-12 rounded-xl border-0 bg-white shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Fatima Alami"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-bold text-slate-700">Téléphone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="h-12 rounded-xl border-0 bg-white shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-blue-500"
                  placeholder="+212 6 00 00 00 00"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold text-slate-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="h-12 rounded-xl border-0 bg-white shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-blue-500"
                  placeholder="patient@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm font-bold text-slate-700">Date de naissance</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className="h-12 rounded-xl border-0 bg-white shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg text-slate-900">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              Adresse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-bold text-slate-700">Adresse complète</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="h-12 rounded-xl border-0 bg-white shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-green-500"
                placeholder="123 Rue de la Paix"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-bold text-slate-700">Ville</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="h-12 rounded-xl border-0 bg-white shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-green-500"
                placeholder="Casablanca"
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/30 rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg text-slate-900">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Phone className="h-4 w-4 text-white" />
              </div>
              Contact d'urgence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-sm font-bold text-slate-700">Nom du contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange('emergencyContact', e.target.value)}
                  className="h-12 rounded-xl border-0 bg-white shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-orange-500"
                  placeholder="Personne à contacter"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone" className="text-sm font-bold text-slate-700">Téléphone d'urgence</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                  className="h-12 rounded-xl border-0 bg-white shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-orange-500"
                  placeholder="+212 6 00 00 00 00"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/30 rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg text-slate-900">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              Informations médicales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medicalHistory" className="text-sm font-bold text-slate-700">Antécédents médicaux</Label>
              <Textarea
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={(e) => handleChange('medicalHistory', e.target.value)}
                className="rounded-xl border-0 bg-white shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-purple-500 resize-none"
                rows={3}
                placeholder="Maladies, opérations, traitements en cours..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allergies" className="text-sm font-bold text-slate-700">Allergies</Label>
              <Input
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleChange('allergies', e.target.value)}
                className="h-12 rounded-xl border-0 bg-white shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-purple-500"
                placeholder="Médicaments, matériaux dentaires..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insurance" className="text-sm font-bold text-slate-700">Assurance</Label>
              <Select onValueChange={(value) => handleChange('insurance', value)}>
                <SelectTrigger className="h-12 rounded-xl border-0 bg-white shadow-lg">
                  <SelectValue placeholder="Choisir l'assurance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cnss">CNSS</SelectItem>
                  <SelectItem value="mutuelle">Mutuelle Générale</SelectItem>
                  <SelectItem value="private">Assurance privée</SelectItem>
                  <SelectItem value="none">Aucune</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg text-slate-900">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Mail className="h-4 w-4 text-white" />
              </div>
              Notes additionnelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="rounded-xl border-0 bg-white shadow-lg focus:shadow-xl transition-all focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
              placeholder="Préférences, remarques particulières..."
            />
          </CardContent>
        </Card>
      </form>

      {/* Footer Actions */}
      <div className="sticky bottom-0 bg-gradient-to-r from-slate-50 via-blue-50/30 to-teal-50/20 p-6 rounded-b-3xl border-t border-slate-200/50 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-12 px-6 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 font-semibold"
          >
            <X className="mr-2 h-5 w-5" />
            Annuler
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading || !formData.name || !formData.phone}
            className="h-12 px-8 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Création...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-3 h-5 w-5" />
                Créer le patient
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}