import { useUser } from '@clerk/clerk-expo';
import { Redirect, router } from 'expo-router';
import React, { useState } from 'react';
import { Text } from 'react-native';
import Desired from './desired-weight';
import Fast from './fast';
import Gender from './gender';
import Goal from './goal';
import Metrics from './metrics';
import Motivation from './motivation';
import Workouts from './workouts';
   
type publicMetadata = {
  hasCompletedOnboarding?: boolean;
};

const Onboarding = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    desiredWeight: "",
    weightLosePerWeek: "",
    gender: "",
    goal: "",
    fast: "",
    workouts: "",
    metrics: {
      height: "",
      weight: "",
      age: "",
    },
  })

  const workoutOptions: ("0-2" | "3-5" | "6+")[] = ['0-2', '3-5', '6+'];
  const goalOptions: ("Lose Weight" | "Maintain Weight" | "Gain Weight")[] = ['Lose Weight', 'Maintain Weight', 'Gain Weight']
  const GenderOptions: ("Male" | "Female" | "Other")[] = ['Male', 'Female', 'Other'];

  const next = () => setStep((s) => Math.min(s + 1, 6));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  React.useEffect(() => {
    if (user) {
      user.reload();
    }
  }, [user]);

  if (!isSignedIn || !user) return <Redirect href="/welcome-screen" />;

  if (user.publicMetadata.hasCompletedOnboarding){
    router.replace('/(home)/home')
  }

  if (!isLoaded) return <Text>Loading...</Text>;
  
  return (
    <>
      {step === 0 && (
        <Gender
        gender={form.gender}
        genderOption={GenderOptions as ("Male" | "Female" | "Other")[]}
        onChange={(value) => setForm({ ...form, gender: value })}
        onNext={next}
        />
      )}

      {step === 1 && (
        <Workouts
          workouts={form.workouts}
          workoutOptions={workoutOptions as ("0-2" | "3-5" | "6+")[]}
          onChange={(value) => setForm({ ...form, workouts: value})}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 2 && (
        <Metrics
          height={form.metrics.height}
          weight={form.metrics.weight}
          age={form.metrics.age}
          onChange={(field, value) => {setForm({ ...form, metrics: { ...form.metrics, [field]: value,}})}}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 3 && (
        <Goal
          goal={form.goal}
          goalOptions={goalOptions as ("Lose Weight" | "Maintain Weight" | "Gain Weight")[]}
          onChange={(value) => setForm({ ...form, goal: value})}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 4 && (
        <Desired
          desiredWeight={form.desiredWeight}
          goal={form.goal}
          onChange={(value) => setForm({ ...form, desiredWeight: value})}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 5 && (
        <Motivation
          goal={form.goal}
          desiredWeight={form.desiredWeight}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 6 && (
        <Fast
          goal={form.goal}
          fast={form.fast}
          onChange={(value) => setForm({ ...form, fast: value })}
          onNext={next}
          onBack={back}
        />
      )}
    </>
  );
};

export default Onboarding