import {
  Cat,
  Check,
  CheckCheck,
  Clock,
  MailCheck,
  MailX,
  Rabbit,
  Snail,
  X,
} from "lucide-react";

export const levels = [
  {
    value: "Junior",
    label: "Junior",
    icon: Snail,
  },
  {
    value: "Middle",
    label: "Middle",
    icon: Rabbit,
  },
  {
    value: "Senior",
    label: "Senior",
    icon: Cat,
  },
];

export const jobStatuses = [
  {
    value: "done",
    label: "Done",
    icon: MailCheck,
  },
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
  },
  {
    value: "failed",
    label: "Failed",
    icon: MailX,
  },
];

export const languages = [
  {
    value: "uz",
    label: "Uzbek",
  },
  {
    value: "ru",
    label: "Russian",
  },
  {
    value: "en",
    label: "English",
  },
];

export const orderStatuses = [
  {
    value: "open",
    label: "Open",
    icon: Check,
  },
  {
    value: "close",
    label: "Finished",
    icon: CheckCheck,
  },
  {
    value: "processing",
    label: "Processing",
    icon: Clock,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: X,
  },
];
