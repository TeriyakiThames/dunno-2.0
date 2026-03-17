import { Button } from "@/components/Shared/Button";
import { Input } from "@/components/Shared/Input";
import PageBottom from "@/components/Shared/PageBottom";
import { userSchema } from "@/constants/SetupSchema";
import { Locale } from "@calculories/shared-types";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import DietaryRestrictions from "./DietaryRestrictions";
import GoalSelection from "./GoalSelection";

export default function SetupForm({ locale }: { locale: Locale }) {
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dietary, setDietary] = useState<string[]>([]);
  const [goal, setGoal] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string | string[]) => {
    const fieldSchema =
      userSchema.shape[field as keyof typeof userSchema.shape];

    if (fieldSchema) {
      const result = fieldSchema.safeParse(value);

      setErrors((prev) => {
        const newErrors = { ...prev };
        if (!result.success) {
          newErrors[field] = result.error.issues[0].message;
        } else {
          delete newErrors[field];
        }
        return newErrors;
      });
    }
  };

  const handleDateChange = (input: string) => {
    const numericValue = input.replace(/\D/g, "");
    let formattedDate = numericValue;

    if (numericValue.length > 2 && numericValue.length <= 4) {
      formattedDate = `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
    } else if (numericValue.length > 4) {
      formattedDate = `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}/${numericValue.slice(4, 8)}`;
    }

    setBirthdate(formattedDate);
    validateField("birthdate", formattedDate);
  };

  const handleNumberChange = (
    input: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    fieldName: string,
  ) => {
    const numericValue = input
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");

    setter(numericValue);
    validateField(fieldName, numericValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const rawData = {
      username,
      birthdate,
      weight,
      height,
      sex,
      activityLevel,
      dietary,
      goal,
    };

    const validationResult = userSchema.safeParse(rawData);

    if (!validationResult.success) {
      const formattedErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        formattedErrors[String(issue.path[0])] = issue.message;
      });

      setErrors(formattedErrors);
      console.log("Validation Failed:", formattedErrors);
      return;
    }

    setErrors({});
    console.log("Form Submitted Successfully:", validationResult.data);
    redirect(`/${locale}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-3 flex max-w-md flex-col gap-9"
    >
      <Input
        header="Username"
        placeholder="What is your name?"
        type="text"
        value={username}
        onChange={(val) => {
          setUsername(val);
          validateField("username", val);
        }}
        error={errors.username}
      />

      <Input
        header="Birthdate"
        placeholder="DD/MM/YYYY"
        type="text"
        backImageURL="/Icons/Calendar.svg"
        value={birthdate}
        onChange={handleDateChange}
        error={errors.birthdate}
      />

      <div className="flex w-full justify-between gap-8">
        <div className="w-full">
          <Input
            header="Weight (kg)"
            placeholder="Value"
            type="text"
            value={weight}
            onChange={(val) => handleNumberChange(val, setWeight, "weight")}
            error={errors.weight}
          />
        </div>
        <div className="w-full">
          <Input
            header="Height (cm)"
            placeholder="Value"
            type="text"
            value={height}
            onChange={(val) => handleNumberChange(val, setHeight, "height")}
            error={errors.height}
          />
        </div>
      </div>

      <Input
        header="Sex"
        placeholder="What is your sex?"
        type="dropdown"
        options={["Male", "Female"]}
        backImageURL="/Icons/Dropdown.svg"
        value={sex}
        onChange={(val) => {
          setSex(val);
          validateField("sex", val);
        }}
        error={errors.sex}
      />

      <Input
        header="Activity Level"
        placeholder="How active are you?"
        type="dropdown"
        options={["Light", "Moderate", "Heavy"]}
        backImageURL="/Icons/Dropdown.svg"
        value={activityLevel}
        onChange={(val) => {
          setActivityLevel(val);
          validateField("activityLevel", val);
        }}
        error={errors.activityLevel}
      />

      <DietaryRestrictions
        value={dietary}
        onChange={(val) => {
          setDietary(val);
          validateField("dietary", val);
        }}
      />

      <GoalSelection
        value={goal}
        onChange={(val) => {
          setGoal(val);
          validateField("goal", val);
        }}
        error={errors.goal}
      />

      <div className="-mx-5 flex flex-col items-center gap-3 border-t border-[#8e8e93] bg-[#f6f7f7] px-9 pt-7">
        <Button type="submit">Save and Continue</Button>
        <Link
          href={`/${locale}`}
          className="text-grey-60 text-center text-[14px] transition-colors hover:text-green-100"
        >
          Skip for now
        </Link>
        <PageBottom />
      </div>
    </form>
  );
}
