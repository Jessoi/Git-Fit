import { format } from "date-fns";

export function formatDate(rawDate) {
  return format(new Date(rawDate), "MM-dd-yyyy hh:mm a");
}
