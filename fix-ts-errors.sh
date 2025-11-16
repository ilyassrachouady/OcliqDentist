#!/bin/bash

# Fix TypeScript unused import errors

# src/components/AddAppointmentForm.tsx - remove Clock
sed -i '' 's/import { Calendar as CalendarIcon, Clock }/import { Calendar as CalendarIcon }/g' src/components/AddAppointmentForm.tsx

# src/lib/mock-data.ts - remove unused imports
sed -i '' '/import.*Service/d' src/lib/mock-data.ts
sed -i '' 's/import { addDays, addHours, setHours, setMinutes }/import { addDays, setHours, setMinutes }/g' src/lib/mock-data.ts

# src/lib/api.ts - fix patient.id issue (use dentistId instead)
sed -i '' 's/const patients = await api.getPatients(patient.id);/const patients = await api.getPatients(dentistId || "");/g' src/lib/api.ts

# src/layouts/DashboardLayout.tsx - remove unused User, X, setDemo
sed -i '' 's/import { User, X }/import { Menu }/g' src/layouts/DashboardLayout.tsx
sed -i '' 's/, setDemo//g' src/layouts/DashboardLayout.tsx

# src/pages/dashboard/AppointmentsPage.tsx - remove unused imports
sed -i '' '34d' src/pages/dashboard/AppointmentsPage.tsx

# src/pages/dashboard/DashboardHome.tsx - remove unused imports
sed -i '' 's/import { Input, Label, Textarea }/import {}/g' src/pages/dashboard/DashboardHome.tsx
sed -i '' 's/, Calendar//g' src/pages/dashboard/DashboardHome.tsx
sed -i '' 's/, UserCheck, UserX, Phone//g' src/pages/dashboard/DashboardHome.tsx

# src/pages/dashboard/PatientProfilePage.tsx - remove unused
sed -i '' '/Appointment/d' src/pages/dashboard/PatientProfilePage.tsx
sed -i '' '/FileText/d' src/pages/dashboard/PatientProfilePage.tsx

# src/pages/dashboard/SettingsPage.tsx - remove unused
sed -i '' 's/, Badge//g' src/pages/dashboard/SettingsPage.tsx
sed -i '' 's/, Calendar//g' src/pages/dashboard/SettingsPage.tsx
sed -i '' 's/, setDemo//g' src/pages/dashboard/SettingsPage.tsx

# src/pages/public/BookingWizard.tsx - remove unused
sed -i '' 's/CardDescription, //' src/pages/public/BookingWizard.tsx
sed -i '' 's/, Phone//g' src/pages/public/BookingWizard.tsx
sed -i '' 's/setIsCheckingSlot,//' src/pages/public/BookingWizard.tsx
sed -i '' 's/setShowTimeSlots,//' src/pages/public/BookingWizard.tsx
sed -i '' '/getDateStatus/d' src/pages/public/BookingWizard.tsx
sed -i '' 's/, index//' src/pages/public/BookingWizard.tsx

# src/pages/public/PatientDemoPage.tsx - remove unused
sed -i '' '/getAvailableTimeSlots/d' src/pages/public/PatientDemoPage.tsx
sed -i '' '6d' src/pages/public/PatientDemoPage.tsx
sed -i '' '14d' src/pages/public/PatientDemoPage.tsx
sed -i '' 's/, Mail//g' src/pages/public/PatientDemoPage.tsx

echo "Fixed all TypeScript errors!"
